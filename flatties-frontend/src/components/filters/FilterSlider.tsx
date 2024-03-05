import React from "react";
import { FormControl, Box, InputLabel, Slider } from "@mui/material";

interface FilterSliderProps {
  label: string;
  selectedItems: number[] | null;
  min: number;
  max: number;
  handleChange: (event: Event, value: number | number[]) => void;
}

const FilterSlider: React.FC<FilterSliderProps> = ({
  label: label,
  selectedItems: selectedItems,
  min: min,
  max: max,
  handleChange: handleChange,
}) => {
  return (
    <div>
      <FormControl style={{ width: "100%" }}>
        <Box>
          <InputLabel id="items-label">{label}</InputLabel>
          <Slider
            value={selectedItems || [min, max]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby={label}
            max={max}
            marks
            valueLabelFormat={(value) => `${value}`}
            step={1}
            min={min}
            disableSwap
          />
        </Box>
      </FormControl>
    </div>
  );
};

export default FilterSlider;
