import React from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import Card from '@mui/material/Card';
import { CardContent, CardHeader, CardMedia, Paper } from "@mui/material";
import flattieslogo from "../../assets/images/flatties-logo.png"

function ListingPage() {
  return (
    <Paper elevation={3}  style={{ marginTop:"10px", marginBottom:"10px", padding: "10px" }}>
      <div>
        <h1>Listing Page</h1>
      </div>

      <Card sx={{maxWidth:345}}>
        <CardHeader title="New Property" subheader="Avaliable: Today"> </CardHeader>
        <CardMedia component="img" image={flattieslogo}></CardMedia>
        <CardContent>
          This is a new House, 4 bedroom 2 bothroom. close to the city.
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ListingPage;
