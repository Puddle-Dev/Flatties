import React from "react";
import { Typography, Link, Tab, IconButton } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div>
      <div>
        <Typography variant="h5">Contact us</Typography>
            
            <IconButton
              href="https://www.linkedin.com/in/benjamin-polglase-ba3022275"
              color="primary"
            ><LinkedInIcon fontSize="large" /></IconButton>
              <strong>Benjamin Polglase</strong>
            <Tab />

            <IconButton
              href="https://www.linkedin.com/in/eirik-mykel-navarro-enriquez"
              color="primary"
            ><LinkedInIcon fontSize="large" /></IconButton>
              <strong>Eirik Enriquez</strong>
            <Tab />

            <IconButton
              href="https://www.linkedin.com/in/william-wang-shuai"
              color="primary"
            ><LinkedInIcon fontSize="large" /></IconButton>
              <strong>William Wang</strong>
            <Tab />
      </div>
    </div>
  );
}

export default Footer;
