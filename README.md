# Belly Button Bacteria Visualization

## Overview
This project uses D3 and Plotly to visualize the bacterial diversity of a dataset of several dozen samples of belly buttons.

## Method
First, separate, individual functions to generate the panel displaying the test subject's metadata and the pair of charts were defined. This was made slightly easier because the HTML design of the display page had already been prepared, so the div id's were known.
Second, the initialization function, which runs on page load, was defined. It contains both of the above two functions and chooses the first subject in order to display their data on page load.
Finally, the function that runs whenever the dropdown menu in the DOM detects a change, i.e., the page user selecting a new option from the dropdown, was defined. This was easy, since the name of this function had already been defined in the HTML tag.

## Adjustment
Text vs attribute

## Conclusion
This visualization demonstrates the highly-organized way in which a dataset can be visualized using Plotly within an HTML framework aided by D3 event listeners.
