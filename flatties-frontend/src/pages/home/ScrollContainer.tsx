import React from "react";
import { Box } from "@mui/material";
import ListingCard from "../listing/ListingCard"; // Adjust the import path as necessary

const ListingsContainer: React.FC<{ listings: any[] }> = ({ listings }) => {
  return (
    <Box
      sx={{
        display: 'flex', // Make children (cards) lay out horizontally
        overflowX: 'scroll', // Enable horizontal scrolling
        overflowY: 'hidden', // Disable vertical scrolling
        maxHeight: '90vh', // Adjust based on your layout
        padding: '16px',
        "&::-webkit-scrollbar": {
          height: '0.4em', // Adjust scrollbar for horizontal scrolling
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey',
        },
      }}
    >
      {listings.map((listing) => (
        <Box key={listing._id} sx={{ marginRight: '16px' }}> {/* Add margin between cards */}
          <ListingCard {...listing} />
        </Box>
      ))}
    </Box>
  );
};

export default ListingsContainer;
