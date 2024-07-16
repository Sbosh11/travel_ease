import axios from "axios";

const URL = "";
// "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesDetails = async (sw, ne) => {
  const options = {
    method: "GET",
    url: URL,
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      "x-rapidapi-key": "fb4d1df22dmsh8c894fa1e543168p186030jsn6d7e1d50d732",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "Content-Type": "application/json",
      "X-RapidAPI-Mock-Response": "200",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Full API Response:", response);
    const { data } = response.data;
    console.log("Data from API:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};
