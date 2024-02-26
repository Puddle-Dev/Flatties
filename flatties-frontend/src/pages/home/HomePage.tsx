import React, { useEffect, useState } from "react";
import { Typography, Button, Box, List, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PropertyInfo from "../../models/PropertyInfo";
import { useCookies } from "react-cookie";

/** "New Listings" will get the last "6" properties that were last listed
 * "Hottest Properties" will get the 6 listings on the most watchlists
 * "Nearest Listing" will get the 6 listings closest to the user
 */

function HomePage() {

  const [newListings, setNewListings] = useState<PropertyInfo []>([]);
const [cookies] = useCookies(["isLoggedIn", "userId"]);
  useEffect(() => {
    fetch('http://localhost:4000/api/property/all',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },})
    .then((response) => response.json())
    .then((data) => setNewListings(data.slice(0, 6)))
    .catch ((error) => console.error("Error fetching listings", error));
  }, []);


  return (
    <div>
      {cookies.isLoggedIn ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back! You are logged in.
          </Typography>
          <h3>User ID: {cookies.userId ? cookies.userId : "Not available"}</h3>
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
          {/* ... Other content for non-logged-in users */}
        </div>
      )}
      <div className="scroll-container">
        <Typography variant="h5" gutterBottom>
          Newest Listings
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {newListings.map((property) => (
            <List key={property._id} sx={{ marginRight: 2 }}>
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
                <h3>Property ID: {property._id}</h3>
                <h3>City: {property.city}</h3>
                <h3>Property Type: {property.propertyType}</h3>
                <h3>BedRooms: {property.bedRooms}</h3>
                <h3>BathRooms: {property.bathRooms}</h3>
                </Box>
              </Paper>
            </List>
          ))}
        </Box>

        <div className="scroll-container">
        <Typography variant="h5" gutterBottom>
          Hottest Properties
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
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
        </Box>
      </div>
      </div>

      <div className="scroll-container">
        <Typography variant="h5" gutterBottom>
          Nearist Listings
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
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
        </Box>
      </div>
    </div>
  );
}

export default HomePage;
