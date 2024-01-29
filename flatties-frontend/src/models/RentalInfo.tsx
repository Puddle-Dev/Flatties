interface RentalInfo{
    listingTitle: string;
    rentalMethod: string;
    furnitured: boolean;
    appliances: boolean;
    condition: string;
    nearbyFacilities: string;
    rent: number;
    rentPaymentPeriod: string;
    deposit: number;
    availabilityDate: Date;
    leaseTerm: string;
    propertyPhotos: string;
    description: string;
    contactInformation: string;
    petAllowed: boolean;
    smokingAllowed: boolean;
    parkingAllowed:boolean;
}

export default RentalInfo;