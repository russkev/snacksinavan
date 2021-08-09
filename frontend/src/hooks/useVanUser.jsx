import { useContext } from "react";
import { VanUserContext } from "../contexts/van.user.context";


// Google maps API help from 
// https://medium.com/@allynak/how-to-use-google-map-api-in-react-app-edb59f64ac9d

export default function useVanUser() {
  const {
    vanName,
    setVanName,
    vanIsAuthenticated,
    setVanIsAuthenticated,
    updateVan,
    vanDetails,
    resetVanDetails,
    vanToken,
    setVanToken,
    initialLoginLoading,
  } = useContext(VanUserContext);

  /**
   * Authentication
   * ----------------------------------------------------------------------------------------------
   */
  const handleVanAuthenticate = (responseData) => {
    if ("token" in responseData) {
      setVanName(responseData.vanName);
      setVanToken(responseData.token);
      setVanIsAuthenticated(true);
      localStorage.setItem("vanToken", responseData.token);
      localStorage.setItem("vanName", responseData.vanName);
      return true;
    } else {
      return false;
    }
  };

  return {
    vanName,
    vanIsAuthenticated,
    setVanIsAuthenticated,
    handleVanAuthenticate,
    updateVan,
    setVanName,
    vanDetails,
    resetVanDetails,
    vanToken,
    initialLoginLoading,
  };
}
