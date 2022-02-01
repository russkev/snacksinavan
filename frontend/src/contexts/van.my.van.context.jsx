import React, { createContext, useState } from "react";
import { defaultLocation } from "./van.user.context";

export const VanMyVanContext = createContext([]);

export const VanMyVanContextProvider = ({ children }) => {
  const [locationIsChanged, setLocationIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);



  const value = {
    locationIsChanged,
    setLocationIsChanged,
    loading,
    setLoading,
    currentDescription,
    setCurrentDescription,
    currentLocation,
    setCurrentLocation,
  };

  return <VanMyVanContext.Provider value={value}>{children}</VanMyVanContext.Provider>;
};
