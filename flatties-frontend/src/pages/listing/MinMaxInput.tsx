import React, { useState } from "react";
import { TextField, Grid, InputAdornment } from "@mui/material";

interface MinMaxInputProps {
  label: string;
  min: string;
  max: string;
  defaultMin: string;
  defaultMax: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const MinMaxInput: React.FC<MinMaxInputProps> = ({
  label,
  min,
  max,
  defaultMin,
  defaultMax,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label={`Min ${label}`}
            type="number"
            defaultValue={defaultMin}
            onChange={(e) => onMinChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={`Max ${label}`}
            type="number"
            defaultValue={defaultMax}
            onChange={(e) => onMaxChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MinMaxInput;
