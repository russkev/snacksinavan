import { useState, useContext } from "react";
import API from "../API";
import useUser from "./useUser";
import { LoginContext } from "../contexts/login.context"
import useOrders from "./useOrders"

/**
 * Send login information to the backend
 * @param username User's email
 * @param password
 * @returns The data if login was successful
 */
export async function postLogin(username, password) {
  const body = {
    username: username,
    password: password,
  };
  try {
    const result = await API.post("/api/auth/login", body);
    const data = result.data;
    return data;
  } catch (error) {
    return error.response;
  }
}

/**
 * Hook for login related things
 */
export default function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const { handleAuthenticate } = useUser();
  const { loginIsOpen, setLoginIsOpen, redirectToPath, redirectFromPath, toggleLoginIsOpen } = useContext(
    LoginContext
  );
  const {getSocketConnection} = useOrders();

  const LOGIN_FAILURE_MESSAGE = "Invalid username or password";
  const SERVER_ERROR_MESSAGE = "Something went wrong with the server";

  const handleLoginSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    try {
      const result = await postLogin(username, password);
      const isAuthenticated = handleAuthenticate(result);
      if (isAuthenticated) {
        getSocketConnection(username, result.token, true);
        return true
      } else {
        setError(LOGIN_FAILURE_MESSAGE);
        return false
      }
    } catch (err) {
      setError(SERVER_ERROR_MESSAGE);
      return false
    } finally {
      setLoading(false)
    }
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return {
    username,
    password,
    error,
    loading,
    loginIsOpen,
    setLoginIsOpen,
    onUsernameChange,
    onPasswordChange,
    handleLoginSubmit,
    toggleLoginIsOpen,
    redirectToPath,
    redirectFromPath,
  };
}
