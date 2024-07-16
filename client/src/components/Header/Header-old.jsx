import React from "react";
//import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
//import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

const Header = () => {
const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography varient="h5" className={classes.title}>
          Travel Ease
        </Typography>
        <Box display="flex">
          <Typography varient="h6" className={classes.title}>
            Explore New Places
          </Typography>
          {/*<Autocomplete>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search...."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              ></InputBase>
            </div>
  </Autocomplete>*/}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
