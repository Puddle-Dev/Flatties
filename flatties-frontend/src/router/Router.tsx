import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import ListingPage from "../pages/listing/ListingPage";
import RegisterPage from "../pages/register/RegisterPage";
import NewPropertyForm from "../pages/newProperty/NewPropertyForm";
import ActiveProperty from "../pages/newProperty/ActiveProperty";
import ListingDetail from "../pages/listing/ListingDetail";

function Router() {

  const handlePropertySubmit = (propertyData: any) => {
    // 处理新 property 提交逻辑
    console.log("Property submitted:", propertyData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/new-property" element={<NewPropertyForm />} />
          <Route path="/active-property" element={<ActiveProperty />} />
          <Route path="/listing-details" element={<ListingDetail />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
