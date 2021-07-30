import React, { createContext, useState, useEffect } from "react";
import API from "../API"

export const SnackContext = createContext([]);

/**
 * Get the list of snacks from the server
 */
async function getSnacks() {
  try {
    const response = await API.get("/api/menu");
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Main snack context provider.
 * Provides globally accessible and modifiable states for the useUser hook to interact with.
 */
export const SnackContextProvider = ({ children }) => {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all the snacks as soon as page loads
  useEffect(() => {
    let mounted = true;
    async function fetchSnacks() {
      if (mounted) {
        try {
          const fetchedSnacks = await getSnacks();
          setSnacks(fetchedSnacks);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSnacks();

    // Cleanup required to prevent memory leak
    return function cleanup() {
      mounted = false;
    };
  }, []);

    const value = {
      snacks,
      loading,
      error,
    };

  return <SnackContext.Provider value={value}>{children}</SnackContext.Provider>;
};
