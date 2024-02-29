// NewPropertyForm.tsx

import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid, FormControl, MenuItem } from "@mui/material";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface ActiveProperty {
    _id: string;    //property ID ref:MongoDB.ObjectId
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


function NewPropertyForm() {

    const initialProperty = (): ActiveProperty => {
        return {
            _id: '',
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
    const [description, setDescription] = React.useState<string>('');
    const propetyID = "65dabb41f1099bd4436c8940";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));

    };

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
        // console.log("e.target.checked:", e.target.checked);
    }

    const handleRentInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRentInput(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            rent: +e.target.value,
        }));
    };

    
    const handleDepositInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDepositInput(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            deposit: +e.target.value,
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            description: e.target.value,
        }));
    }

   

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // Prevent the default form submission
        console.log("Form Data:", formData);

        //send a POST request to the server
        axios.post("/property", formData)
            .then((res) => {
                console.log("Property added successfully:", res.data);
                // Close the modal
                setFormData(initialProperty());
                navigate("/home");  //navigate to the home page
                console.log("Form Data:", formData);

            })
            .then(
                //activate the property
                // axios.post("/property/activate", { _id: propetyID })
                //     .then((res) => {
                //         console.log("Property activated successfully:", res.data);
                //     })
                //     .catch((err) => {
                //         console.log("Property activation failed:", err);
                //     })
            )
            .catch((err) => {
                console.log("Property addition failed:", err);
            });
    }

    useEffect(() => {
        //fetch the ownerId from the user cookie when the component is loaded
        // const ownerId = "65c09432e170a2d423c030a3";
        setFormData((prevState) => ({
            ...prevState,
            _id: propetyID,   //set the ownerId in the form data
        }));
    }, []);

    return (
        <Grid container justifyContent="center" display={"flex"}>

            <FormControl component="form" onSubmit={handleSubmit} sx={{ minWidth: 500 }}>
                <Typography variant="h5" gutterBottom>
                    Active a Listing
                </Typography>

                <h3>property ID: {propetyID}</h3>

                <TextField
                    id="title"
                    label="Listing Title"
                    variant="standard"
                    margin="normal"
                    required
                    value={formData.title}
                    onChange={handleChange}
                />

                <TextField
                    id="rent"
                    label="Rent"
                    variant="standard"
                    margin="normal"
                    type='number'
                    required
                    value={rentInput}
                    onChange={handleRentInputChange}
                />

                <TextField
                    id="deposit"
                    label="Deposit"
                    variant="standard"
                    margin="normal"
                    type='number'
                    required
                    value={depositInput}
                    onChange={handleDepositInputChange}
                />

                <TextField
                    id="rentMethod"
                    label="Rent Method"
                    variant="standard"
                    margin="normal"
                    select
                    value={formData.rentMethod}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            rentMethod: value,
                        }));
                    }
                    }
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
                    value={formData.rentPaymentPeriod}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            rentPaymentPeriod: value,
                        }));
                    }
                    }
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
                    value={formData.availablityData}
                    onChange={handleChange}
                />

                <TextField
                    id="leaseTerm"
                    label="Lease Term"
                    variant="standard"
                    margin="normal"
                    select
                    value={formData.leaseTerm}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            leaseTerm: value,
                        }));
                    }
                    }
                >
                    <MenuItem value="6 Months">6 Months</MenuItem>
                    <MenuItem value="1 Year">1 Year</MenuItem>
                    <MenuItem value="2 Years">2 Years</MenuItem>
                    <MenuItem value="3 Years">3 Years</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <TextField
                    id="yearBuilt"
                    label="Year Built"
                    variant="standard"
                    margin="normal"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                />


                <TextField
                    id="nearbyFacilities"
                    label="Nearby Facilities"
                    variant="standard"
                    margin="normal"
                    value={formData.nearbyFacilities}
                    onChange={handleChange}
                />
                <textarea 
                // required 
                placeholder='Describe your property and tdell a bit about who you want'
                value={description}
                onChange={handleDescriptionChange}
                />
                <FormControlLabel
                    label="Furnished"
                    control={<Checkbox 
                        id="isFurnished"
                        value={formData.isFurnished}
                        onChange={handleSelectChange}
                    />}
                />

                <FormControlLabel
                    label="Pets Allowed"
                    control={<Checkbox
                        id="isPetAllowed"
                        value={formData.isPetAllowed}
                        onChange={handleSelectChange}
                         />}
                />

                <FormControlLabel
                    label="Smoking Allowed"
                    control={<Checkbox
                        id="isSmokingAllowed"
                        onChange={handleSelectChange}
                         />}
                />

                <FormControlLabel
                    label="Parking Available"
                    control={<Checkbox
                        id="isParkingAllowed"
                        onChange={handleSelectChange}
                         />}
                />

                <Button variant="contained" type="submit">Publish this property</Button>

            </FormControl>


        </Grid>
    );
};

export default NewPropertyForm;
