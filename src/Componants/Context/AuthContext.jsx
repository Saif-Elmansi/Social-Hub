import React, { createContext, useEffect, useState } from "react";

export let authContext = createContext();

export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    let tokenFromLoc = localStorage.getItem("token");

    if (tokenFromLoc != null) {
      setToken(tokenFromLoc);
    }
  }, []);
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
