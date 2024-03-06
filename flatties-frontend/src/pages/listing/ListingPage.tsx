// todo
// leaseterm to leasetype
// add suburb
// remove year built
// availability date to filter
// change rent to input min max
// add submit

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
  SelectChangeEvent,
} from "@mui/material";
import FilterSlider from "../../components/filters/FilterSlider";
import MinMaxInput from "./MinMaxInput";

function ListingPage() {
  // const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  // const [rentalData, setRentalData] = useState<RentalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const listingsData = DummyData;

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const propertiesResponse = await api.get("/property/all");
    //     const listingResponse = await api.get("/listing/all");
    //     setListingsData(propertiesResponse.data);
    //     setRentalData(listingResponse.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, []);

  //sorting
  const [sortOrder, setSortOrder] = useState<
    "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc"
  >("priceAsc");

  // filters
  // sliders
  const [selectedBedrooms, setSelectedBedrooms] = useState<
    [number, number] | null
  >(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<
    [number, number] | null
  >(null);
  const minRent = Math.min(...listingsData.map((data) => data.rent));
  const maxRent = Math.max(...listingsData.map((data) => data.rent));
  const [selectedMinRent, setSelectedMinRent] = useState<number>(minRent);
  const [selectedMaxRent, setSelectedMaxRent] = useState<number>(maxRent);

  // options
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSuburb, setSelectedSuburb] = useState<string>("");
  const [isFurnished, setIsFurnished] = useState<string>("");
  const [isPetAllowed, setIsPetAllowed] = useState<string>("");
  const [isSmoking, setIsSmoking] = useState<string>("");
  const [isParking, setIsParking] = useState<string>("");

  const handleBedroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBedrooms(Array.isArray(value) ? [value[0], value[1]] : null);
  };

  const handleBathroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBathrooms(Array.isArray(value) ? [value[0], value[1]] : null);
  };

  const handleMinRentChange = (value: string) => {
    value === ""
      ? setSelectedMinRent(minRent)
      : setSelectedMinRent(parseInt(value));
  };

  const handleMaxRentChange = (value: string) => {
    value === ""
      ? setSelectedMaxRent(maxRent)
      : setSelectedMaxRent(parseInt(value));
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
  };

  const handleSuburbChange = (event: SelectChangeEvent<string>) => {
    setSelectedSuburb(event.target.value);
  };

  const handleFurnishedChange = (event: SelectChangeEvent<string>) => {
    setIsFurnished(event.target.value);
  };

  const handlePetAllowedChange = (event: SelectChangeEvent<string>) => {
    setIsPetAllowed(event.target.value);
  };

  const handleSmokingChange = (event: SelectChangeEvent<string>) => {
    setIsSmoking(event.target.value);
  };

  const handleParkingChange = (event: SelectChangeEvent<string>) => {
    setIsParking(event.target.value);
  };

  // const combinedData = [...listingsData, ...rentalData];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const minBedrooms = Math.min(...listingsData.map((data) => data.bedRooms));
  const maxBedrooms = Math.max(...listingsData.map((data) => data.bedRooms));

  const minBathrooms = Math.min(...listingsData.map((data) => data.bathRooms));
  const maxBathrooms = Math.max(...listingsData.map((data) => data.bathRooms));

  let filteredData = listingsData;

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

  if (selectedCity) {
    filteredData = filteredData.filter((data) => data.city === selectedCity);
  }

  if (selectedSuburb) {
    filteredData = filteredData.filter(
      (data) => data.suburb === selectedSuburb
    );
  }

  if (selectedMinRent) {
    filteredData = filteredData.filter((data) => data.rent >= selectedMinRent);
  }

  if (selectedMaxRent) {
    filteredData = filteredData.filter((data) => data.rent <= selectedMaxRent);
  }

  if (isFurnished) {
    filteredData = filteredData.filter(
      (data) => data.isFurnished.toString() === isFurnished
    );
  }

  if (isPetAllowed) {
    filteredData = filteredData.filter(
      (data) => data.isPetAllowed.toString() === isPetAllowed
    );
  }

  if (isSmoking) {
    filteredData = filteredData.filter(
      (data) => data.isSmokingAllowed.toString() === isSmoking
    );
  }

  if (isParking) {
    filteredData = filteredData.filter(
      (data) => data.isParkingAllowed.toString() === isParking
    );
  }

  filteredData.sort((a, b) => {
    switch (sortOrder) {
      case "priceAsc":
        return a.rent.toString().localeCompare(b.rent.toString()); // shit code
      case "priceDesc":
        return b.rent.toString().localeCompare(a.rent.toString());
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
        className="FiltersAndSorting"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="Filters">
          <div className="Sliders" style={{ display: "grid" }}>
            <FilterSlider
              label="Bedrooms"
              selectedItems={selectedBedrooms}
              min={minBedrooms}
              max={maxBedrooms}
              handleChange={handleBedroomsChange}
            />
            <FilterSlider
              label="Bathrooms"
              selectedItems={selectedBathrooms}
              min={minBathrooms}
              max={maxBathrooms}
              handleChange={handleBathroomsChange}
            />
            <MinMaxInput
              label="Rent"
              defaultMin={minRent.toString()}
              defaultMax={maxRent.toString()}
              onMinChange={handleMinRentChange}
              onMaxChange={handleMaxRentChange}
            />
          </div>
          <div className="Options">
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="city-label">City</InputLabel>
                <Select value={selectedCity} onChange={handleCityChange}>
                  <MenuItem value="">All</MenuItem>
                  {Array.from(
                    new Set(listingsData.map((data) => data.city))
                  ).map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="suburb-label">Suburb</InputLabel>
                <Select value={selectedSuburb} onChange={handleSuburbChange}>
                  <MenuItem value="">All</MenuItem>
                  {Array.from(
                    new Set(listingsData.map((data) => data.suburb))
                  ).map((suburb) => (
                    <MenuItem key={suburb} value={suburb}>
                      {suburb}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="isFurnished-label">Is Furnished</InputLabel>
                <Select value={isFurnished} onChange={handleFurnishedChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="isPetAllowed-label">Pets Allowed?</InputLabel>
                <Select value={isPetAllowed} onChange={handlePetAllowedChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="isSmokingAllowed-label">
                  Smoking Allowed?
                </InputLabel>
                <Select value={isSmoking} onChange={handleSmokingChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="isParkingAllowedLabel">
                  Parking Allowed?
                </InputLabel>
                <Select value={isParking} onChange={handleParkingChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </div>
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
