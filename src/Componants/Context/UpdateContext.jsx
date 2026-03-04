import React, { createContext, useState } from "react";

export let updatecontext = createContext();

export default function UpdateContext({ children }) {
  const [postUpdate, setPostUpdate] = useState(null);
  
  return (
    <>
      <updatecontext.Provider value={{ postUpdate, setPostUpdate }}>
        {children}
      </updatecontext.Provider>
    </>
  );
}
