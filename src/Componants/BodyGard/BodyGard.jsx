import React from "react";
import { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function BodyGard({ children }) {
  const { token } = useContext(authContext);

  const localToken = localStorage.getItem("token");

  if (token === null && !localToken) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
}
