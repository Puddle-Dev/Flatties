import React, { useEffect, useState } from "react";
import { Typography, Button, Box, List, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PropertyInfo from "../../models/PropertyInfo";
import useCookieManager from "../../services/cookies/CookieManager";
import ScrollContainer from "./ScrollContainer";
import DummyData from "../listing/dummyData.json";


function HomePage() {

  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const userName = getCookie("userName");




  useEffect(() => {
    if (token) {
      console.log(token);
      fetch("http://localhost:4000/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
       
        .catch((error) => console.error("Error fetching user data", error));
        console.log(userName);
    }
  }, [getCookie]);

 
  return (
    <div>
      {token ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {userName}! You are logged in.
          </Typography>
          <ScrollContainer listings={DummyData} />
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

    </div>
  );
}

export default HomePage;
