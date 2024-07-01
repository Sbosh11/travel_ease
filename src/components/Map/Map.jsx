import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { Star, Restaurant } from "@mui/icons-material";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

const containerStyle = {
  height: "70vh",
  width: "100%",
};

const StyledPaper = styled(Paper)(() => ({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "max-content", // Set width to max-content
}));

const MarkerContainer = styled("div")(() => ({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100px",
}));

function Map({ setCoordinates, setBounds, coordinates, places }) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4", //API key
  });

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleBoundsChanged = useCallback(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const newBounds = {
          ne: { lat: ne.lat(), lng: ne.lng() },
          sw: { lat: sw.lat(), lng: sw.lng() },
        };
        setBounds((prevBounds) => {
          if (JSON.stringify(prevBounds) !== JSON.stringify(newBounds)) {
            return newBounds;
          }
          return prevBounds;
        });
      }
    }
  }, [map, setBounds]);

  const handleCenterChanged = useCallback(() => {
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        const newCoordinates = { lat: newCenter.lat(), lng: newCenter.lng() };
        setCoordinates((prevCoordinates) => {
          if (
            JSON.stringify(prevCoordinates) !== JSON.stringify(newCoordinates)
          ) {
            return newCoordinates;
          }
          return prevCoordinates;
        });
      }
    }
  }, [map, setCoordinates]);

  useEffect(() => {
    if (map) {
      handleBoundsChanged();
      handleCenterChanged();
    }
  }, [map, handleBoundsChanged, handleCenterChanged]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onCenterChanged={handleCenterChanged}
      onBoundsChanged={handleBoundsChanged}
    >
      {places?.map((place, i) => (
        <OverlayView
          key={i}
          position={{
            lat: Number(place.latitude),
            lng: Number(place.longitude),
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            style={{
              background: "white",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
              textAlign: "center",
              width: "80px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedPlace(place)}
          >
            <Typography variant="body2">{place.rating}</Typography>
            <Restaurant />
          </div>
        </OverlayView>
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: Number(selectedPlace.latitude),
            lng: Number(selectedPlace.longitude),
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <StyledPaper elevation={3}>
            <img
              src={
                selectedPlace.photo
                  ? selectedPlace.photo.images.large.url
                  : "/chairs-cutlery-fork.webp"
              }
              alt={selectedPlace.name}
              style={{ width: "auto", height: "100px" }}
            />
            <Typography variant="subtitle2" gutterBottom>
              {selectedPlace.name}
            </Typography>
            <Typography display="flex">
              <Typography gutterBottom variant="h5">
                {selectedPlace.rating}
              </Typography>
              <Star style={{ color: "gold", marginLeft: 5 }} />
              <Restaurant style={{ marginLeft: 5 }} />
            </Typography>
          </StyledPaper>
        </InfoWindow>
      )}
      <Marker position={coordinates} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
