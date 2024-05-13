import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
//import { Paper, Typography, useMediaQuery, Rating } from "@mui/material";
//import { LocationOnOutlined } from "@mui/icons-material";

const containerStyle = {
  height: "70vh",
};

const center = {
  lat: -26.2056,
  lng: 28.0337,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4",
  });

  const [map, setMap] = React.useState(null);
  /** 
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);*/

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        margin={[0]}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
