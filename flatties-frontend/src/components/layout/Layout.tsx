// Layout.tsx
import React from "react";
import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { Paper } from "@mui/material";

function Layout() {
  return (
    <div className="container">
      <header className="maxContainer">
        <NavBar />
      </header>
      <main className="maxContainer">
        <Paper elevation={3} square={false} style={{ padding: "8px" }}>
        <Outlet />
        </Paper>
      </main>
      <footer className="maxContainer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
