import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import useOrders from "./useOrders";

/**
 * Main user hook. Provides access to various authentication and user related methods.
 * Context used here so that changes are global.
 */
export default function useUser() {
  const {
    username,
    token,
    setUsername,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(UserContext);

  const {
    socket,
  } = useOrders();



  const handleAuthenticate = (responseData) => {
    if ("token" in responseData) {
      setUsername(responseData.username)
      setIsAuthenticated(true);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("username", responseData.username);
      return true
    } else {
      return false
    }
  };

  const logoutUser = () => {
    setTimeout(() => { 
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      setUsername("")
      setIsAuthenticated(false)
      if (socket) {
        socket.disconnect();
      }
    }, 500)
  }

  return {
    username,
    token,
    isAuthenticated,
    handleAuthenticate,
    logoutUser,
  };
}
