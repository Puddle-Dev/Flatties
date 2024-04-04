import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import useCookieManager from "../../services/cookies/cookieManager";
import ScrollContainer from "./ScrollContainer"; // Updated import
import DummyData from "../listing/dummyData.json";

// Assuming listings have a specific structure, you might want to define a more specific type
interface Listing {
  _id: string;
  // Add other properties as needed
}

function HomePage() {
  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const userName = getCookie("userName");
  const [userWatchList, setUserWatchList] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const watchListResponse = await axios.get(
            "/user/watchinglist",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserWatchList(watchListResponse.data);
          console.log("User watching list", watchListResponse.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    fetchData();
  }, [token, userName]);

  return (
    <div>
      {token ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome back {userName}! You are logged in.
          </Typography>
          <ScrollContainer
            listings={userWatchList.length > 0 ? userWatchList : DummyData}
          />
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
          <ScrollContainer listings={DummyData} />
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
    </div>
  );
}

export default HomePage;
