import React, { useState } from "react";
import LOGO from "../../../assets/images/flatties-long.png";
import { Stack, Paper, IconButton, ListItemIcon, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../login/Login"; // Import the LoginModal component
import { useCookies } from "react-cookie";

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const [cookies] = useCookies(["isLoggedIn"]);

  return (
    <Paper elevation={3} square={false} style={{ padding: "10px", backgroundColor:"#F2F6F9"}}>
      <Stack className="Container" direction="column">
        <Stack className="Container-top" direction="row" borderBottom={1} justifyContent={"space-between"}>
          {/* top-left part */}
          <Stack className="Container-left" direction="row">
            <img
              src={LOGO}
              alt="LOGO"
              style={{
                // width: "20%",
                maxWidth: "400px",
                height: "auto",
                marginRight: "10px",
              }}
            />
          </Stack>
          {/* top-right part */}
          <Stack className="Container-right" direction="row-reverse" spacing={2}>

            <IconButton
              edge="end"
              aria-label="Log In"
              size="large"
              color="inherit"
              style={{ background: 'transparent' }}
              onClick={handleLoginClick}
            >
              <ListItemIcon>

                <LoginIcon />
              </ListItemIcon>
              <Typography variant="body1" component="span">{cookies.isLoggedIn ? (
           <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Log Out
              </Link>
          ) : (
                <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                  
                  Log In
                </Link>
          )}
                </Typography>
            </IconButton>

          </Stack>
        </Stack>
        {/* buttom part */}
        <Stack className="NavBar" direction="row" spacing={5}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/profile">PROFILE</NavLink>
          <NavLink to="/listing">LISTING</NavLink>
          <NavLink to="/new-property">NEW PROPERTY</NavLink>
        </Stack>

        <LoginModal open={loginModalOpen} handleClose={handleLoginModalClose} />
      </Stack>
    </Paper>
  );
}

export default NavBar;
