import React, { useEffect } from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import flattieslogo from "../../assets/images/flatties-logo.png"
import RentalInfo from "../../models/RentalInfo";
import PropertyInfo from "../../models/PropertyInfo";

interface ListingCardProps{
    Listing: RentalInfo;
    Property: PropertyInfo;
}

function ListingCard({Listing, Property}: ListingCardProps){
    return (
    <Card sx={{maxWidth:345, minWidth:250, marginBottom: '8px'}}>
        <CardHeader title={Listing.listingTitle} subheader={Property.city}> </CardHeader>
        <CardMedia component="img" image={flattieslogo}></CardMedia>
        <CardContent>
          Price: {Listing.rent}
          <br/>
          Description: {Listing.description}
        </CardContent>
      </Card>
    );
}

export default ListingCard;