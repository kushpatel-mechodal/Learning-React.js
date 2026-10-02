import React, { useState } from "react";
import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(""); //pass the data using state

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children} 
    </userContext.Provider>
  );
};

export default UserContextProvider;
