// NewPropertyForm.tsx

import React, { useState } from "react";
import { TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Input, Menu } from "@mui/material";
import { act } from "react-dom/test-utils";
import PropertyInfo from "../../models/PropertyInfo";

function NewPropertyForm() {

    const [formData, setFormData] = useState<PropertyInfo>({
        _id: "",
        address: "",
        city: "",
        propertyType: "",
        bedRooms: "",
        bathRooms: "",
        updatedAt: new Date(),
        createdAt: new Date(),
    });

    const handleInputChange = (filedName: keyof PropertyInfo) => (
        event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [filedName]: event.target.value as string
        });
    };

    const handleSubmit = async () => {
        try{
            const response = await fetch("http://localhost:4000/api/property/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

        }catch (error) {
            console.log(error);
        }
    }


    return (
        <Grid container justifyContent="center" display={"flex"}>
            {/* <Typography variant="h5" gutterBottom>
                Add New Property
            </Typography> */}

            <FormControl>

                <TextField
                    label="Address"
                    variant="standard"
                    required
                    margin="normal"
                    name="address"
                />

                <TextField
                    label="City"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    name="city"
                >
                    <MenuItem value="Auckland">Auckland</MenuItem>
                    <MenuItem value="Hamilton">Hamilton</MenuItem>
                    <MenuItem value="Wellington">Wellington</MenuItem>
                </TextField>

                <TextField
                    label="propertyType"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    name="type"
                >
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>

                </TextField>

                <TextField
                    label="Bed Rooms"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    name="bedRooms"
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">3+</MenuItem>
                </TextField>

                <TextField
                    label="Bath Rooms"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    name="bathRooms"
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">3+</MenuItem>
                </TextField>

                <Button variant="contained" onClick={handleSubmit}>Submit</Button>

            </FormControl>



        </Grid>
    );
};

export default NewPropertyForm;
