import React, { useEffect, useState } from "react";
import profilePic from "../../assets/images/flatties-icon-logo.png";
import "./ProfilePage.css";
import UserInfo from "../../models/UserInfo";
import axios from "../../services/api";
import { Button, Typography } from "@mui/material";
import useCookieManager from "../../services/cookies/cookieManager";
import ScrollContainer from "../home/ScrollContainer";

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

function ProfilePage() {
  const initialUserInfo: UserInfo = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: null,
    password: "",
  };

  const { getCookie } = useCookieManager();
  const token = getCookie("token");
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [userWatchList, setUserWatchList] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const profileResponse = await axios.get("/user/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo(profileResponse.data);
          setUserWatchList(profileResponse.data.watchinglist);
          console.log("User profile", profileResponse.data.data);
          console.log("User Watchlist ", profileResponse.data.data.watchingList);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };
    fetchProfile();
  }, [token]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "Not Provided";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="userProfile clearfix">
      <div className="topRow">
        <div className="userInformation">
          <img src={profilePic} alt="Profile" />
          <div className="userInfo">
            <h3>User Name:</h3>
            <p>{userInfo.userName || "Loading"}</p>
          </div>
          <div className="userInfo">
            <h3>Introduction:</h3>
            <p>Here should be some description about yourself</p>
          </div>
        </div>
        <hr />
      </div>

      <div className="downRow">
        <div className="userDetail">
          <div className="userInfo">
            <h3>First Name:</h3>
            <p>{userInfo.firstName || "Loading"}</p>
          </div>
          <div className="userInfo">
            <h3>Last Name:</h3>
            <p>{userInfo.lastName || "Loading"}</p>
          </div>
          <div>
            <h3>Gender:</h3>
            <p>{userInfo.gender || "Loading"}</p>
          </div>
          <div className="userInfo">
            <h3>Date of Birth:</h3>
            <p>{formatDate(userInfo.dob)}</p>
          </div>
          <div className="userInfo">
            <h3>Email:</h3>
            <p>{userInfo.email || "Loading"}</p>
          </div>
          <div className="userInfo">
            <h3>Phone:</h3>
            <p>{userInfo.phone || "Loading"}</p>
          </div>
          <Button variant="contained">Edit</Button>
        </div>
      </div>
      <div>
        {userWatchList !== undefined ? (
          <ScrollContainer listings={userWatchList} />
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Your watchlist is currently empty. Click the heart icon on
            properties to see them here!
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
