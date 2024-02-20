import React, { useState, useEffect } from "react";

import api from "../../services/api";

import { Stack, Paper, Box, List, Divider, Typography } from "@mui/material";

import PropertyInfo from "../../models/PropertyInfo";

import RentalInfo from "../../models/RentalInfo";

function ListingPage() {
  const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  const [rentalData, setRentalData] = useState<RentalInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesResponse = await api.get("/property/all");
        const listingResponse = await api.get("/listing/all");
        setListingsData(propertiesResponse.data);
        setRentalData(listingResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const combinedData = [...listingsData, ...rentalData];

  return (
    <div>
      <Typography variant="h4">Current Listings</Typography>

      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          flexWrap: "wrap",
          justifyContent: "flex-start",
          columnGap: "16px",
          rowGap: "16px",
        }}
      >
        <List>
          {combinedData.map((data, index) => (
            <Paper
              key={(data as PropertyInfo)._id}
              sx={{ width: 500, minWidth: 250, marginBottom: "8px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 2,
                  fontStyle: { textAlign: "left" },
                }}
              >
                <h3>Listing Title: {(data as RentalInfo).listingTitle}</h3>
                <h3>Asking Rent: {(data as RentalInfo).rent}</h3>
                <h3>Address: {(data as PropertyInfo).address}</h3>
                <h3>City: {(data as PropertyInfo).city}</h3>
                <h3>Bedrooms: {(data as PropertyInfo).bedRooms}</h3>
                <h3>Bathrooms: {(data as PropertyInfo).bathRooms}</h3>
              </Box>
            </Paper>
          ))}
        </List>
      </Stack>
    </div>
  );
}

export default ListingPage;
