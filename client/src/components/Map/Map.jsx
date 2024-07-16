import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const containerStyle = {
  height: "70vh",
  width: "100%",
};

const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
  return {
    x: offsetWidth + labelAnchor.x,
    y: offsetHeight + labelAnchor.y,
  };
};

function Map({ places }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4",
  });

  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        console.log(`User's location: ${latitude}, ${longitude}`);
      },
      (error) => {
        console.error("Error getting user's location: ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (map && places.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(place.geometry.location);
      });
      map.fitBounds(bounds);
    }
  }, [map, places]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={coordinates} title="User's Location" />
      {places.map((place, index) => (
        <React.Fragment key={index}>
          <OverlayView
            position={{
              lat: Number(place.geometry.location.lat),
              lng: Number(place.geometry.location.lng),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(offsetWidth, offsetHeight) =>
              getPixelPositionOffset(offsetWidth, offsetHeight, {
                x: -30,
                y: -15,
              })
            }
          >
            <div
              style={{
                background: `#203254`,
                padding: `7px 12px`,
                fontSize: "11px",
                color: `white`,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                width: "max-content",
              }}
            >
              <RestaurantIcon style={{ marginRight: 4 }} />
              <span>{place.rating}</span>
            </div>
          </OverlayView>
        </React.Fragment>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
