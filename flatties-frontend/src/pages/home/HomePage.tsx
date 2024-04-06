import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import useCookieManager from "../../services/cookies/cookieManager";
import ScrollContainer from "./ScrollContainer";
import DummyData from "../listing/dummyData.json";

interface Listing {
  _id: string;
  listingTitle: string;
  rent: number;
  address: string;
  city: string;
  suburb: string;
  bedRooms: number;
  bathRooms: number;
}

function HomePage() {
  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const userName = getCookie("userName");
  const [userWatchList, setUserWatchList] = useState<Listing[]>([]);
  const [allProperties, setAllProperties] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const watchListResponse = await axios.get("/user/watchinglist", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUserWatchList(watchListResponse.data);
          console.log("User watching list", watchListResponse.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    const fetchAllProperties = async () => {
      try {
        const response = await axios.get("/property/all", {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        setAllProperties(response.data);
      } catch (error) {
        console.error("Error fetching all properties", error);
      }
    };

    fetchAllProperties();
    fetchData();
  }, [token, userName]);

  return (
    <div>
      {token ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {userName}! You are logged in.
          </Typography>
          {userWatchList.length > 0 ? (
            <ScrollContainer listings={userWatchList} />
          ) : (
            <Typography variant="h6" gutterBottom style={{ textAlign: "center", marginTop: "20px" }}>
              Your watchlist is currently empty. Click the heart icon on properties to see them here!
            </Typography>
          )}
        </div>
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Flatties!
          </Typography>
          <Typography variant="body1" paragraph>
            Your go-to platform for streamlined property rentals. Property
            owners and managers can showcase vacancies, and prospective tenants
            can easily search and filter available residences.
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
      )}
      <ScrollContainer listings={DummyData} />
      <ScrollContainer listings={allProperties} />
    </div>
  );
}

export default HomePage;
