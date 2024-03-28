import React, { useEffect, useState } from "react";
import { Typography, Button, Box, List, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PropertyInfo from "../../models/PropertyInfo";
import useCookieManager from "../../services/cookies/cookieManager";
import config from "../../config";
import ScrollContainer from "./ScrollContainer";
import ListingCard from "../listing/ListingCard";


function HomePage() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const [newListings, setNewListings] = useState([]);
  const [hottestListings, setHottestListings] = useState([]);


  const listings = [
    {
      _id: "1",
      listingTitle: "Beautiful Apartment",
      rent: 1500,
      address: "123 Main St",
      city: "New York",
      suburb: "Manhattan",
      bedRooms: 2,
      bathRooms: 1,
    },
    {
      _id: "2",
      listingTitle: "Cozy Studio",
      rent: 1000,
      address: "456 Elm St",
      city: "San Francisco",
      suburb: "Downtown",
      bedRooms: 1,
      bathRooms: 1,
    },
  ];

  useEffect(() => {
    if (token) {
      fetch("http://localhost:4000/api/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserId(data.user._id))
        .catch((error) => console.error("Error fetching user data", error));
    }
  }, [getCookie]);


  return (
    <div>
      {token ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {userId}! You are logged in.
          </Typography>
          <ScrollContainer title="Your Watchlist">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <List key={index} sx={{ marginRight: 2 }}>
                <Paper sx={{ width: 300, minWidth: 250, marginBottom: "8px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 2,
                      fontStyle: { textAlign: "left" },
                    }}
                  >
                    <h3>Index: {index}</h3>
                    <h3>Property ID: </h3>
                    <h3>City: </h3>
                    <h3>Property Type: </h3>
                    <h3>BedRooms: </h3>
                    <h3>BathRooms: </h3>
                  </Box>
                </Paper>
              </List>
            ))}
          </ScrollContainer>
        </div>
      ) : (
        <div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Flatties!
            </Typography>
            <Typography variant="body1" paragraph>
              Your go-to platform for streamlined property rentals. Property
              owners and managers can showcase vacancies, and prospective
              tenants can easily search and filter available residences.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register"
            >
              Register Here
            </Button>
          </div>
        </div>
      )}

      <ScrollContainer title="Newest Properties">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <List key={index} sx={{ marginRight: 2 }}>
            <Paper sx={{ width: 300, minWidth: 250, marginBottom: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 2,
                  fontStyle: { textAlign: "left" },
                }}
              >
                <h3>Index: {index}</h3>
                <h3>Property ID: </h3>
                <h3>City: </h3>
                <h3>Property Type: </h3>
                <h3>BedRooms: </h3>
                <h3>BathRooms: </h3>
              </Box>
            </Paper>
          </List>
        ))}
      </ScrollContainer>

      <ScrollContainer title="Hottest Properties">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <List key={index} sx={{ marginRight: 2 }}>
            <Paper sx={{ width: 300, minWidth: 250, marginBottom: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 2,
                  fontStyle: { textAlign: "left" },
                }}
              >
                <h3>Index: {index}</h3>
                <h3>Property ID: </h3>
                <h3>City: </h3>
                <h3>Property Type: </h3>
                <h3>BedRooms: </h3>
                <h3>BathRooms: </h3>
              </Box>
            </Paper>
          </List>
        ))}
      </ScrollContainer>

      <ScrollContainer title="Featured Listings">
      {listings.map((listing) => (
        <ListingCard key={listing._id} {...listing} />
      ))}
    </ScrollContainer>
    </div>
  );
}

export default HomePage;
