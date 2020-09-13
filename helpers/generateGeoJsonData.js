import BusStopData from "../data/BusStopsAll.json";
// import BusStopData from "../data/stops.lta.json";

const geoJson = (val) => {
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

  return geoJson;
};

const generateGeoJsonData = () => {
  // const newFeaturesList = [];
  // const values = BusStopData;

  // for (const [key, val] of Object.entries(values)) {
  //   const geoJson = {
  //     type: "Feature",
  //     geometry: {
  //       type: "Point",
  //       coordinates: [val.Longitude, val.Latitude],
  //     },
  //     properties: {
  //       id: val.BusStopCode,
  //       name: val.RoadName,
  //       description: val.Description,
  //     },
  //   };

  //   newFeaturesList.push(geoJson);
  // }

  const values = BusStopData.value;
  let newFeaturesList = values.map((val) => {
    return geoJson(val);
  });

  return Promise.resolve({
    type: "FeatureCollection",
    features: newFeaturesList,
  });
};

export default generateGeoJsonData;
