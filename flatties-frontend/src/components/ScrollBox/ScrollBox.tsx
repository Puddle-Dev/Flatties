// ScrollBox.tsx
import React from "react";
import { Box, List, Paper, Typography } from "@mui/material";
import ListingCard from "../../pages/listing/ListingCard"; // Import the ListingCard component

interface ScrollBoxProps {
  title: string;
  items: any[]; // Replace 'any' with the actual type of your items
}

const ScrollBox: React.FC<ScrollBoxProps> = ({ title, items }) => {
  return (
    <div className="scroll-container">
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {items.map((item) => (
          <List key={item._id} sx={{ marginRight: 2 }}>
            <Paper sx={{ width: 300, minWidth: 250, marginBottom: "8px" }}>
              {/* Use the ListingCard component for each item */}
              <ListingCard {...item} />
            </Paper>
          </List>
        ))}
      </Box>
    </div>
  );
};

export default ScrollBox;
