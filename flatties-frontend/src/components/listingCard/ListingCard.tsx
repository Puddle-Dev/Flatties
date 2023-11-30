import React from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import flattieslogo from "../../assets/images/flatties-logo.png"

function ListingCard(){

    return (
    <Card sx={{maxWidth:345, minWidth:250}}>
        <CardHeader title="New Property" subheader="Avaliable: Today"> </CardHeader>
        <CardMedia component="img" image={flattieslogo}></CardMedia>
        <CardContent>
          This is a new House, 4 bedroom 2 bothroom. close to the city.
        </CardContent>
      </Card>
    );
}


export default ListingCard;