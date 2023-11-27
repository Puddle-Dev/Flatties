// Layout.tsx
import React from "react";
import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
