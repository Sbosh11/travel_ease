import React from "react";
import { styled } from "@mui/system";
import { FormControl, InputLabel, Input, Button } from "@mui/material";

// Combined styled component for form elements
const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

// Using the styled component
const MyForm = () => {
  return (
    <StyledForm>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
      <Button variant="contained">Submit</Button>
    </StyledForm>
  );
};

export default MyForm;
