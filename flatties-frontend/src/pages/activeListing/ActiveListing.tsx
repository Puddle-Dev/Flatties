import React from 'react';
import { TextField, Button, Typography, Grid, FormControl, MenuItem } from "@mui/material";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextArea from "../../components/TextArea"
import TextareaAutosize from '@mui/material/TextareaAutosize';


interface ActiveProperty {
    ownerId: string;
    title: string;
    rent: number;
    rentMethod: string;
    rentPaymentPeriod: string;
    deposit: number;
    availablityData: string;
    leaseTerm: string;
    isFurnished: boolean;
    isPetAllowed: boolean;
    isSmokingAllowed: boolean;
    isParkingAllowed: boolean;
    yearBuilt: Date;
    description: string;
    nearbyFacilities: [string];
    isActivated: boolean;
}


function ActiveListing() {


    //initializing the interface 
    const initialProperty = (): ActiveProperty => {
        return {
            ownerId: '',
            title: '',
            rent: 0,
            rentMethod: '',
            rentPaymentPeriod: '',
            deposit: 0,
            availablityData: '',
            leaseTerm: '',
            isFurnished: false,
            isPetAllowed: false,
            isSmokingAllowed: false,
            isParkingAllowed: false,
            yearBuilt: new Date(),
            description: '',
            nearbyFacilities: [''],
            isActivated: false,
        };
    }


    const [formData, setFormData] = React.useState<ActiveProperty>(initialProperty);
    const [rentInput, setRentInput] = React.useState<string>('');
    const [depositInput, setDepositInput] = React.useState<string>('');

    const navigate = useNavigate();



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // Prevent the default form submission
        //send a POST request to the server
        // axios.post("/property/create", formData)
        //     .then((res) => {
        //         console.log("Property added successfully:", res.data);
        //         // Close the modal
        //         setIsSuccess(true);
        //     })
        //     .catch((err) => {
        //         console.log("Property addition failed:", err);
        //     });


        // navigate("/home");  //navigate to the home page
        // console.log("Form Data:", formData);

        //reset the form after submission
        // setFormData(initialProperty());
    }




    return (
        <Grid container justifyContent="center" display={"flex"}>

            <FormControl component="form" onSubmit={handleSubmit} sx={{ minWidth: 500 }}>
                <Typography variant="h5" gutterBottom>
                    Active a Listing
                </Typography>

                <TextField
                    id="title"
                    label="Listing Title"
                    variant="standard"
                    margin="normal"
                    required
                />

                <TextField
                    id="rent"
                    label="Rent"
                    variant="standard"
                    margin="normal"
                    type='number'
                    required
                />

                <TextField
                    id="deposit"
                    label="Deposit"
                    variant="standard"
                    margin="normal"
                    type='number'
                    required
                />

                <TextField
                    id="rentMethod"
                    label="Rent Method"
                    variant="standard"
                    margin="normal"
                    select
                >
                    <MenuItem value="room">Signle Room</MenuItem>
                    <MenuItem value="whole">Whole house</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>

                </TextField>

                <TextField
                    id='rentPaymentPeriod'
                    label="Rent Payment Period"
                    variant="standard"
                    margin="normal"
                    select
                >
                    <MenuItem value="0">Weekly</MenuItem>
                    <MenuItem value="1">Fortnightly</MenuItem>
                    <MenuItem value="2">Monthly</MenuItem>
                    <MenuItem value="3">Seasonly</MenuItem>
                    <MenuItem value="4">Yearly</MenuItem>
                </TextField>

                <TextField
                    id="availablityData"
                    label="Availablity Data"
                    variant="standard"
                    margin="normal"
                    type="date"
                />

                <TextField
                    id="leaseTerm"
                    label="Lease Term"
                    variant="standard"
                    margin="normal"
                    select
                >
                    <MenuItem value="0">6 Months</MenuItem>
                    <MenuItem value="1">1 Year</MenuItem>
                    <MenuItem value="2">2 Years</MenuItem>
                    <MenuItem value="3">3 Years</MenuItem>
                    <MenuItem value="4">Other</MenuItem>
                </TextField>

                <TextField
                    id="yearBuilt"
                    label="Year Built"
                    variant="standard"
                    margin="normal"
                />

                
                <TextField
                    id="nearbyFacilities"
                    label="Nearby Facilities"
                    variant="standard"
                    margin="normal"
                />
                <TextareaAutosize aria-label='description' minRows={5} required placeholder='Describe your property and tell a bit about who you want'></TextareaAutosize>

                <FormControlLabel
                    label="Furnished"
                    control={<Checkbox />}
                    required
                />

                <FormControlLabel
                    label="Pets Allowed"
                    control={<Checkbox />}
                    required
                />

                <FormControlLabel
                    label="Smoking Allowed"
                    control={<Checkbox />}
                    required
                />

                <FormControlLabel
                    label="Parking Available"
                    control={<Checkbox />}
                    required
                />

                <Button variant="contained" type="submit">Publish this property</Button>

            </FormControl>


        </Grid>
    )
}

export default ActiveListing;