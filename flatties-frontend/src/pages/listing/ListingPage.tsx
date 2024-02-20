import React, { useState, useEffect } from "react";

import api from "../../services/api";

import { Stack, Paper, Box, List, Grid, Typography } from "@mui/material";

import PropertyInfo from "../../models/PropertyInfo";

import RentalInfo from "../../models/RentalInfo";

import dummyImage from "../../assets/images/flatties-icon-logo.png";

import BathroomIcon from "@mui/icons-material/Bathroom";

import BedIcon from "@mui/icons-material/Bed";

import DummyData from "./dummyData.json";

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
      <Stack direction={"row"} spacing={1}>
        <List
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            columnGap: "16px",
            rowGap: "16px",
          }}
        >
          {DummyData.map((data, index) => (
            <div
              style={{
                width: "250px",
                marginBottom: "8px",
                display: "inline-flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {data.listingTitle}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {data.city}
                </Typography>
                <img
                  src={dummyImage}
                  alt="Property"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
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
                      <Box display="flex" justifyContent="flex-end">
                        <BathroomIcon />
                        <Typography variant="body1" gutterBottom>
                          {data.bedRooms}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box display="flex" justifyContent="flex-end">
                        <BedIcon />
                        <Typography variant="body1" gutterBottom>
                          {data.bathRooms}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </div>
          ))}
          {/* {combinedData.map((data, index) => (
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
          ))} */}
        </List>
      </Stack>
    </div>
  );
}

export default ListingPage;
