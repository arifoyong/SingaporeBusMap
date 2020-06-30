import BusStopData from "../data/stops.lta.json";

const fetchFakeData = () => {
  const newFeaturesList = [];
  const values = BusStopData;

  // const newFeaturesList = values.map((val, i) => {
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

  //   return geoJson;
  // });

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

  // for (let i = 0; i < 20; i++) {
  //   const id = i;
  //   const { longitude, latitude } = getRandomCoordinate(centerCoordinates);
  //   newFeaturesList.push({
  //     type: "Feature",
  //     geometry: {
  //       type: "Point",
  //       coordinates: [longitude, latitude],
  //     },
  //     properties: {
  //       id,
  //       name: `Random Point #${id}`,
  //       description: `description for Random Point #${id}`,
  //     },
  //   });
  // }

  return Promise.resolve({
    type: "FeatureCollection",
    features: newFeaturesList,
  });
};

/**
 * Generates a random point within 0.025 radius of map center coordinates.
 * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
 * @return {CoordinatePair} randomly generated coordinate pair
 */
const getRandomCoordinate = ({ longitude: centerLon, latitude: centerLat }) => {
  const r = 0.025 * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const latitude = centerLat + r * Math.cos(theta);
  const longitude = centerLon + r * Math.sin(theta);
  return { longitude, latitude };
};

export default fetchFakeData;
