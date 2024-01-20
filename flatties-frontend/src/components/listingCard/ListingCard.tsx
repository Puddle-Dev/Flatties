import React, { useEffect } from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import flattieslogo from "../../assets/images/flatties-logo.png"
import propretyTypes from "./propertyTypes";

interface ListingCardProps{
    proprety: propretyTypes;
}

function ListingCard({proprety}: ListingCardProps){
    return (
    <Card sx={{maxWidth:345, minWidth:250, marginBottom: '8px'}}>
        <CardHeader title={proprety.title} subheader={proprety.city}> </CardHeader>
        <CardMedia component="img" image={flattieslogo}></CardMedia>
        <CardContent>
          Price: {proprety.price}
          <br/>
          Description: {proprety.description}
        </CardContent>
      </Card>
    );
}

export default ListingCard;