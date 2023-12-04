import React, { useState, ChangeEvent, FormEvent } from 'react';
import NavBar from '../../components/layout/navBar/NavBar';
import Box from '@mui/material/Box';
import TextField  from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput } from '@mui/material';
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    username: '',
    gender: '',
    phone: '',
    ethnicity: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here using formData
    console.log('Form submitted:', formData);
    // You can send the form data to an API or perform other actions
  };

  return (
    <div className="RegisterPage">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname"> First Name:</label>
          <br />
          <input
            type="text"
            name="firstname"
            id="fname"
            onChange={handleChange}
            value={formData.firstname}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="lastname"> Last Name:</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lname"
            onChange={handleChange}
            value={formData.lastname}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="email"> Email:</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            required
            maxLength={40}
          />
        </div>

        <div>
          <label htmlFor="dob"> Date of Birth:</label>
          <br />
          <input
            type="date"
            name="dob"
            id="dob"
            onChange={handleChange}
            value={formData.dob}
            required
          />
        </div>

        <div>
          <label htmlFor="username"> Username:</label>
          <br />
          <input
            type="text"
            name="username"
            id="uname"
            onChange={handleChange}
            value={formData.username}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="gender"> Gender:</label>
          <br />
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            value={formData.gender}
            required
          >
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="NA">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label htmlFor="phone"> Phone number:</label>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={formData.phone}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="ethnicity"> Ethnicity:</label>
          <br />
          <input
            type="text"
            name="ethnicity"
            id="ethnicity"
            onChange={handleChange}
            value={formData.ethnicity}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="password"> Password:</label>
          <br />
          <input
            type="text"
            name="password"
            id="pword"
            onChange={handleChange}
            value={formData.password}
            required
            maxLength={20}
          />
        </div>

        <Box
        component="form"
        sx={{'& .MuiTextField-root' : { m: 1, width: '25ch'},
       }}
       noValidate
       autoComplete="off"
       ><div>
        <TextField
          id="outlined-helperText"
          label="First Name"
        ></TextField>
      </div>
      <div>
        <TextField
          id="outlined-helperText"
          label="Last Name"
        ></TextField>
      </div>
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
       </Box>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
