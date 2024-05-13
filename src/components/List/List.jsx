import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  InputLabel,
  Typography,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";

// Combined styled component for form elements
const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  /*flexDirection: "column",*/
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

const List = () => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("ratings");

  return (
    <>
      <Typography varient="h4">
        Restaurants, accommodations, and attractions nearby.
      </Typography>
      <StyledForm>
        <FormControl>
          <InputLabel htmlFor="my-input"></InputLabel>

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
        {/** 
        <FormControl>
          <InputLabel id="rating"></InputLabel>
          <Select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="3">Above 3.0</MenuItem>
            <MenuItem value="4">Above 4.0</MenuItem>
            <MenuItem value="4.5">Above 4.5</MenuItem>
          </Select>
        </FormControl>*/}
        {/**<Button variant="contained">Submit</Button>**/}
      </StyledForm>
    </>
  );
};

export default List;
