import React, { useState, useEffect } from "react";
import api from "../../services/api";
import PropertyInfo from "../../models/PropertyInfo";
import RentalInfo from "../../models/RentalInfo";
import DummyData from "./dummyData.json";
import ListingCard from "./ListingCard";
import "./ListingPage.css";
import {
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Box,
} from "@mui/material";

function ListingPage() {
  const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  const [rentalData, setRentalData] = useState<RentalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortOrder, setSortOrder] = useState<
    "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc"
  >("priceAsc");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedBedrooms, setSelectedBedrooms] = useState<
    [number, number] | null
  >(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<
    [number, number] | null
  >(null);

  const handleBedroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBedrooms(Array.isArray(value) ? [value[0], value[1]] : null);
  };

  const handleBathroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBathrooms(Array.isArray(value) ? [value[0], value[1]] : null);
  };

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

  const maxBedrooms = Math.max(...DummyData.map((data) => data.bedRooms));
  const maxBathrooms = Math.max(...DummyData.map((data) => data.bathRooms));

  let filteredData = DummyData;

  if (selectedCity) {
    filteredData = filteredData.filter((data) => data.city === selectedCity);
  }

  if (selectedBedrooms !== null) {
    filteredData = filteredData.filter(
      (data) =>
        data.bedRooms >= selectedBedrooms[0] &&
        data.bedRooms <= selectedBedrooms[1]
    );
  }

  if (selectedBathrooms !== null) {
    filteredData = filteredData.filter(
      (data) =>
        data.bathRooms >= selectedBathrooms[0] &&
        data.bathRooms <= selectedBathrooms[1]
    );
  }

  filteredData.sort((a, b) => {
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
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSort = (
    value: "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc"
  ) => {
    setSortOrder(value);
  };

  return (
    <div>
      <div
        className="Options"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="Filters">
          <div className="Sliders" style={{ display: "grid" }}>
            <div>
              <FormControl style={{ width: "100%" }}>
                <Box>
                  <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
                  <Slider
                    value={selectedBedrooms || [0, maxBedrooms]}
                    onChange={handleBedroomsChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="bedrooms-label"
                    max={maxBedrooms}
                    marks
                    valueLabelFormat={(value) => `${value}`}
                    step={1}
                    min={0}
                    disableSwap
                  />
                </Box>
              </FormControl>
            </div>
            <div>
              <FormControl style={{ width: "100%" }}>
                <Box>
                  <InputLabel id="bathrooms-label">Bathrooms</InputLabel>
                  <Slider
                    value={selectedBathrooms || [0, maxBathrooms]}
                    onChange={handleBathroomsChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="bathrooms-label"
                    max={maxBathrooms}
                    marks
                    valueLabelFormat={(value) => `${value}`}
                    step={1}
                    min={0}
                    disableSwap
                  />
                </Box>
              </FormControl>
            </div>
          </div>
          <div className="Selections">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="city-label">City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(event) =>
                  setSelectedCity(event.target.value as string)
                }
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(DummyData.map((data) => data.city))).map(
                  (city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="Sort">
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
          count={Math.ceil(filteredData.length / itemsPerPage)}
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
