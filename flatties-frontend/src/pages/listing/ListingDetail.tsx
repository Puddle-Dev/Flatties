// NewPropertyForm.tsx

import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import FlattiesLogo from "../../components/ImageLoader";
import DummyData from "../listing/dummyData.json";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
  [key: string]: string | undefined;
}

function ListingDetail() {
  const { id } = useParams<Params>();

  // Find the property with the matching id from the dummy data
  const formData = DummyData.find((item) => item._id === id);

  if (!formData) {
    return <div>Loading...</div>;
  }

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
          <div key={image.id} style={{ height: "300px" }}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                objectFit: "contain",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            />
          </div>
        ))}
      </Carousel>
      <hr />
      <div className="detailsContainer">
        <h2>Property overview</h2>
        <p>{formData.listingTitle}</p>
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

        {/* <p>{formData.description}</p> */}

        <h2>Location</h2>
        <p>
          City: {formData.city} <br />
          Address: {formData.address} <br />
          Suburb: {formData.suburb} <br />
        </p>
        {/* <p>
          Year Built: {formData.year_built} <br />
        </p> */}

        {/* <h2>Nearby facilities</h2>
        <p>
          {formData.nearbyFacilities.map((facility, index) => (
            <span key={index}>{facility}, </span>
          ))}
        </p> */}
      </div>
    </div>
  );
}

export default ListingDetail;
