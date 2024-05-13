import React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Paper } from "@mui/material";
//import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
//import MyForm from "./components/test";
import Grid from "@mui/material/Unstable_Grid2";

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Adjust color values as needed
    },
    secondary: {
      main: "#28a745", // Adjust color values as needed
    },
  },
  // Other theme options...
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/**   <Grid container spacing={6} style={{width:'100vw'}}>
        <Grid item >
          {/**<List />*
          <MyForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map />
        </Grid>
      </Grid>**/}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={4}>
            <Item>
              <List />
            </Item>
          </Grid>
          <Grid xs={12} sm={12} md={8}>
            <Item>
              {/**<Map />*/}
              <Map />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
