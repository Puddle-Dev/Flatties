import React, { useState, useEffect } from "react";
import api from "../../services/api";
import PropertyInfo from "../../models/PropertyInfo";
import RentalInfo from "../../models/RentalInfo";
import DummyData from "./dummyData.json";
import ListingCard from "./ListingCard";
import "./ListingPage.css";
import {
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function ListingPage() {
  const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  const [rentalData, setRentalData] = useState<RentalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortOrder, setSortOrder] = useState<
    "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc"
  >("priceAsc");

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
  const currentItems = DummyData.slice(indexOfFirstItem, indexOfLastItem).sort(
    (a, b) => {
      switch (sortOrder) {
        case "priceAsc":
          return a.rent.localeCompare(b.rent);
        case "priceDesc":
          return b.rent.localeCompare(a.rent);
        case "nameAsc":
          return a.listingTitle.localeCompare(b.listingTitle);
        case "nameDesc":
          return b.listingTitle.localeCompare(a.listingTitle);
        default:
          return 0;
      }
    }
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSort = (
    value: "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc"
  ) => {
    setSortOrder(value);
  };

  return (
    <div>
      <div
        className="Filters"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            value={sortOrder}
            onChange={(event) =>
              handleSort(
                event.target.value as
                  | "priceAsc"
                  | "priceDesc"
                  | "nameAsc"
                  | "nameDesc"
              )
            }
          >
            <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
            <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
            <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
            <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
          </Select>
        </FormControl>
      </div>
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
