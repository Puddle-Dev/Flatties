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
  const dummyData = [
    {
      _id: "1",
      listingTitle: "Spacious Apartment in Auckland CBD",
      rent: "$2200",
      address: "123 Queen Street",
      city: "Auckland",
      bedRooms: 2,
      bathRooms: 2,
    },
    {
      _id: "2",
      listingTitle: "Modern Townhouse with Harbor Views",
      rent: "$2500",
      address: "5 Harbor View Road",
      city: "Auckland",
      bedRooms: 3,
      bathRooms: 2,
    },
    {
      _id: "3",
      listingTitle: "Cozy Studio near Auckland University",
      rent: "$1500",
      address: "25 University Avenue",
      city: "Auckland",
      bedRooms: 1,
      bathRooms: 1,
    },
    {
      _id: "4",
      listingTitle: "Family Home in Suburban Auckland",
      rent: "$2800",
      address: "10 Green Street",
      city: "Auckland",
      bedRooms: 4,
      bathRooms: 2,
    },
    {
      _id: "5",
      listingTitle: "Luxury Penthouse in Auckland CBD",
      rent: "$5000",
      address: "1 Sky Tower Avenue",
      city: "Auckland",
      bedRooms: 3,
      bathRooms: 3,
    },
    {
      _id: "6",
      listingTitle: "Charming Cottage in Auckland Suburb",
      rent: "$1800",
      address: "15 Park Road",
      city: "Auckland",
      bedRooms: 2,
      bathRooms: 1,
    },
    {
      _id: "7",
      listingTitle: "Sunny Apartment near Auckland Harbor",
      rent: "$2100",
      address: "30 Harbor Way",
      city: "Auckland",
      bedRooms: 2,
      bathRooms: 1,
    },
    {
      _id: "8",
      listingTitle: "Modern Loft in Auckland City Center",
      rent: "$1900",
      address: "50 High Street",
      city: "Auckland",
      bedRooms: 1,
      bathRooms: 1,
    },
    {
      _id: "9",
      listingTitle: "Executive Home with Pool in Auckland",
      rent: "$4000",
      address: "7 Hillside Drive",
      city: "Auckland",
      bedRooms: 5,
      bathRooms: 3,
    },
    {
      _id: "10",
      listingTitle: "Beachfront Property in Auckland Suburb",
      rent: "$3500",
      address: "20 Beach Road",
      city: "Auckland",
      bedRooms: 3,
      bathRooms: 2,
    },
  ];

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
          {dummyData.map((data, index) => (
            <Paper
              key={index}
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
                <h3>Listing Title: {data.listingTitle}</h3>
                <h3>Asking Rent: {data.rent}</h3>
                <h3>Address: {data.address}</h3>
                <h3>City: {data.city}</h3>
                <h3>Bedrooms: {data.bedRooms}</h3>
                <h3>Bathrooms: {data.bathRooms}</h3>
              </Box>
            </Paper>
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
