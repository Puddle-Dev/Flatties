import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

interface SortControlProps {
  sortOrder:
    | "addedAsc"
    | "addedDesc"
    | "priceAsc"
    | "priceDesc"
    | "nameAsc"
    | "nameDesc"
    | "availAsc"
    | "availDesc";
  handleSort: (
    value:
      | "addedAsc"
      | "addedDesc"
      | "priceAsc"
      | "priceDesc"
      | "nameAsc"
      | "nameDesc"
      | "availAsc"
      | "availDesc"
  ) => void;
}

const SortControl = ({ sortOrder, handleSort }: SortControlProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
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
  );
};

export default SortControl;
