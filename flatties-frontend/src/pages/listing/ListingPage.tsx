import React,{useState, useEffect} from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import Card from '@mui/material/Card';
import { Stack, Paper, Box } from "@mui/material";

import ListingCard from "../../components/listingCard/ListingCard";
import propretyTypes from "../../components/listingCard/propertyTypes";

function ListingPage() {

  const [listingsData, setListingsData] = useState<propretyTypes []>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/property/all',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => setListingsData(data))
  }, [])


  return (
    <div>
      
      <div>
        <h1>Listing Page</h1>
      </div>

      <Stack direction={"row"} spacing={1} sx={{flexWrap:'wrap', justifyContent:'flex-start', columnGap:'16px', rowGap:'16px'}}>
        {listingsData.map((property, index) => (
          <ListingCard proprety={property} key={index}></ListingCard>
        ))}
      </Stack>
      
      {/* <Box>

        <Stack direction="row" spacing={1} sx={{flexWrap:'wrap', justifyContent:'flex-start', columnGap:'16px', rowGap:'16px'}}  >
          <ListingCard></ListingCard>
   

        </Stack>  
      </Box> */}
    </div>
    

  );
}

export default ListingPage;
