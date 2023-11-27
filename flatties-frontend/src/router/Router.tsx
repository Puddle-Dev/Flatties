import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import ListingPage from "../pages/listing/ListingPage";
import RegisterPage from "../pages/register/RegisterPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
