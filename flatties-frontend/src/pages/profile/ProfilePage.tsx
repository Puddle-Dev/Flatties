import React, { useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import profilePic from "../../assets/images/flatties-icon-logo.png"
import "./ProfilePage.css";

function ProfilePage() {
  // const [editable, setEditable] = useState(false);
  // const [text, setText] = useState("Add a Bio");

  // const handleEditToggle = () => {
  //   setEditable(!editable);
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setText(event.target.value);
  // };

  return (
    <div className="userProfile clearfix">
      <div className="topRow">

        <div className="leftColumn">
          <div className="userInformation">
            {/* <h2>User Information</h2> */}
            <img src={profilePic} alt="Profile Picture" />
            <div className="userInfo">
              <h3>User Name:</h3>
              <p>wsking233</p>
            </div>
            <div className="userInfo">
              <h3>Introduction:</h3>
              <p>Here should be some description about yourself</p>
            </div>
          </div>
          <div className="userDetail">
            {/* <h2>Personal Details</h2> */}
            <div className="userInfo">
              <h3>First Name:</h3>
              <p>William</p>
            </div>
            <div className="userInfo">
              <h3>Last Name:</h3>
              <p>Wang</p>
            </div>
            <div className="userInfo">
              <h3>Phone:</h3>
              <p>1234567</p>
            </div>
            <div className="userInfo">
              <h3>Email:</h3>
              <p>wsking233@gmail.com</p>
            </div>
            <div className="userInfo">
              <h3>Address:</h3>
              <p>40 Sussex St, Grey Lynn</p>
            </div>
          </div>
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
        </div>
      </div>
      
      <div className="buttonRow">
        <button>Edit</button>
      </div>


    </div>


  );
}

export default ProfilePage;
