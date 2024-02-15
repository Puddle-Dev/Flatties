import React from "react";
import { Typography, Button, Box, List, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomePage.css";

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
      <div className="scroll-container">
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <List key={index} sx={{ marginRight: 2 }}>
              <Paper sx={{ width: 300, minWidth: 250, marginBottom: "8px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 2,
                    fontStyle: { textAlign: "left" },
                  }}
                >
                  <h3>Index: {index}</h3>
                  <h3>Property ID: </h3>
                  <h3>City: </h3>
                  <h3>Property Type: </h3>
                  <h3>BedRooms: </h3>
                  <h3>BathRooms: </h3>
                </Box>
              </Paper>
            </List>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default HomePage;
