// NewPropertyForm.tsx

import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid, FormControl, MenuItem } from "@mui/material";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

import Alert from '@mui/material/Alert';

//define the property interface
interface Property {
    ownerId: string;
    type: string;
    address: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
}

function NewPropertyForm() {

    //to store number of bedrooms and bathrooms as string
    const [bedroomsInput, setBedroomsInput] = useState<string>('');
    const [bathroomsInput, setBathroomsInput] = useState<string>('');



    const initialProperty = (): Property => {
        return {
            ownerId: '',
            type: '',
            address: '',
            city: '',
            bedrooms: 0,
            bathrooms: 0,
        };
    }

    //initializing the state with an empty array
    const [formData, setFormData] = useState<Property>(initialProperty());

    //check if the form was submitted successfully
    const [isSuccess, setIsSuccess] = useState<boolean>(false);


    // Use the useHistory hook to get the history object
    const navigate = useNavigate();

    const handleBedroomsInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBedroomsInput(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            bedrooms: +e.target.value,
        }));
    };

    const handleBathroomsInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBathroomsInput(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            bathrooms: +e.target.value,
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));

    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // Prevent the default form submission
        //send a POST request to the server
        axios.post("/property/create", formData)
            .then((res) => {
                console.log("Property added successfully:", res.data);
                // Close the modal
                setIsSuccess(true);
            })
            .catch((err) => {
                console.log("Property addition failed:", err);
            });
        
        
        navigate("/home");  //navigate to the home page
        console.log("Form Data:", formData);

        //reset the form after submission
        setFormData(initialProperty());
        setIsSuccess(false);
    }

    useEffect(() => {
        //fetch the ownerId from the user cookie when the component is loaded
        const ownerId = "65c09432e170a2d423c030a3";
        setFormData((prevState) => ({
            ...prevState,
            ownerId: ownerId,   //set the ownerId in the form data
        }));
    }, []);


    return (
        <Grid container justifyContent="center" display={"flex"}>

            <FormControl component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>
                    Add New Property
                </Typography>

                <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    required
                    margin="normal"
                    value={formData.address}
                    onChange={handleChange}
                />

                <TextField
                    id="city"
                    label="City"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    value={formData.city}
                    // onChange={handleInputChange}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            city: value,
                        }));
                    }
                    }
                >
                    <MenuItem value="Auckland">Auckland</MenuItem>
                    <MenuItem value="Hamilton">Hamilton</MenuItem>
                    <MenuItem value="Wellington">Wellington</MenuItem>
                </TextField>

                <TextField
                    label="Property Type"
                    variant="standard"
                    required
                    margin="normal"
                    select
                    value={formData.type}
                    // onChange={handleInputChange}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            type: value,
                        }));
                    }
                    }
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
                    value={bedroomsInput}
                    onChange={handleBedroomsInputChange}
                >
                    <MenuItem value="0">0</MenuItem>
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
                    value={bathroomsInput}
                    onChange={handleBathroomsInputChange}
                >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">3+</MenuItem>
                </TextField>

                <Button variant="contained" type="submit">Submit</Button>
                {isSuccess && (
                    <Alert severity="success"> Property added successfully </Alert>
                )}

            </FormControl>


        </Grid>
    );
};

export default NewPropertyForm;
