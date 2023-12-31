# CartoLayer App

A demo to build a small geospatial data visualisation app using [deck.gl](https://deck.gl/) and [CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer). This project is an opportunity to learn developing a React app from scratch.

<img width="1012" alt="Screenshot 2023-07-25 at 10 47 07" src="https://github.com/01painadam/cartolayer-app/assets/30242314/a4545af1-a5da-4ea3-88ed-50dbd9440cf9">

## What is does

The application pulls two datasets from CARTO's data warehouse:

- USA retail store data (`carto-demo-data.demo_tables.retail_stores`)
- USA Demographic data (`carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`)

The map also provides controls to select between these datasets as well as controls to also the visualisation:

1. Radius control - the size, in pixels, of the point data between 1 and 10 (Retail Store Data only)
1. Colour Scale control - change the colour palette of the visualsed data

Data can be explored through map interaction and information about individual data entries is displayed on hover (in a striking fabada pink tooltip!).

## How to run

1. Generate base URL and generate Access tokens for these data, see: [docs](https://docs.carto.com/carto-user-manual/developers)
2. npm install
3. npm run dev

## To do's

Next steps for the project are to extend range of controls available and make them dataset-specific. For example, changing the radius of point data should not be available for polygon-based datasets. As such the controls should be configured for each dataset and the available controls should change with the selected dataset.

Paramaterising the control functions (specifically the event handlers) and passing the control props to the map, in stead of individual values, would make scaling the controls to include others much easier. 

Another known issue to fix is the handling of the map state after user interaction (namely, zoom). Currently zooming resets the control values sent to to map - which do not persist. Further research is needed here but I suspect that seperating the state management of the map and controls is required.

Finally, CSS can obviously be improved.
