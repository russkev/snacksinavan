import React, { createContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import VanRoutes from "../routes/van.routes"

export const VanLoginContext = createContext([])

export const VanLoginContextProvider = ({ children }) => {
  const [vanRedirectPath, setVanRedirectPath] = useState(VanRoutes.MY_VAN.path)
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if ("pathname" in location) {
        const currPath = location.pathname
        if (currPath.substring(0,4) === "/van" && currPath.length > 4) {
          setVanRedirectPath(currPath)
        }
      }
    }

    return function cleanup() {
      mounted = false
    }
  }, [location])

  const value = {
    vanRedirectPath
  }

  return <VanLoginContext.Provider value={value}>{children}</VanLoginContext.Provider>   
}