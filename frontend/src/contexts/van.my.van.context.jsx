import React, { createContext, useState } from "react";
import { defaultLocation } from "./van.user.context";

export const VanMyVanContext = createContext([]);

export const VanMyVanContextProvider = ({ children }) => {
  const [locationIsChanged, setLocationIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);



  const value = {
    locationIsChanged,
    setLocationIsChanged,
    loading,
    setLoading,
    snackMessage,
    setSnackMessage,
    currentDescription,
    setCurrentDescription,
    isSuccess,
    setIsSuccess,
    currentLocation,
    setCurrentLocation,
  };

  return <VanMyVanContext.Provider value={value}>{children}</VanMyVanContext.Provider>;
};
