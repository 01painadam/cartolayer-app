import "./App.css";

import "./index.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { createMap } from "./map";
import Controls from "./controls";
import React, { useState } from "react";

const App = () => {
  // State variables to store the values from the controls
  const [radiusValue, setRadiusValue] = useState(3);
  const [datasetValue, setDatasetValue] = useState("Retail Stores");
  const [colourScaleValue, setColourScaleValue] = useState("Earth");

  //initialise map
  React.useEffect(() => {
    createMap(radiusValue, datasetValue, colourScaleValue);
  }, []);

  return (
    <div id="app">
      <Controls
        radiusValue={radiusValue}
        setRadiusValue={setRadiusValue}
        datasetValue={datasetValue}
        setDatasetValue={setDatasetValue}
        colourScaleValue={colourScaleValue}
        setColourScaleValue={setColourScaleValue}
        createMap={createMap}
      />
      <div id="map"></div>
      <canvas id="deck-canvas"></canvas>
    </div>
  );
};

export default App;
