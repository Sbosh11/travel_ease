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
  const imageUrl =
    place.photos && place.photos.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyBCL1EwLHgn8s3qXIk-rTVtr3DW3P8ZHR4`
      : "https://via.placeholder.com/400";

  return (
    <Card elevation={6}>
      <CardMedia style={{ height: 350 }} image={imageUrl} title={place.name} />
      <CardContent>
        <Box display="flex" justifyContent="space-around">
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Typography display="flex">
            <Typography gutterBottom variant="h5">
              {place.rating}
            </Typography>
            <Star style={{ color: "gold", marginLeft: 5 }} />
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {place.business_status}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {place.formatted_address}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price Level</Typography>
          <Typography variant="subtitle1">{place.price_level}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {place.user_ratings_total} reviews
        </Typography>

        {place.types &&
          place.types.map((type) => (
            <Chip key={type} label={type} size="small" />
          ))}
        {place.plus_code && (
          <Typography variant="body2" color="textSecondary" component="p">
            Plus Code: {place.plus_code.compound_code}
          </Typography>
        )}

        {place.opening_hours && place.opening_hours.open_now !== undefined && (
          <Typography variant="body2" color="textSecondary" component="p">
            {place.opening_hours.open_now ? "Open Now" : "Closed"}
          </Typography>
        )}
        <CardActions>
          {place.website && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
