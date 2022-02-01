import React, { createContext, useState } from "react";

export const SnackbarContext = createContext([]);

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIsSuccess, setSnackbarIsSuccess] = useState(false);

  const value = {
    snackbarMessage,
    setSnackbarMessage,
    snackbarIsSuccess,
    setSnackbarIsSuccess,
  };

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
};
