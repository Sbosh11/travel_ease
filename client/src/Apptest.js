import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Paper } from "@mui/material";
import Header from "./components/Header/Header";
import Grid from "@mui/material/Grid";

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
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:5000/places");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlaces(data.results);
      } catch (error) {
        setError("Failed to fetch data from server.");
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Item>
              <ul>
                {places.map((place, index) => (
                  <li key={index}>{place.name}</li>
                ))}
              </ul>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Item>{error && <p>{error}</p>}</Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
