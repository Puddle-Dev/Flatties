import React, { useState } from "react";
import LOGO from "../../../assets/images/flatties-long.png";
import {
  Stack,
  Paper,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../login/Login";
import useCookieManager from "../../../services/cookies/CookieManager";
import profilePic from "../../../assets/images/flatties-icon-logo.png";
import "./Navbar.css";

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { getCookie } = useCookieManager();

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    handleMenuClose();
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  // Check if token exists to determine login status
  const token = getCookie("token");

  return (
    <Paper
      elevation={3}
      square={false}
      style={{ padding: "10px", backgroundColor: "#F2F6F9" }}
    >
      <Stack className="Container" direction="column">
        <Stack
          className="Container-top"
          direction="row"
          borderBottom={1}
          justifyContent={"space-between"}
        >
          {/* top-left part */}
          <Stack className="Container-left" direction="row">
            <img
              src={LOGO}
              alt="LOGO"
              style={{
                maxWidth: "400px",
                height: "auto",
                marginRight: "10px",
              }}
            />
          </Stack>
          {/* top-right part */}
          <Stack
            className="Container-right"
            direction="row-reverse"
            spacing={2}
          >
            {token ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="Profile"
                  size="large"
                  color="inherit"
                  style={{ background: "transparent" }}
                  onClick={handleLoginClick}
                >
                  <Typography variant="body1" component="span">
                    <img
                      className="nav-img"
                      src={profilePic}
                      alt="Profile Picture"
                    />
                  </Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLoginModalOpen}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                edge="end"
                aria-label="Log In"
                size="large"
                color="inherit"
                style={{ background: "transparent" }}
                onClick={handleLoginModalOpen}
              >
                <Typography variant="body1" component="span">
                  <>
                    <LoginIcon />
                    Log In
                  </>
                </Typography>
              </IconButton>
            )}
          </Stack>
        </Stack>
        {/* bottom part */}
        <Stack className="NavBar" direction="row" spacing={5}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/listing">LISTING</NavLink>
          <NavLink to="/new-property">NEW PROPERTY</NavLink>
          <NavLink to="/active-property">ACTIVE PROPERTY</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
        </Stack>

        <LoginModal open={loginModalOpen} handleClose={handleLoginModalClose} />
      </Stack>
    </Paper>
  );
}

export default NavBar;
