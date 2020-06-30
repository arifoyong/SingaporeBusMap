import BusStopData from "../data/stops.lta.json";

const generateGeoJsonData = () => {
  const newFeaturesList = [];
  const values = BusStopData;

  for (const [key, val] of Object.entries(values)) {
    const geoJson = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [val.Longitude, val.Latitude],
      },
      properties: {
        id: val.BusStopCode,
        name: val.RoadName,
        description: val.Description,
      },
    };

    newFeaturesList.push(geoJson);
  }

  return Promise.resolve({
    type: "FeatureCollection",
    features: newFeaturesList,
  });
};

export default generateGeoJsonData;
