// NewPropertyForm.tsx

import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import FlattiesLogo from "../../components/ImageLoader";
import DummyData from "../listing/dummyData.json";
import { useParams } from "react-router-dom";
import { Typography, Grid, Divider, Paper } from "@mui/material";

interface Params {
  id: string;
  [key: string]: string | undefined;
}

function ListingDetail() {
  const { id } = useParams<Params>();

  // Find the property with the matching id from the dummy data
  const formData = DummyData.find((item) => item._id === id);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {formData.listingTitle}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Carousel
            showArrows={true}
            showThumbs={true}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            stopOnHover={false}
          >
            {FlattiesLogo.map((image) => (
              <div key={image.id} style={{ height: "300px" }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Typography variant="h5" gutterBottom>
              Property Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {formData.description}
            </Typography>
            <Divider />
            <Typography variant="h5" gutterBottom>
              Room Details
            </Typography>
            <Typography variant="body1">
              Rent: {formData.rent} <br />
              Rent Method: {formData.rentMethod} <br />
              Payment Period: {formData.rentPaymentPeriod}
            </Typography>
            <Divider />
            <Typography variant="h5" gutterBottom>
              Amenities
            </Typography>
            <Typography variant="body1">
              Furnished: {formData.isFurnished ? "Yes" : "No"} <br />
              Pet Allowed: {formData.isPetAllowed ? "Yes" : "No"} <br />
              Smoking Allowed: {formData.isSmokingAllowed ? "Yes" : "No"} <br />
              Parking Allowed: {formData.isParkingAllowed ? "Yes" : "No"}
            </Typography>
            <Divider />
            <Typography variant="h5" gutterBottom>
              Location
            </Typography>
            <Typography variant="body1">
              City: {formData.city} <br />
              Address: {formData.address} <br />
              Suburb: {formData.suburb} <br />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListingDetail;
