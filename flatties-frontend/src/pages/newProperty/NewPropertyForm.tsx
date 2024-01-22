// NewPropertyForm.tsx

import React, { useState } from "react";
import { TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import propretyTypes from "../../components/listingCard/propertyTypes";

interface PropertyFormProps {
    onSubmit: (propertyData: propretyTypes) => void;
}

const NewPropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {

    const [propertyData, setPropertyData] = useState<propretyTypes>({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        price: "",
        type: "",
        year_built: new Date(),
        parking: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Execute API request to submit the data
        try {
            const response = await fetch("http://localhost:4000/api/property/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(propertyData),
            });

            if (response.ok) {
                // Optionally handle success response
                console.log("Property submitted successfully!");
                const responseData = await response.json();
                // You can also call a callback function passed via props
                setDialogContent(responseData.message || "Property submitted successfully!");
                setShowSuccessDialog(true);
                onSubmit(propertyData);
            } else {
                // Optionally handle error response
                console.error("Failed to submit property");
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error submitting property:", error);
        }

        // Reset the form
        setPropertyData({
            title: "",
            description: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            price: "",
            type: "",
            year_built: new Date(),
            parking: "",
            image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState<string>("");

    const handleDialogClose = () => {
        setShowSuccessDialog(false);
        //redirect to home page
        window.location.href = "/";
    }


    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <form>
                    <Typography variant="h5" gutterBottom>
                        Add New Property
                    </Typography>

                    <TextField
                        label="Title"
                        name="title"
                        value={propertyData.title}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={propertyData.description}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Address"
                        name="address"
                        value={propertyData.address}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="City"
                        name="city"
                        value={propertyData.city}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Price"
                        name="price"
                        value={propertyData.price}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    {/* Add other input fields... */}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type"
                            name="type"
                            value={propertyData.type}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value="house">House</MenuItem>
                            <MenuItem value="apartment">Apartment</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">
                        Add Property
                    </Button>
                </form>

                {/* Success Dialog */}
                <Dialog open={showSuccessDialog} onClose={handleDialogClose}>
                    <DialogTitle>Success!</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogContent}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        </Grid>
    );
};

export default NewPropertyForm;
