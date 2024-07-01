import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Paper } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Grid from "@mui/material/Unstable_Grid2";
import { getPlacesDetails } from "./API";
import "./App.css";

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#28a745",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [initialCenter, setInitialCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialCenter({ lat: latitude, lng: longitude });
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          setError(error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (coordinates && bounds) {
      console.log("Coordinates and bounds:", coordinates, bounds);
      getPlacesDetails(bounds.sw, bounds.ne).then((data) => {
        if (data) {
          setPlaces(data);
          console.log("Received places data:", data);
        } else {
          console.log("No data received from API");
        }
      });
    }
  }, [coordinates, bounds]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={4}>
            <Item>
              <List places={places} />
            </Item>
          </Grid>
          <Grid xs={12} sm={12} md={8}>
            <Item>
              {error && <p>{error}</p>}
              <Map
                initialCenter={initialCenter}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={places}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
