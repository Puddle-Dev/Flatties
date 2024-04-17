import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

interface BooleanFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const BooleanFilter = ({ label, value, onChange }: BooleanFilterProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`${label.toLowerCase()}-label`}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value as string)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="true">Yes</MenuItem>
        <MenuItem value="false">No</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BooleanFilter;
