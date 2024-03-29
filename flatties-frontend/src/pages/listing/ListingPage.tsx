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
  SelectChangeEvent,
  Button,
} from "@mui/material";
import FilterSlider from "../../components/filters/FilterSlider";
import MinMaxInput from "../../components/filters/MinMaxInput";

function ListingPage() {
  // const [listingsData, setListingsData] = useState<PropertyInfo[]>([]);
  // const [rentalData, setRentalData] = useState<RentalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [listingsData, setListingsData] = useState(DummyData);
  const [filteredData, setFilteredData] = useState(listingsData);

  useEffect(() => {}, []);

  //sorting
  const [sortOrder, setSortOrder] = useState<
    | "addedAsc"
    | "addedDesc"
    | "priceAsc"
    | "priceDesc"
    | "nameAsc"
    | "nameDesc"
    | "availAsc"
    | "availDesc"
  >("addedAsc");

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

  const [selectedFilters, setSelectedFilters] = useState({
    selectedBedrooms: selectedBedrooms,
    selectedBathrooms: selectedBathrooms,
    selectedMinRent: selectedMinRent,
    selectedMaxRent: selectedMaxRent,
    selectedCity: selectedCity,
    selectedSuburb: selectedSuburb,
    isFurnished: isFurnished,
    isPetAllowed: isPetAllowed,
    isSmoking: isSmoking,
    isParking: isParking,
  });

  const handleBedroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBedrooms(Array.isArray(value) ? [value[0], value[1]] : null);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedBedrooms: selectedBedrooms,
    }));
  };

  const handleBathroomsChange = (event: Event, value: number | number[]) => {
    setSelectedBathrooms(Array.isArray(value) ? [value[0], value[1]] : null);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedBathrooms: selectedBathrooms,
    }));
  };

  const handleMinRentChange = (value: string) => {
    value === ""
      ? setSelectedMinRent(minRent)
      : setSelectedMinRent(parseInt(value));
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedMinRent: selectedMinRent,
    }));
  };

  const handleMaxRentChange = (value: string) => {
    value === ""
      ? setSelectedMaxRent(maxRent)
      : setSelectedMaxRent(parseInt(value));
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedMaxRent: selectedMaxRent,
    }));
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedCity: selectedCity,
    }));
  };

  const handleSuburbChange = (event: SelectChangeEvent<string>) => {
    setSelectedSuburb(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedSuburb: selectedSuburb,
    }));
  };

  const handleFurnishedChange = (event: SelectChangeEvent<string>) => {
    setIsFurnished(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      isFurnished: isFurnished,
    }));
  };

  const handlePetAllowedChange = (event: SelectChangeEvent<string>) => {
    setIsPetAllowed(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      isPetAllowed: isPetAllowed,
    }));
  };

  const handleSmokingChange = (event: SelectChangeEvent<string>) => {
    setIsSmoking(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      isSmoking: isSmoking,
    }));
  };

  const handleParkingChange = (event: SelectChangeEvent<string>) => {
    setIsParking(event.target.value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      isParking: isParking,
    }));
  };

  // const combinedData = [...listingsData, ...rentalData];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const minBedrooms = Math.min(...listingsData.map((data) => data.bedRooms));
  const maxBedrooms = Math.max(...listingsData.map((data) => data.bedRooms));

  const minBathrooms = Math.min(...listingsData.map((data) => data.bathRooms));
  const maxBathrooms = Math.max(...listingsData.map((data) => data.bathRooms));

  const handleFilterSubmit = () => {
    let updatedData = listingsData;
    if (selectedBedrooms !== null) {
      updatedData = updatedData.filter(
        (data) =>
          data.bedRooms >= selectedBedrooms[0] &&
          data.bedRooms <= selectedBedrooms[1]
      );
    }

    if (selectedBathrooms !== null) {
      updatedData = updatedData.filter(
        (data) =>
          data.bathRooms >= selectedBathrooms[0] &&
          data.bathRooms <= selectedBathrooms[1]
      );
    }

    if (selectedCity) {
      updatedData = updatedData.filter((data) => data.city === selectedCity);
    }

    if (selectedSuburb) {
      updatedData = updatedData.filter(
        (data) => data.suburb === selectedSuburb
      );
    }

    if (selectedMinRent) {
      updatedData = updatedData.filter((data) => data.rent >= selectedMinRent);
    }

    if (selectedMaxRent) {
      updatedData = updatedData.filter((data) => data.rent <= selectedMaxRent);
    }

    if (isFurnished) {
      updatedData = updatedData.filter(
        (data) => data.isFurnished.toString() === isFurnished
      );
    }

    if (isPetAllowed) {
      updatedData = updatedData.filter(
        (data) => data.isPetAllowed.toString() === isPetAllowed
      );
    }

    if (isSmoking) {
      updatedData = updatedData.filter(
        (data) => data.isSmokingAllowed.toString() === isSmoking
      );
    }

    if (isParking) {
      updatedData = updatedData.filter(
        (data) => data.isParkingAllowed.toString() === isParking
      );
    }

    setFilteredData(updatedData);
  };

  filteredData.sort((a, b) => {
    switch (sortOrder) {
      case "addedAsc":
        return a._id.toString().localeCompare(b._id.toString());
      case "addedDesc":
        return b._id.toString().localeCompare(a._id.toString());
      case "priceAsc":
        return a.rent.toString().localeCompare(b.rent.toString()); // shit code
      case "priceDesc":
        return b.rent.toString().localeCompare(a.rent.toString());
      case "nameAsc":
        return a.listingTitle.localeCompare(b.listingTitle);
      case "nameDesc":
        return b.listingTitle.localeCompare(a.listingTitle);
      case "availAsc":
        const aDateAsc = new Date(a.availabilityDate);
        const bDateAsc = new Date(b.availabilityDate);
        return aDateAsc.getTime() - bDateAsc.getTime();
      case "availDesc":
        const aDateDesc = new Date(a.availabilityDate);
        const bDateDesc = new Date(b.availabilityDate);
        return bDateDesc.getTime() - aDateDesc.getTime();
      default:
        return 0;
    }
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSort = (
    value:
      | "addedAsc"
      | "addedDesc"
      | "priceAsc"
      | "priceDesc"
      | "nameAsc"
      | "nameDesc"
      | "availAsc"
      | "availDesc"
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
          <Button variant="contained" onClick={handleFilterSubmit}>
            Submit
          </Button>
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
                    | "addedAsc"
                    | "addedDesc"
                    | "priceAsc"
                    | "priceDesc"
                    | "nameAsc"
                    | "nameDesc"
                    | "availAsc"
                    | "availDesc"
                )
              }
            >
              <MenuItem value="addedAsc">Date Added (Newest)</MenuItem>
              <MenuItem value="addedDesc">Date Added (Oldest)</MenuItem>
              <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
              <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="availAsc">Availability Date (Newest)</MenuItem>
              <MenuItem value="availDesc">Availability Date (Oldest)</MenuItem>
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
