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
import FilterSlider from "../../components/listingComponents/filters/FilterSlider";
import MinMaxInput from "../../components/listingComponents/filters/MinMaxInput";
import FilterOptions from "../../components/listingComponents/FilterOptions";

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

  const handleFilterChange = (
    key: string,
    value: string | number | number[] | boolean | null
  ) => {
    switch (key) {
      case "selectedBedrooms":
        setSelectedBedrooms(Array.isArray(value) ? [value[0], value[1]] : null);
        break;
      case "selectedBathrooms":
        setSelectedBathrooms(
          Array.isArray(value) ? [value[0], value[1]] : null
        );
        break;
      case "selectedMinRent":
        setSelectedMinRent(value === "" ? minRent : parseInt(value as string));
        break;
      case "selectedMaxRent":
        setSelectedMaxRent(value === "" ? maxRent : parseInt(value as string));
        break;
      case "selectedCity":
        setSelectedCity(value as string);
        break;
      case "selectedSuburb":
        setSelectedSuburb(value as string);
        break;
      case "isFurnished":
        setIsFurnished(value as string);
        break;
      case "isPetAllowed":
        setIsPetAllowed(value as string);
        break;
      case "isSmoking":
        setIsSmoking(value as string);
        break;
      case "isParking":
        setIsParking(value as string);
        break;
      default:
        break;
    }

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // const combinedData = [...listingsData, ...rentalData];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const minBedrooms = Math.min(...listingsData.map((data) => data.bedrooms));
  const maxBedrooms = Math.max(...listingsData.map((data) => data.bedrooms));

  const minBathrooms = Math.min(...listingsData.map((data) => data.bathrooms));
  const maxBathrooms = Math.max(...listingsData.map((data) => data.bathrooms));

  const handleFilterSubmit = () => {
    let updatedData = listingsData;
    if (selectedBedrooms !== null) {
      updatedData = updatedData.filter(
        (data) =>
          data.bedrooms >= selectedBedrooms[0] &&
          data.bedrooms <= selectedBedrooms[1]
      );
    }

    if (selectedBathrooms !== null) {
      updatedData = updatedData.filter(
        (data) =>
          data.bathrooms >= selectedBathrooms[0] &&
          data.bathrooms <= selectedBathrooms[1]
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
        return Number(a._id) - Number(b._id);
      case "addedDesc":
        return Number(b._id) - Number(a._id);
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
        <FilterOptions
          listingsData={listingsData}
          selectedBedrooms={selectedBedrooms}
          selectedBathrooms={selectedBathrooms}
          minRent={minRent}
          maxRent={maxRent}
          selectedMinRent={selectedMinRent}
          selectedMaxRent={selectedMaxRent}
          selectedCity={selectedCity}
          selectedSuburb={selectedSuburb}
          isFurnished={isFurnished}
          isPetAllowed={isPetAllowed}
          isSmoking={isSmoking}
          isParking={isParking}
          minBedrooms={minBedrooms}
          maxBedrooms={maxBedrooms}
          minBathrooms={minBathrooms}
          maxBathrooms={maxBathrooms}
          handleFilterChange={handleFilterChange}
          handleFilterSubmit={handleFilterSubmit}
        />
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
