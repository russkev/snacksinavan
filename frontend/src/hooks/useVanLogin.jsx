import { useState } from "react";
import VanAPI from "../VanAPI";
import useVanUser from "../hooks/useVanUser";
import useVanOrders from "./useVanOrders";
import useSnackbar from "./useSnackbar";

async function postVanLogin(vanName, password) {
  const body = {
    vanName: vanName,
    password: password,
  };
  try {
    const result = await VanAPI.post("/api/van/login", body);
    const data = result.data;
    return data;
  } catch (error) {
    return error.response;
  }
}

export default function useVanLogin() {
  const [vanName, setVanName] = useState("");
  const [password, setPassword] = useState("");
  const [vanLoginLoading, setVanLoginLoading] = useState(false);
  const { handleSnackbarMessage } = useSnackbar();
  const { handleVanAuthenticate } = useVanUser();
  const { connectVanSocket } = useVanOrders();

  const handleLoginSubmit = async (event, inVanName, inPassword) => {
    setVanLoginLoading(true)
    event.preventDefault();
    try {
      const result =
        inVanName && inPassword
          ? await postVanLogin(inVanName, inPassword)
          : await postVanLogin(vanName, password);
      const isAuthenticated = handleVanAuthenticate(result);
      if (isAuthenticated) {
        handleSnackbarMessage("Login successful", true);
        connectVanSocket(result.vanName, result.token);
        setVanLoginLoading(false)
        return true;
      } else {
        handleSnackbarMessage("Password and Van Name combination are invalid", false);
        setVanLoginLoading(false)
        return false;
      }
    } catch (err) {
      handleSnackbarMessage("Server Failure", false);
      setVanLoginLoading(false)
      return false;
    }
  };

  const onVanNameChange = (event) => {
    setVanName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onDemoLogin = (event) => {
    handleLoginSubmit(event, "Thelma", "password");
  };

  return {
    vanName,
    onVanNameChange,
    password,
    onPasswordChange,
    // error,
    handleLoginSubmit,
    onDemoLogin,
    vanLoginLoading,
  };
}
