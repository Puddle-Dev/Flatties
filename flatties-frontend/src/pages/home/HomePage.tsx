import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import useCookieManager from "../../services/cookies/cookieManager";
import ScrollContainer from "./ScrollContainer";
import DummyData from "../listing/dummyData.json";

function HomePage() {
  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const userName = getCookie("userName");

  useEffect(() => {
    if (token) {
      console.log(token);
      // Use Axios for the API call
      axios
        .get("http://localhost:4000/api/v1/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle the response data
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching user data", error);
        });
      console.log(userName);
    }
  }, [token, userName]); // It's better to depend on `token` and `userName` directly

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
