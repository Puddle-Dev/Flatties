import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home/HomePage';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Container from '@mui/material/Container';


function App() {
  return (
    <Container maxWidth="xl">
      {/* example of using material ui */}
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Material UI uses Emotion as its default styling engine! — <strong>Supported!</strong>
      </Alert>
      </Stack>
      
      {/* import the page components */}
      <HomePage />

    </Container>
  );
}

export default App;
