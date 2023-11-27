import React from "react";
import LOGO from "../../assets/images/AUT-logo-block.jpg";
import {Avatar, Stack, Paper, Button} from "@mui/material";
import { NavLink } from "react-router-dom";
import { padding } from "@mui/system";
import HomePage from "../../pages/home/HomePage";

function NavBar() {

  return (
    <Paper elevation={3} square style={{padding:'10px'}}>
      <Stack className="Container" direction={"column"}>
        <Stack className="Container-top" direction={"row"} borderBottom={1}>
          <Stack className="Container-left" direction={"row"} >
              <img src={LOGO} alt="LOGO" style={{width:'20%', maxWidth:'400px',height:'auto', marginRight:'10px' }} />
              <h1>Flatties</h1>
          </Stack>
          <Stack className="Container-right" direction={"row-reverse"}>
            <p style={{marginLeft:'10px'}}>LogIn/SignUp</p>
            <Avatar alt="Null" src="/static/images/avatar/1.jpg" />
          </Stack>
        </Stack>

        <Stack className="NavBar" direction={"row"} spacing={5}>
            <NavLink to='/'>HOME</NavLink>
            <NavLink to='/profile'>PROFILE</NavLink>
            <NavLink to='/listing'>LISTING</NavLink>
            <NavLink to='/register'>REGISTER</NavLink>   
        </Stack> 
      </Stack>
    </Paper>
  );
}

export default NavBar;