import React, { useEffect, useState } from "react";
import profilePic from "../../assets/images/flatties-icon-logo.png"
import "./ProfilePage.css";
import UserInfo from "../../models/UserInfo";
import axios from "../../services/api";
import { Button } from "@mui/material";
import { redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import WatchList from "../../components/watchList/WatchList"; // Import the new ScrollBox component


function ProfilePage() {

  const initialUserInfo = (): UserInfo => {
    return {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        dob: null,
        password: '',
    };
};

  const [userInfo, setUser] = useState(initialUserInfo());
 
  const [cookies] = useCookies(["userId"]);

  const userId = cookies.userId;
  useEffect(() => {
    axios.get('/user/'+userId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  

  return (
    <div className="userProfile clearfix">

      <div className="topRow">
        <div className="userInformation">
          {/* <h2>User Information</h2> */}
          <img src={profilePic} alt="Profile Picture" />
          <div className="userInfo">
            <h3>User Name:</h3>
            <p>{userInfo? userInfo.userName : 'Loading'}</p>
          </div>
          <div className="userInfo">
            <h3>Introduction:</h3>
            <p>Here should be some description about yourself</p>
          </div>
        </div>
        <hr />
      </div>

      <div className="downRow">
        <div className="leftColumn">

          <div className="userDetail">
            {/* <h2>Personal Details</h2> */}
            <div className="userInfo">
              <h3>First Name:</h3>
              <p>{userInfo? userInfo.firstName : 'Loading'}</p>
            </div>
            <div className="userInfo">
              <h3>Last Name:</h3>
              <p>{userInfo? userInfo.lastName : 'Loading'}</p>
            </div>
            <div>
              <h3>Gender:</h3>
              <p>{userInfo? userInfo.gender : 'Loading'}</p>
            </div>
            <div className="userInfo">
              <h3>Date of Birth:</h3>
              <p>{userInfo? userInfo.dob?.toString() : 'Loading'}</p>
            </div>
            <div className="userInfo">
              <h3>Email:</h3>
              <p>{userInfo? userInfo.email : 'Loading'}</p>
            </div>
            <div className="userInfo">
              <h3>Phone:</h3>
              <p>{userInfo? userInfo.phone : 'Loading'}</p>
            </div>
          </div>
          <Button variant="contained" >Edit</Button>

        </div>
        <div className="rightColumn">
          <div className="userPreference">
            <h2>Preference</h2>
            <div className="userInfo">
              <h3>Looking for:</h3>
              <p>3-bedroom apartment</p>
            </div>
            <div className="userInfo">
              <h3>Location:</h3>
              <p>Auckland</p>
            </div>
            <div className="userInfo">
              <h3>Price:</h3>
              <p>$500 - $800</p>
            </div>
          </div>
          <Button variant="contained" >Edit</Button>
        </div>
      </div>
<div>
  <WatchList/>
</div>


    </div>


  );
}

export default ProfilePage;
