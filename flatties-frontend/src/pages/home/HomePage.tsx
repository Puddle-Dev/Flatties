import React, { useEffect, useState } from "react";
import { Typography, Button, Box, List, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PropertyInfo from "../../models/PropertyInfo";
import ScrollContainer from "./ScrollContainer";
import DummyData from "../listing/dummyData.json";
import { useCookie } from "../../services/cookies/CookieContext"

interface User{
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
}

function HomePage() {

  const [user, setUser] = useState<object | string | undefined>();
  const [token, setToken] = useState<object | string | undefined>();
  const { getCookie } = useCookie();

  useEffect(() => {
        // get the user and token from the cookies
        const cookieUser = getCookie("user");
        const cookieToken = getCookie("token");

        // check if the user and token exist
        if (cookieUser) {
          setUser(cookieUser);
        }
        if (cookieToken) {
          setToken(cookieToken);
        }

        console.log("User: ", user)
        console.log("Token: ", token)
      }
   ,[getCookie]);

 
  return (
    <div>
      {user ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {user?.userName}! You are logged in.
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
