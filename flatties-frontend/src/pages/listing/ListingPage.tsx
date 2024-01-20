import React,{useState, useEffect} from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import Card from '@mui/material/Card';
import { Stack, Paper, Box, Button } from "@mui/material";

import ListingCard from "../../components/listingCard/ListingCard";
import propretyTypes from "../../components/listingCard/propertyTypes";
import { resolve } from "path";
import { error } from "console";

function ListingPage() {

  const [listingsData, setListingsData] = useState<propretyTypes []>([]);

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

  const [sortOrder, setSortOrder] = useState('date'); // 'date' or 'price'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const handleSort = (sortType: 'date' | 'price') => {
    if (sortOrder === sortType) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOrder(sortType);
      setSortDirection('asc');
    }
  };
  
  const sortedListings = [...listingsData].sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
  
    if (sortOrder === 'date') {
      return sortDirection === 'asc' ? +dateA - +dateB : +dateB - +dateA;
    } else if (sortOrder === 'price') {
      return sortDirection === 'asc' ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price);
    }
  
    return 0;
  });


  return (
    <div>
      
      <div>
        <h1>Listing Page</h1>
      </div>
      <div>
        <Button variant="contained" onClick={() => handleSort('date')}>Sort by Date</Button>
        <Button variant="contained" onClick={() => handleSort('price')}>Sort by Price</Button>
      </div>

      <Stack direction={"row"} spacing={1} sx={{flexWrap:'wrap', justifyContent:'flex-start', columnGap:'16px', rowGap:'16px'}}>
        {listingsData.length === 0 && <p>No listings found.</p>}

        {listingsData.map((property, index) => (
          <ListingCard proprety={property} key={index}></ListingCard>
        ))}
      </Stack>

    </div>
    

  );
}

export default ListingPage;
