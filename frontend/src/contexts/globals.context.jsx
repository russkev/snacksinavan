import React, { createContext, useState, useEffect } from "react";
import API from "../API"

export const GlobalsContext = createContext([]);

async function getGlobals() {
  try {
    const response = await API.get("/api/globals")
    return response.data
  } catch(error) {
    throw error
  }
}

export const GlobalsContextProvider = ({ children }) => {
  const [globals, setGlobals] = useState();

  const value = { globals };

  useEffect(() => {
    getGlobals().then((response) => {
      setGlobals(response)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  return <GlobalsContext.Provider value={value}>{children}</GlobalsContext.Provider>;
};
