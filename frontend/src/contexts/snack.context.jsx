import React, { createContext, useState, useEffect } from "react";
import API from "../API";

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

function getSnacksOfCategory(snacks, category) {
  const categorySnacks = snacks.reduce((previousValue, currentValue) => {
    if (currentValue.category === category) {
      return previousValue.concat(currentValue);
    } else {
      return previousValue;
    }
  }, []);

  const sortedSnacks = categorySnacks.sort((snackA, snackB) => {
    const a = snackA.name;
    const b = snackB.name;
    if (a < b) {
      return -1;
    } else if (b < a) {
      return 1;
    } else return 0;
  });

  return sortedSnacks;
}

async function getSortedSnacks() {
  try {
    const fetchedSnacks = await getSnacks();
    const drinkSnacks = getSnacksOfCategory(fetchedSnacks, "drink");
    const foodSnacks = getSnacksOfCategory(fetchedSnacks, "food");
    const snacks = drinkSnacks.concat(foodSnacks);
    const firsts = [drinkSnacks[0].name, foodSnacks[0].name]
    return {
      snacks: snacks,
      firsts: firsts
    }
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
  const [firsts, setFirsts] = useState([]); // First of each category to appear
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all the snacks as soon as page loads
  useEffect(() => {
    let mounted = true;
    async function fetchSnacks() {
      if (mounted) {
        try {
          const fetchedSnacks = await getSortedSnacks();
          setSnacks(fetchedSnacks.snacks);
          setFirsts(fetchedSnacks.firsts);
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
    firsts,
    loading,
    error,
  };

  return <SnackContext.Provider value={value}>{children}</SnackContext.Provider>;
};
