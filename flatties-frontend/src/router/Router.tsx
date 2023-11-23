import React from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import ListingPage from '../pages/listing/ListingPage';
// import NavBar from '../components/navbar/NavBar';
// import Footer from '../components/footer/Footer';
import './Router.css';

function Router() {
  return (
    <div className="Router">
      <HomePage />
      <ProfilePage />
      <ListingPage />
    </div>

  );
}

export default Router;