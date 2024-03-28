import React, { ReactNode } from "react";
import { Typography, Box } from "@mui/material";
import ListingCard from "../listing/ListingCard"; // Import the ListingCard component

interface ScrollContainerProps {
  title: string;
  children: ReactNode;
}

function ScrollContainer({ title, children }: ScrollContainerProps) {
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
        {/* Render ListingCard components from children */}
        {React.Children.map(children, (child) => (
          <ListingCard {...(child as any)} />
        ))}
      </Box>
    </div>
  );
}

export default ScrollContainer;
