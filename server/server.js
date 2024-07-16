const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/places", async (req, res) => {
  const URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const category = "restaurant";
  const {
    lat,
    lng,
    northeast_lat,
    northeast_lng,
    southwest_lat,
    southwest_lng,
  } = req.query;
  const radius = 500;
  const API_KEY = "AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4";

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  let searchURL = `${URL}?query=${category}&location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;

  if (northeast_lat && northeast_lng && southwest_lat && southwest_lng) {
    searchURL += `&bounds=${southwest_lat},${southwest_lng}|${northeast_lat},${northeast_lng}`;
  }

  console.log(searchURL);
  try {
    const response = await fetch(searchURL);
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
