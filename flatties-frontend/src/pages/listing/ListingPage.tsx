import React,{useState, useEffect} from "react";

import { Stack, Paper, Box, Button, List } from "@mui/material";

import PropertyInfo from "../../models/PropertyInfo";

function ListingPage() {

  const [listingsData, setListingsData] = useState<PropertyInfo []>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/property/all',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {

      if(!response.ok){
        throw new Error('Failed to fetch.')
      }
      return response.json();
    })
    .then(data => setListingsData(data))
    .catch(error => console.error('Error fetching data:', error))
  }, [])


  return (
    <div>
      
      <div>
        <h1>Properties Page</h1>
      </div>

      <Stack direction={"row"} spacing={1} sx={{flexWrap:'wrap', justifyContent:'flex-start', columnGap:'16px', rowGap:'16px'}}>
        <List>
          {listingsData.map((property, index) => (
            <Paper key={property._id} sx={{width: 500, minWidth: 250, marginBottom: '8px'}}>

              <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', p: 2, fontStyle: {textAlign:'left'}}}>
                <h3>Index:{index + 1} </h3>
                <h3>Property ID: {property._id}</h3>
                <h3>City: {property.city}</h3>
                <h3>Property Type: {property.propertyType}</h3>
                <h3>BedRooms: {property.bedRooms}</h3>
                <h3>BathRooms: {property.bathRooms}</h3>
              </Box>
            </Paper>
          ))}
        </List>
      </Stack>

    </div>
    

  );
}

export default ListingPage;
