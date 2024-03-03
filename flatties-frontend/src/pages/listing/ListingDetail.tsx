// NewPropertyForm.tsx

import React, { useEffect } from "react";
import { TextField, Button, Typography, Grid, FormControl, MenuItem } from "@mui/material";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


interface ListingDetailData {
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


function ListingDetail() {

    const initialProperty = (): ListingDetailData => {
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

    const [formData, setFormData] = React.useState<ListingDetailData>(initialProperty);


    useEffect(() => {
        //fetch the ownerId from the user cookie when the component is loaded
        // const ownerId = "65c09432e170a2d423c030a3";
        setFormData((prevState) => ({
            ...prevState,
            _id: "65dabb41f1099bd4436c8940",   //set the ownerId in the form data
        }));
    }, []);

    return (
        <div>
            <h1>Listing Details</h1>
        </div>
    );
};

export default ListingDetail;
