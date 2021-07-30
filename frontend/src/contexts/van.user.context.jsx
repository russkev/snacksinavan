import React, { createContext, useState, useEffect } from "react";
import VanAPI from "../VanAPI"

export const defaultLocation = { lat: -37.7963, lng: 144.9616 };
const defaultVan = {
  readyForOrders: false,
  vanName: "Default Van",
  latitude: defaultLocation.lat,
  longitude: defaultLocation.lng,
  locationDescription: "",
};

export const VanUserContext = createContext([]);

async function postAuthenticateVan() {
  try {
    const response = await VanAPI.post("/api/van/authenticate");
    return response
  } catch(error) {
    throw error;
  }
}

async function getVanDetails() {
  try {
    const response = await VanAPI.get("/api/van/vanDetails");
    return response.data
  } catch(error) {
    throw error
  }
}

async function postVanDetails(vanDetails) {
  try {
    const response = await VanAPI.post("/api/van/setStatus", vanDetails)
    return response.data
  } catch (error) {
    throw error
  }
}

const authenticateLocalStorage = async (setVanName, setVanToken, setVanIsAuthenticated) => {
  try {
    const response = await postAuthenticateVan();
    if (response.data.vanAuthenticated === "true") {
      setVanIsAuthenticated(true);
      setVanName(response.data.vanName);
      setVanToken(localStorage.getItem("vanToken"))
      return true
    } else {
      setVanIsAuthenticated(false)
      return false
    }
  } catch (error) {
    setVanIsAuthenticated(false);
    return false
  }
};

const storeVanDetails = async (setVanDetails) => {
  try {
    const response = await getVanDetails()
    if (response.vanAuthenticated && response.vanAuthenticated === "false") {
      throw new Error("Van not authorized")
    } else {
      setVanDetails(response)
    }
  } catch(error) {
    setVanDetails(defaultVan)
  }
}


export const VanUserContextProvider = ({ children }) => {
  const [vanName, setVanName] = useState("");
  const [vanToken, setVanToken] = useState("");
  const [vanIsAuthenticated, setVanIsAuthenticated] = useState(false);
  const [vanDetails, setVanDetails] = useState(defaultVan)

  useEffect(() => {
    const authenticated = authenticateLocalStorage(setVanName, setVanToken, setVanIsAuthenticated);
    if (authenticated) {
      storeVanDetails(setVanDetails)
    }
  }, [])

  useEffect(() => {
    if (vanIsAuthenticated) {
      storeVanDetails(setVanDetails)
    }
  }, [vanIsAuthenticated])

  const updateVan = async (fieldsToUpdate) => {
    const newVanDetails = {...vanDetails, ...fieldsToUpdate}
    try {
      const response = await postVanDetails(newVanDetails)
      setVanDetails(response);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  const resetVanDetails = () => {
    setVanDetails(defaultVan)
    setVanName("")
    setVanIsAuthenticated(false)
  }

  const value = {
    vanName,
    setVanName,
    vanIsAuthenticated,
    setVanIsAuthenticated,
    updateVan,
    vanDetails,
    resetVanDetails,
    vanToken,
    setVanToken,
  };

  return <VanUserContext.Provider value={value}>{children}</VanUserContext.Provider>
};
