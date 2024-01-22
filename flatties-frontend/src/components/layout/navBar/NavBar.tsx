import React, { useState } from "react";
import LOGO from "../../../assets/images/AUT-logo-block.jpg";
import { Avatar, Stack, Paper, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginModal from "../login/Login"; // Import the LoginModal component

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <Paper elevation={3} square style={{ padding: "10px" }}>
      <Stack className="Container" direction="column">
        <Stack className="Container-top" direction="row" borderBottom={1}>
          <Stack className="Container-left" direction="row">
            <img
              src={LOGO}
              alt="LOGO"
              style={{
                width: "20%",
                maxWidth: "400px",
                height: "auto",
                marginRight: "10px",
              }}
            />
            <h1>Flatties</h1>
          </Stack>
          <Stack
            className="Container-right"
            direction="row-reverse"
            spacing={2}
          >
            <NavLink
              to="#"
              style={{ marginLeft: "10px" }}
              onClick={handleLoginClick}
            >
              Log In
            </NavLink>
            <NavLink to="/register" style={{ marginLeft: "10px" }}>
              Register
            </NavLink>
            <Avatar alt="Null" src="/static/images/avatar/1.jpg" />
          </Stack>
        </Stack>

        <Stack className="NavBar" direction="row" spacing={5}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/profile">PROFILE</NavLink>
          <NavLink to="/listing">LISTING</NavLink>
          <NavLink to="/new-property">NEW PROPERTY</NavLink>
        </Stack>

        {/* Render the Login Modal */}
        <LoginModal open={loginModalOpen} handleClose={handleLoginModalClose} />
      </Stack>
    </Paper>
  );
}

export default NavBar;
