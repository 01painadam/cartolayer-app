import maplibregl from "maplibre-gl";
import { Deck } from "@deck.gl/core/typed";
import {
  BASEMAP,
  MAP_TYPES,
  CartoLayer,
  setDefaultCredentials,
  colorBins,
} from "@deck.gl/carto/typed";

const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

setDefaultCredentials({ apiBaseUrl, accessToken });

export function createMap(sliderValue, datasetValue, dropdownValue) {
  let zoom = 4;
  const INITIAL_VIEW_STATE = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: zoom,
    bearing: 0,
    pitch: 30,
  };

  const datasetConfig = {
    Demographics: new CartoLayer({
      id: "demographics",
      connection: "carto_dw",
      type: MAP_TYPES.TILESET,
      data: "carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup",
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getFillColor: colorBins({
        attr: "total_pop",
        domain: [734, 938, 1155, 1392, 1712, 2236],
        colors: dropdownValue,
      }),
      getLineColor: [255, 102, 153, 0],
      getLineWidth: 1,
    }),
    "Retail Stores": new CartoLayer({
      id: "stores",
      connection: "carto_dw",
      type: MAP_TYPES.TABLE,
      data: "carto-demo-data.demo_tables.retail_stores",
      pointRadiusMinPixels: 0,
      pointRadiusUnits: "pixels",
      getPointRadius: sliderValue,
      pickable: true,
      getFillColor: colorBins({
        attr: "revenue",
        domain: [1.0e6, 1.2e6, 1.4e6, 1.6e6, 1.8e6, 2.0e6, 2.2e6],
        colors: dropdownValue,
      }),
      getLineColor: [255, 102, 153, 0],
      getLineWidth: 1,
    }),
  };
  const renderLayers = () => {
    const layers = [datasetConfig[datasetValue]];

    deck.setProps({
      layers: layers,
    });
  };

  const deck = new Deck({
    canvas: "deck-canvas",
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    getTooltip: ({ object }) =>
      object &&
      object.properties && {
        html: Object.entries(object.properties).reduce((acc, [key, value]) => {
          return acc + `<div>${key}: ${value}</div>`;
        }, ""),
        style: {
          backgroundColor: "#fabada",
          color: "#000000",
          fontSize: "0.9em",
        },
      },
  });

  const map = new maplibregl.Map({
    container: "map",
    style: BASEMAP.VOYAGER,
    interactive: true,
  });
  deck.setProps({
    onViewStateChange: ({ viewState }) => {
      const { longitude, latitude, ...rest } = viewState;
      zoom = viewState.zoom;
      renderLayers();
      map.jumpTo({ center: [longitude, latitude], ...rest });
    },
  });
}
