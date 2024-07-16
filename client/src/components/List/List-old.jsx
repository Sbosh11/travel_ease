import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  InputLabel,
  Typography,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails-old";

// Combined styled component for form elements
const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiFormControl-root": {
    margin: theme.spacing(1),
    minWidth: 120,
    "& label": {
      color: theme.palette.primary.main,
    },
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.main,
    },
  },
  "& .MuiButton-root": {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const List = ({ places }) => {
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
 // console.log("list", places);
  return (
    <>
      <Typography variant="h4">
        Restaurants, accommodations, and attractions nearby.
      </Typography>
      <StyledForm>
        <FormControl>
          <InputLabel id="type">Restuarants</InputLabel>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="rating">Ratings</InputLabel>
          <Select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value="3">Above 3.0</MenuItem>
            <MenuItem value="4">Above 4.0</MenuItem>
            <MenuItem value="4.5">Above 4.5</MenuItem>
          </Select>
        </FormControl>
      </StyledForm>
      <Grid container spacing={3} sx={{ marginTop: "50px" }}>
        {Array.isArray(places) && places.length > 0 ? (
          places.map((place, i) => (
            <Grid item key={i} xs={12}>
              <PlaceDetails place={place} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6"></Typography>
        )}
      </Grid>
    </>
  );
};

export default List;
