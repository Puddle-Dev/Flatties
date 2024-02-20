import React, { useEffect } from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import flattieslogo from "../../assets/images/flatties-logo.png"
import RentalInfo from "../../models/RentalInfo";
import PropertyInfo from "../../models/PropertyInfo";
import DummyData from "./dummyData.json";

interface DummyDataSchema {
  _id: string,
  listingTitle: string,
  rent: string,
  address: string,
  city: string,
  bedRooms: number,
  bathRooms: number,
}


function ListingCard(data: DummyDataSchema) {
  return (
      <Card>
        <CardMedia component="img" image={flattieslogo}></CardMedia>
        <CardHeader title={data.listingTitle} subheader={data.city}> </CardHeader>
        <CardContent>
          Price: {data.rent}
          <br />
          Address: {data.address}
        </CardContent>
      </Card>
  );
}

export default ListingCard;