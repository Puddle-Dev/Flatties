import React, { useState, ChangeEvent, FormEvent } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { InputLabel, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  username: string;
  gender: string;
  phone: string;
  ethnicity: string;
  password: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    username: "",
    gender: "",
    phone: "",
    ethnicity: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here using formData
    console.log("Form submitted:", formData);
    // You can send the form data to an API or perform other actions
  };

  const [gender, setGender] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const todayDate: string = new Date().toLocaleDateString();

  return (
    <div className="RegisterPage">
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="outlined-helperText" label="First Name"></TextField>
            <TextField id="outlined-helperText" label="Last Name"></TextField>
          </div>
          <div>
            <TextField id="outlined-helperText" label="Email"></TextField>
            <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
          </div>

          <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={gender}
                label="Gender *"
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Female</MenuItem>
                <MenuItem value={20}>Male</MenuItem>
                <MenuItem value={30}>Other</MenuItem>
                <MenuItem value={30}>Prefer not to say</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <TextField
              id="outlined-required"
              label="Date of Birth:"
              type="date"
              placeholder={todayDate}
            ></TextField>
          </div>

          <div>
            <TextField id="outlined-helperText" label="Phone"></TextField>
            <TextField id="outlined-helperText" label="Ethnicity"></TextField>
          </div>

          <Button variant="contained">Sign Up</Button>
        </Box>
      </form>
    </div>
  );
}

export default RegisterPage;
