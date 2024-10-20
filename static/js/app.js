/* Naming conventions:
all- prefix is used for variables containing all the elements of a data type (names, metadata, samples).
selected- prefix is used for the picked or desired element of an object or array.
The d in Metadata is never capitalized. Similar treatment for other compound words, like dataset.
The "sample" variable refers to the value of the study subject's id, which is listed in the names object.
It does not refer to the samples array within the dataset.*/

// Build the panel that displays the metadata of the currently selected sample subject
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // 1. FUNCTION to FILTER for the DESIRED SAMPLE'S METADATA
    // Assign a variable to the array of all metadata
    let allMetadata = data.metadata; // allMetadata is an array of objects

    // Filter the metadata for the object with the desired name (aka sample id)
    function selectMetadata(object) {
      return object.id === parseInt(sample);
    }
    let selectedMetadata = allMetadata.filter(selectMetadata)[0]; //selectedMetadata is an object

    /* parseInt had to be used above because it was discovered that the values of 'id' keys within
    the objects of the metadata array are numbers, while the "sample" from the DOM dropdown is a
    string. Use of "==" instead of "===" would have also worked, to perform type coercion.*/
    /*  console.log(`Data type of sample: ${typeof sample}`)

    for (let i = 0; i < Object.entries(selectedMetadata).length; i++) {
      console.log(`Type: ${Object.keys(selectedMetadata)[i]}: ${Object.values(selectedMetadata)[i]} ${typeof Object.values(selectedMetadata)[i]}`);
    }    */

    // 2. PREPARE the DOM ELEMENT
    // Select the panel with id `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use .html("") to clear existing value from the panel's DOM element
    metadataPanel.html("");

    // 3. APPEND the SELECTED SAMPLE'S METADATA to the DOM ELEMENT
    let metadataPanelLabels = ["Study Subject ID", "Ethnicity", "Gender", "Age", "Location", "Belly Button Type (Innie/Outie)", "Wash Frequency"];

    for (let i= 0; i < Object.entries(selectedMetadata).length; i++) {
      let entry = `<strong>${metadataPanelLabels[i]}:</strong> ${Object.values(selectedMetadata)[i]}`;
      metadataPanel
        .append("span")
        .html(entry)
        .append("br");
    }
  });
}

// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Assign a variable to the array of all samples
    let allSamples = data.samples // allSamples is an array of objects

    // Filter the samples for the object with the desired sample number
    function selectSample(object) {
      return object.id === sample; // No type conversion needed since sample array's "id" are strings
    }
    let selectedSample = allSamples.filter(selectSample)[0]; // selectedSample is an object

    // Get the otu_ids and sample_values
    let selected_otu_ids = selectedSample.otu_ids
    let selected_sample_values = selectedSample.sample_values
    let selected_otu_labels = selectedSample.otu_labels

    // Build a Bubble Chart, i.e., scatter plot with option `mode: 'markers'`
    let trace_bubble = {
      x: selected_otu_ids,
      y: selected_sample_values,
      mode: "markers",
      marker: {
        size: selected_sample_values,
        color: selected_otu_ids,
        colorscale: "rainbow",
        showscale: true
      },
      text: selected_otu_labels,
      hoverinfo: "text"
    };

    let data_bubble = [trace_bubble];

    let layout_bubble = {
      title: "Abundance of Bacterial Cultures by OTU ID",
      xaxis: {
        range: [0, Math.max(...selected_otu_ids) * 1.1] // Adjust axis range for better visualization across all samples
      },
      yaxis: {
        range: [0, Math.max(...selected_sample_values) * 1.5]
      }
    };
    console.log(Math.max(...selected_otu_ids))

    // Render the Bubble Chart
    Plotly.newPlot("bubble", data_bubble, layout_bubble);
    
    // BEGIN CODE for BAR CHART
    // Place only the first 10 OTU IDs and sample_values into an array to use for y-ticks/x-values
    let top_otus = selected_otu_ids
      .slice(0,10)
      .map(function(id) {
        return `OTU ${id}`;
      })
    ;

    let top_sample_values = selected_sample_values.slice(0,10);

    // Build a horizontal bar chart (x and y are reversed from a standard vertical bar chart)
    let trace_bar = {
      y: top_otus,
      x: top_sample_values,
      type: "bar",
      orientation: 'h',
      text: selected_otu_labels,
      hoverinfo: "text"
    };

    let data_bar = [trace_bar];

    let layout_bar = {
      title: {
        text: "Top 10 Bacteria Cultures Found",
        pad: {
          t: 10
        }
      },
      yaxis: { 
        title: 'Operational Taxonomic Unit ID',
        standoff: 20
      },
      xaxis: { 
        title: 'Bacterial Abundance'
      },
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", data_bar, layout_bar);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      // Assign a variable to the array of all names (i.e., study subject IDs)
      let allNames = data.names

      // Select the dropdown div with id of `#selDataset`
      let dropdownMenu = d3.select("#selDataset");

      // Loop through the array to add all names to the selected dropdown
      for (let i = 0; i < allNames.length; i++) {
        dropdownMenu
          .append("option")
          .text(allNames[i])
          .attr("value", allNames[i]); // Still don't understand difference between text and attr...
      }

      // BUILD CHARTS and PANEL USING the FIRST SAMPLE

      // Assign a variable to the name that appears first in the data
      let inauguralName = allNames[0]

      // Populate the panel
      buildMetadata(inauguralName);

      // Populate the charts
      buildCharts(inauguralName);
    })
    .catch((error) => { // Runs a function if the promise fails
      console.error("Error fetching the data during initialization:", error);
    });
}

// Function for event listener
function optionChanged(sample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(sample);
  buildCharts(sample);
}

// Initialize the dashboard
init();
