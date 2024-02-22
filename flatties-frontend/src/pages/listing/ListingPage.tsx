import React, { useState, useEffect } from "react";

import api from "../../services/api";

import { Stack, Paper, Box, List, Grid, Typography } from "@mui/material";

import PropertyInfo from "../../models/PropertyInfo";

import RentalInfo from "../../models/RentalInfo";

import dummyImage from "../../assets/images/flatties-icon-logo.png";

import BathroomIcon from "@mui/icons-material/Bathroom";

import BedIcon from "@mui/icons-material/Bed";

import DummyData from "./dummyData.json";

import ListingCard from "./ListingCard";
import "./ListingPage.css";

function ListingPage() {
  const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  const [rentalData, setRentalData] = useState<RentalInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesResponse = await api.get("/property/all");
        const listingResponse = await api.get("/listing/all");
        setListingsData(propertiesResponse.data);
        setRentalData(listingResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const combinedData = [...listingsData, ...rentalData];

  return (
    <div className="listingContainer">
      {DummyData.map((data) => (
        <ListingCard {...data} />
      ))}
    </div>
  );
}

export default ListingPage;
