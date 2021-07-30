import React, { createContext, useState } from "react";

export const VanContext = createContext([]);

export const VanContextProvider = ({ children }) => {
  const [van, setVan] = useState(null);
  const value = {
    van,
    setVan,
  };

  return <VanContext.Provider value={value}>{children}</VanContext.Provider>;
};
