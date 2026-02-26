import React from "react";
import Navbar from "../Navbar/MyNavbar";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Navbar/MyNavbar";

export default function Layout() {
  return (
    <>
      
      <Outlet />
    </>
  );
}
