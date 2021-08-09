import React, { createContext, useState, useEffect } from "react";
import API from "../API";


export const UserContext = createContext([]);

/**
 * Check that the user credentials are valid by querying the server
 */
async function postAuthenticate() {
  try {
    const response = await API.post("/api/auth/authenticate");
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Check that the credentials stored on the local machine are valid
 */
const authenticateLocalStorage = async (setUsername, setToken, setIsAuthenticated) => {
  try {
    const response = await postAuthenticate();
    if (response.data.authenticated === "true") {
      setIsAuthenticated(true);
      setUsername(response.data.username);
      setToken(localStorage.getItem("token"));
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    setIsAuthenticated(false);
  }
};



/**
 * Main user context provider.
 * Provides globally accessible and modifiable states for the useUser hook to interact with.
 */
export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);





  // Authenticate the user as soon as the page is loaded
  useEffect(() => {
    let mounted = true

    if (mounted) {
      authenticateLocalStorage(setUsername, setToken, setIsAuthenticated);
    }

    return () => mounted=false;
  }, []);

  const value = {
    username,
    token,
    setUsername,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
