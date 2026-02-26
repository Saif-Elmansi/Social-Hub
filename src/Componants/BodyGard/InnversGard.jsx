import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
export default function InnversGard({ children }) {
  const { token } = useContext(authContext);
  const localToken = localStorage.getItem("token");

  if (token || localToken) {
    setTimeout(() => {
      return <Navigate to="/home" />;
    }, 1500);
  }

  return <div>{children}</div>;
}
