import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import busStop from "../data/BusStopsAll.json";
import generateGeoJsonData from "../helpers/generateGeoJsonData";
import Popup from "./popup";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const Map = (props) => {
  const mapContainerRef = useRef();
  const popUpRef = useRef(
    new mapboxgl.Popup({ offset: 15, closeButton: false, closeOnClick: false })
  );
  const [mpbox, setMpbox] = useState(null);

  const [location, setLocation] = useState({
    latitude: 1.3697024,
    longitude: 103.8778368,
  });

  const getCord = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCord);
    } else {
      setLocation({ latitude: 1.3697024, longitude: 103.8778368 });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const center = [location.longitude, location.latitude];
    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v8",
      center: center,
      zoom: 12.5,
    });

    setMpbox(map);

    // Current location marker
    // let marker = new mapboxgl.Marker().setLngLat(center).addTo(map);

    // Add layer
    map.on("load", () => {
      // add the data source for new a feature collection with no features
      map.addSource("random-points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      // now add the layer, and reference the data source above by name
      map.addLayer({
        id: "random-points-layer",
        source: "random-points-data",

        type: "symbol",
        layout: {
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            ["*", 0, 1],
            15,
            ["*", 1, 1],
          ],
          "icon-image": "bus-15",
          "icon-padding": 0,
          "icon-allow-overlap": true,
        },
        paint: {
          "icon-color": "#00ffff",
          "icon-halo-color": "#fff",
          "icon-halo-width": 2,
        },
      });
    });

    map.on("moveend", async () => {
      // get new center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results = await generateGeoJsonData();

      // update "random-points-data" source with new data
      // all layers that consume the "random-points-data" data source will be updated automatically
      map.getSource("random-points-data").setData(results);
    });

    map.on("click", () => props.hideModal());
    map.on("click", "random-points-layer", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        props.toggleModal(feature.properties);
      }
    });

    map.on("mouseenter", "random-points-layer", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        // create popup node
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={feature} />, popupNode);
        // set popup on map
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", "random-points-layer", () => {
      popUpRef.current.remove();
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add control to get current location
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocate);

    // clean up on unmount
    return () => map.remove();
  }, [location]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      ref={mapContainerRef}
    />
  );
};

export default Map;
