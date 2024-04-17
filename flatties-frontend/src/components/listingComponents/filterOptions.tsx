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

interface FilterOptionsProps {
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
}

function FilterOptions({}: FilterOptionsProps) {}

export default FilterOptions;
