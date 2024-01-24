import React from "react";

import Router from "./router/Router";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import { height } from "@mui/system";
// import HomePage from './pages/home/HomePage';
// // material ui imports
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import AlertTitle from '@mui/material/AlertTitle';
// import Container from '@mui/material/Container';

function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
