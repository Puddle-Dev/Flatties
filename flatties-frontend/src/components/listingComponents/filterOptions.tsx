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
        <div>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
            <InputLabel id="isFurnished-label">Is Furnished</InputLabel>
            <Select
              value={isFurnished}
              onChange={(event) =>
                handleFilterChange("isFurnished", event.target.value)
              }
            >
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
            <Select
              value={isPetAllowed}
              onChange={(event) =>
                handleFilterChange("isPetAllowed", event.target.value)
              }
            >
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
            <Select
              value={isSmoking}
              onChange={(event) =>
                handleFilterChange("isSmoking", event.target.value)
              }
            >
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
            <InputLabel id="isParkingAllowedLabel">Parking Allowed?</InputLabel>
            <Select
              value={isParking}
              onChange={(event) =>
                handleFilterChange("isParking", event.target.value)
              }
            >
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
  );
}

export default FilterOptions;
