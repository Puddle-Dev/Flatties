import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import ListingPage from "../pages/listing/ListingPage";
import RegisterPage from "../pages/register/RegisterPage";
import NewPropertyForm from "../pages/newProperty/NewPropertyForm";
import ActiveProperty from "../pages/newProperty/ActiveProperty";
import ListingDetail from "../pages/listing/ListingDetail";
import AboutPage from "../pages/about/AboutPage";
import { useCookie } from "../services/cookies/CookieContext";

function Router() {

  const {getCookie} = useCookie();
  let token = getCookie("token");

  const PrivateRoute = ({element}: any) => {
    //update token every time the route is accessed
    token = getCookie("token");
    //return the element if the token exists, otherwise redirect to the home page
    return token ? element : <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/new-property" element={<PrivateRoute element={<NewPropertyForm />} />} />
          <Route path="/active-property" element={<PrivateRoute element={<ActiveProperty />} />} />
          <Route path="/listing/:id" element={<PrivateRoute element={<ListingDetail />} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
