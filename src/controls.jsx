// Controls.jsx

import React from "react";
import _debounce from "lodash/debounce"; // Import the debounce function from lodash

const Controls = ({
  radiusValue,
  setRadiusValue,
  datasetValue,
  setDatasetValue,
  colourScaleValue,
  setColourScaleValue,
  createMap, // Receive the createMap function as a prop
}) => {
  // Debounced event handler for slider control
  const debouncedRadiusdleSliderChange = _debounce((value) => {
    setRadiusValue(Number(value)); // Set the slider value from the captured value
    // Update the map whenever the slider value changes
    createMap(Number(value), datasetValue, colourScaleValue);
  }, 200); // Set the debounce delay to 200 milliseconds

  // Event handler for slider control
  const handleRadiusChange = (event) => {
    const value = event.target.value; // Capture the slider value here
    debouncedRadiusdleSliderChange(value); // Use the debounced function with the captured value
  };

  // Event handler for text entry control
  const handleDatasetChange = (event) => {
    setDatasetValue(event.target.value);
    // Update the map whenever the text entry value changes
    createMap(radiusValue, event.target.value, colourScaleValue);
  };

  // Event handler for dropdown control
  const handleColourSetChange = (event) => {
    setColourScaleValue(event.target.value);
    // Update the map whenever the dropdown value changes
    createMap(radiusValue, datasetValue, event.target.value);
  };

  const defaultColorScales = [
    "Earth",
    "ArmyRose",
    "Fall",
    "Temps",
    "Geyser",
    "TealRose",
    "Sunset",
    "PurpOr",
    "OrYel",
  ];

  return (
    <div id="controls">
      <label htmlFor="dropdown">Dataset:</label>
      <select id="dropdown" value={datasetValue} onChange={handleDatasetChange}>
        <option value="Retail Stores">Retail Stores</option>
        <option value="Demographics">Demographics</option>
      </select>

      <label htmlFor="slider">Radius ({radiusValue}):</label>
      <input
        type="range"
        id="slider"
        min="0"
        max="10"
        value={radiusValue}
        onChange={handleRadiusChange}
      />

      <label htmlFor="dropdown">Color Scale:</label>
      <select
        id="dropdown"
        value={colourScaleValue}
        onChange={handleColourSetChange}
      >
        {defaultColorScales.map((colorScale, index) => (
          <option key={index} value={colorScale}>
            {colorScale}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Controls;
