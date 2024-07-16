import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Paper } from "@mui/material";
import Header from "./components/Header/Header";
import Grid from "@mui/material/Grid";
import Map from "./components/Map/Map";
import List from "./components/List/List";

const theme = createTheme({
  palette: {
    primary: { main: "#007bff" },
    secondary: { main: "#28a745" },
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
    if (coordinates.lat && coordinates.lng) {
      const fetchPlaces = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/places?lat=${coordinates.lat}&lng=${coordinates.lng}&northeast_lat=${bounds?.northeast?.lat}&northeast_lng=${bounds?.northeast?.lng}&southwest_lat=${bounds?.southwest?.lat}&southwest_lng=${bounds?.southwest?.lng}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPlaces(data.results);
          console.log(data);
        } catch (error) {
          setError("Failed to fetch data from server.");
          console.error("Error fetching data:", error);
        }
      };

      fetchPlaces();
    }
  }, [coordinates, bounds]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
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
