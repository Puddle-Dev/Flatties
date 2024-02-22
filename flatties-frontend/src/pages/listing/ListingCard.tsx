import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Bathtub as BathroomIcon, Hotel as BedIcon } from "@mui/icons-material";
import flattieslogo from "../../assets/images/flatties-icon-logo.png";

interface DummyDataSchema {
  _id: string;
  listingTitle: string;
  rent: string;
  address: string;
  city: string;
  bedRooms: number;
  bathRooms: number;
}

const ListingCard = (data: DummyDataSchema) => {
  return (
    <Card style={{ maxWidth: 345, marginBottom: 8 }}>
      <CardHeader
        title={data.listingTitle}
        sx={{
          background: "rgb(40,47,68)",
          color: "white",
          textAlign: "center",
          padding: "8px",
        }}
      />
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={flattieslogo}
        title="Property"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.city}
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
                {data.rent}
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
    </Card>
  );
};

export default ListingCard;
