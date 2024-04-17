import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  FilterOptionsState,
} from "@mui/material";
import MinMaxInput from "./filters/MinMaxInput";
import FilterSlider from "./filters/FilterSlider";
import BooleanFilter from "./filters/BooleanFilter";

interface Listing {
  _id: string;
  listingTitle: string;
  rent: number;
  address: string;
  city: string;
  suburb: string;
  bedrooms: number;
  bathrooms: number;
  availabilityDate: string;
  leaseTerm: string;
  isFurnished: boolean;
  isPetAllowed: boolean;
  isSmokingAllowed: boolean;
  isParkingAllowed: boolean;
  yearBuilt: string;
  rentMethod: string;
  rentPaymentPeriod: string;
  deposit: number;
  description: string;
}

interface FilterOptionsProps {
  listingsData: Listing[];
  selectedBedrooms: [number, number] | null;
  selectedBathrooms: [number, number] | null;
  minRent: number;
  maxRent: number;
  selectedMinRent: number;
  selectedMaxRent: number;
  selectedCity: string;
  selectedSuburb: string;
  isFurnished: string;
  isPetAllowed: string;
  isSmoking: string;
  isParking: string;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  handleFilterChange: (
    key: string,
    value: string | number | number[] | boolean | null
  ) => void;
  handleFilterSubmit: () => void;
}

function FilterOptions({
  listingsData,
  selectedBedrooms,
  selectedBathrooms,
  minRent,
  maxRent,
  selectedMinRent,
  selectedMaxRent,
  selectedCity,
  selectedSuburb,
  isFurnished,
  isPetAllowed,
  isSmoking,
  isParking,
  minBedrooms,
  maxBedrooms,
  minBathrooms,
  maxBathrooms,
  handleFilterChange,
  handleFilterSubmit,
}: FilterOptionsProps) {
  return (
    <div className="Filters">
      <div className="Sliders" style={{ display: "grid" }}>
        <FilterSlider
          label="Bedrooms"
          selectedItems={selectedBedrooms}
          min={minBedrooms}
          max={maxBedrooms}
          handleChange={(event, value) =>
            handleFilterChange("selectedBedrooms", value)
          }
        />
        <FilterSlider
          label="Bathrooms"
          selectedItems={selectedBathrooms}
          min={minBathrooms}
          max={maxBathrooms}
          handleChange={(event, value) =>
            handleFilterChange("selectedBathrooms", value)
          }
        />
        <MinMaxInput
          label="Rent"
          defaultMin={minRent.toString()}
          defaultMax={maxRent.toString()}
          onMinChange={(value) => handleFilterChange("selectedMinRent", value)}
          onMaxChange={(value) => handleFilterChange("selectedMaxRent", value)}
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
            <Select
              value={selectedCity}
              onChange={(event) =>
                handleFilterChange("selectedCity", event.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(listingsData.map((data) => data.city))).map(
                (city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                )
              )}
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
            <Select
              value={selectedSuburb}
              onChange={(event) =>
                handleFilterChange("selectedSuburb", event.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(listingsData.map((data) => data.suburb))).map(
                (suburb) => (
                  <MenuItem key={suburb} value={suburb}>
                    {suburb}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        <BooleanFilter
          label="Is Furnished"
          value={isFurnished}
          onChange={(value) => handleFilterChange("isFurnished", value)}
        />
        <BooleanFilter
          label="Pets Allowed?"
          value={isPetAllowed}
          onChange={(value) => handleFilterChange("isPetAllowed", value)}
        />
        <BooleanFilter
          label="Smoking Allowed?"
          value={isSmoking}
          onChange={(value) => handleFilterChange("isSmoking", value)}
        />
        <BooleanFilter
          label="Parking Allowed?"
          value={isParking}
          onChange={(value) => handleFilterChange("isParking", value)}
        />
      </div>
      <Button variant="contained" onClick={handleFilterSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default FilterOptions;
