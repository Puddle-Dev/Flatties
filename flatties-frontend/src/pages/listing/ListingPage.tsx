import React, { useState, useEffect } from "react";
import api from "../../services/api";
import PropertyInfo from "../../models/PropertyInfo";
import RentalInfo from "../../models/RentalInfo";
import DummyData from "./dummyData.json";
import ListingCard from "./ListingCard";
import "./ListingPage.css";
import { Pagination } from "@mui/material";

function ListingPage() {
  const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  const [rentalData, setRentalData] = useState<RentalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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

  // const combinedData = [...listingsData, ...rentalData];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DummyData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="listingContainer">
        {currentItems.map((data) => (
          <ListingCard {...data} key={data._id} />
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(DummyData.length / itemsPerPage)}
          onChange={(event, value) => paginate(value)}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}

export default ListingPage;
