import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Typography,
} from "@mui/material";
import { LocationOn, Phone, Star } from "@mui/icons-material";

const PlaceDetails = ({ place }) => {
  const imageUrl = place.photo
    ? place.photo.images.large.url
    : "/chairs-cutlery-fork.webp";
  return (
    /**<h1>{place.name}</h1>**/
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={imageUrl}
        title={place.name}
      ></CardMedia>
      <CardContent>
        <Box display="flex" justifyContent="space-around">
          <Typography gutterBottom varient="h5">
            {place.name}
          </Typography>
          <Typography display="flex">
            <Typography gutterBottom varient="h5">
              {place.rating}
            </Typography>
            <Star style={{ color: "gold", marginLeft: 5 }} />
          </Typography>
        </Box>
        {place?.price && (
          <Box display="flex" justifyContent="space-between">
            <Typography varient="subtitle1">Price</Typography>
            <Typography varient="subtitle1">{place.price}</Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography varient="subtitle1">ranking</Typography>
          <Typography varient="subtitle1">{place.ranking}</Typography>
        </Box>
        {/**{place?.awards?.map((award)=>(
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
          </Box>
        )
      )}**/}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} label={name} size="small"></Chip>
        ))}
        {place?.address && (
          <Typography gutterBottom varient="subtitle2">
            <LocationOn />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom varient="subtitle2">
            <Phone />
            {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default PlaceDetails;
