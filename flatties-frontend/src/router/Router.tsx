import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import ListingPage from '../pages/listing/ListingPage';
import RegisterPage from '../pages/register/RegisterPage';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Router;