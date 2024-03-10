// NewPropertyForm.tsx

import React, { useEffect } from "react";
import { TextField, Button, Typography, Grid, FormControl, MenuItem } from "@mui/material";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import FlattiesLogo from '../../components/ImageLoader';

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
    nearbyFacilities: string[];
    isActivated: boolean;
}

function ListingDetail() {

    const initialProperty = (): ListingDetailData => {
        return {
            _id: '12345',
            title: 'title',
            rent: 12345,
            rentMethod: 'room',
            rentPaymentPeriod: 'weekly',
            deposit: 12345,
            availablityData: 'today',
            leaseTerm: '6 months',
            isFurnished: true,
            isPetAllowed: false,
            isSmokingAllowed: true,
            isParkingAllowed: true,
            yearBuilt: new Date("2000"),
            description: 'this is a description of the property.',
            nearbyFacilities: ['school', 'hospital', 'park', 'train', 'station', 'shopping mall', 'grocery store', 'restaurant', 'gym', 'library', 'cinema'],
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
        <div className="listingDetailContainer">
            {/* <h1>Listing Details</h1> */}
            <Carousel
                showArrows={true}
                showThumbs={true}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                stopOnHover={false}
            >
                {FlattiesLogo.map((image) => (
                    <div key={image.id} style={{ height: '300px' }}>
                        <img src={image.src} alt={image.alt} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}/>
                    </div>
                ))}
            </Carousel>
            <hr />
            <div className="detailsContainer">
                <h2>Property overview</h2>
                <p>
                    {formData.title}
                </p>
                <h2>Room details</h2>
                <p>
                    Rent: {formData.rent} <br />
                    Rent Method:{formData.rentMethod} <br />
                    Payment Period: {formData.rentPaymentPeriod}
                </p>
                
                <h2>Amenities</h2>
                <p>
                    Furnished: {formData.isFurnished ? "Yes" : "No"} <br />
                    Pet Allowed: {formData.isPetAllowed ? "Yes" : "No"} <br />
                    Smoking Allowed: {formData.isSmokingAllowed ? "Yes" : "No"} <br />
                    Parking Allowed: {formData.isParkingAllowed ? "Yes" : "No"}
                </p>

                <h2>Description</h2>
                <p>
                    {formData.description}
                </p>

                <h2>Location</h2>
                <p>
                    Year Built: {formData.yearBuilt.getFullYear()} <br />
                </p>

                <h2>Nearby facilities</h2>
                <p>
                 {formData.nearbyFacilities.map((facility, index) => (
                    <span key={index}>{facility}, </span>
                ))}
                </p>
            </div>
        </div>
    );
};

export default ListingDetail;
