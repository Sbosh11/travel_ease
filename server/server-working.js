import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to proxy the Google Places API request
app.get("/places", async (req, res) => {
  const URL =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&location=-26.1507068,28.367639&radius=50000&key=AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4";
  const category = "restaurant";
  const lat = -26.1507068;
  const lng = 28.367639;
  const radius = 50000;
  //const API_KEY = "AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4";

  // const searchURL = `${URL}?query=${category}&location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;
  //console.log(searchURL);
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from Google Places API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
