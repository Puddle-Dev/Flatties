// Layout.tsx
import React from "react";
import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { Paper } from "@mui/material";

function Layout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Paper elevation={3} square style={{ padding: "10px" }}>
        <Outlet />
        </Paper>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
