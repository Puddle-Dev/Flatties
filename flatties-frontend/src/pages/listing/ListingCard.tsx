import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActionArea,
  IconButton,
  Stack,
} from "@mui/material";
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Bathtub as BathroomIcon, Hotel as BedIcon } from "@mui/icons-material";
import flattieslogo from "../../assets/images/flatties-icon-logo.png";
import { Link } from "react-router-dom";

interface DummyDataSchema {
  _id: string;
  listingTitle: string;
  rent: number;
  address: string;
  city: string;
  suburb: string;
  bedRooms: number;
  bathRooms: number;
}

const ListingCard = (data: DummyDataSchema) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card style={{ maxWidth: 345, minWidth: 250, position: 'relative', marginBottom: 8 }}> {/* Adjusted styles for positioning */}
      <CardActionArea component={Link} to={`/listing/${data._id}`}>
        <CardHeader
          title={data.listingTitle.length > 30
            ? `${data.listingTitle.substring(0, 30)}...` // If so, truncate and add "..."
            : data.listingTitle} // Otherwise, use the title as is
          sx={{
            background: "rgb(40,47,68)",
            color: "white",
            textAlign: "center",
            padding: "8px",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%", width: '100%' }}
            image={flattieslogo}
            title="Property"
          />
         
        </Stack>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.suburb}, {data.city}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data.address}
          </Typography>
          <Grid container alignItems={"stretch"}>
            <Grid item xs={4} alignItems={"stretch"}>
              <Box display="flex" justifyContent="flex-start">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontSize: "1.5rem" }}
                >
                  ${data.rent}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              container
              justifyContent="flex-end"
              alignItems={"center"}
            >
              <Grid item xs={4}>
                <Box display="flex" justifyContent="space-evenly">
                  <BathroomIcon />
                  <Typography variant="body1" gutterBottom>
                    {data.bedRooms}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" justifyContent="space-evenly">
                  <BedIcon />
                  <Typography variant="body1" gutterBottom>
                    {data.bathRooms}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <IconButton
            onClick={toggleFavorite}
            sx={{
              position: 'absolute',
              top: 75,
              right: 0,
              color: isFavorite ? 'red' : 'white', // Change color based on state
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
              margin: '8px', // Add some spacing from the corners
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker on hover
              },
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
    </Card>
  );
};

export default ListingCard;
