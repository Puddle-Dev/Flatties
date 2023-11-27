import React from "react";
import { Typography, List, ListItem, Link } from "@mui/material";

function Footer() {
  return (
    <div>
      <div>
        <Typography variant="h5">Connect With Us</Typography>
        <List>
          <ListItem>
            <strong>Eirik Enriquez</strong>
            <Link
              href="https://www.linkedin.com/in/eirik-mykel-navarro-enriquez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </ListItem>
          <ListItem>
            <strong>Benjamin Polglase</strong>
            <Link
              href="https://www.linkedin.com/in/benjamin-polglase-ba3022275"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </ListItem>
          <ListItem>
            <strong>William Wang</strong>
            <Link
              href="https://www.linkedin.com/in/aut-william-wang"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
