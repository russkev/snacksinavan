import { useState, useEffect } from "react";
import API from "../API";


async function getVans() {
  try {
    const response = await API.get("/api/van/all");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function useVans() {
  const [loading, setLoading] = useState(true);
  const [vans, setVans] = useState([]);
  const [error, setError] = useState(null);

  function vanFromName(vanName) {
    return vans.find((van) => van.vanName === vanName);
  }

  useEffect(() => {
    let mounted = true

    const fetchVans = async () => {
      try {
        const fetchedVans = await getVans()
        setVans(fetchedVans)
        setLoading(false)
      } catch(error) {
        console.log(error)
        setError(error)
        setLoading(false)
      }
    }

    if (mounted) {
      fetchVans()
    }
    return function cleanup() {
      setVans([])
      mounted = false;
    }
  }, []);

  return {
    loading,
    vans,
    error,
    vanFromName
  };
}