import React from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import Card from '@mui/material/Card';
import { Stack, Paper, Box } from "@mui/material";

import ListingCard from "../../components/listingCard/ListingCard";

function ListingPage() {
  return (
    <Paper elevation={3}  style={{ marginTop:"10px", marginBottom:"10px", padding: "10px" }}>
      <div>
        <h1>Listing Page</h1>
      </div>
      
      <Box>

        <Stack direction="row" spacing={1} sx={{flexWrap:'wrap', justifyContent:'flex-start'}}  >
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>

        </Stack>  
      </Box>
    
    </Paper>
  );
}

export default ListingPage;
