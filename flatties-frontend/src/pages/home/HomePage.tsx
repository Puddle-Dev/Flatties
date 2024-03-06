// HomePage.tsx
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PropertyInfo from "../../models/PropertyInfo";
import { useCookies } from "react-cookie";
import ScrollBox from "../../components/ScrollBox/ScrollBox"; // Import the new ScrollBox component
import WatchList from "../../components/watchList/WatchList"; // Import the new ScrollBox component


function HomePage() {
  const [newListings, setNewListings] = useState<PropertyInfo[]>([]);
  const [cookies] = useCookies(["isLoggedIn", "userId"]);

  useEffect(() => {
    fetch("http://localhost:4000/api/property/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setNewListings(data.slice(0, 6)))
      .catch((error) => console.error("Error fetching listings", error));
  }, []);

  return (
    <div>
      {cookies.isLoggedIn ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {cookies.userId ? cookies.userId : "Not available"}! You are logged in.
          </Typography>

          {/* Use the ScrollBox component for the Watchlist */}
          <WatchList/>

          {/* Other components... */}
        </div>
      ) : (
        <div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Flatties!
            </Typography>
            <Typography variant="body1" paragraph>
              Your go-to platform for streamlined property rentals. Property owners and managers can showcase vacancies, and prospective tenants can easily search and filter available residences.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/register">
              Register Here
            </Button>
          </div>
        </div>
      )}

      {/* Use the ScrollBox component for Newest Listings */}
      <ScrollBox title="Newest Listings" items={newListings} />

      {/* Use the ScrollBox component for Hottest Properties */}
      <ScrollBox title="Hottest Properties" items={[1, 2, 3, 4, 5, 6]} />
    </div>
  );
}

export default HomePage;
