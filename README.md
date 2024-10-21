# Belly Button Bacteria Visualization

## Overview
This project uses D3 and Plotly to visualize the bacterial diversity of a dataset of several dozen samples of belly buttons.

## Method
First, separate, individual functions to generate the panel displaying the test subject's metadata and the pair of charts were defined. This was made slightly easier because the HTML design of the display page had already been prepared, so the div id's were known.

Second, the initialization function, which runs on page load, was defined. It contains both of the above two functions and chooses the first subject in order to display their data on page load.

Finally, the function that runs whenever the dropdown menu in the DOM detects a change, i.e., the page user selecting a new option from the dropdown, was defined. This was easy, since the name of this function had already been defined in the HTML tag.

## Adjustment
While Python used only = and == operators, Javascript also uses === to compare the data types, in addition to the value. It was suggested to use === to avoid the implicit data type coercion performed by ==.

However, this presented an issue when preparing the dataset's metadata (test subject demographic data), which stores the test subject's id as a numeric data type. Other parts of the dataset store the same value as a string, which matches the data type of the value being compared to the test subject's id, i.e., the selected value from the HTML page's dropdown menu.

This was resolved by using parseInt() but could also have been done by simply using the == operator.

## Conclusion
This visualization demonstrates the highly-organized way in which a dataset can be visualized using Plotly within an HTML framework aided by D3 event listeners.
