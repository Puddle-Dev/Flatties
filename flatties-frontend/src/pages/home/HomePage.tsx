// HomePage.tsx
import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Flatties!
        </Typography>
        <Typography variant="body1" paragraph>
          Your go-to platform for streamlined property rentals. Property owners
          and managers can showcase vacancies, and prospective tenants can
          easily search and filter available residences.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
        >
          Register Here
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
