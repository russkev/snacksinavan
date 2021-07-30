import { useState } from "react";
import VanAPI from "../VanAPI";
import useVanUser from "../hooks/useVanUser";
import useVanOrders from "./useVanOrders"

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
  const [error, setError] = useState("")
  const { handleVanAuthenticate } = useVanUser();
  const { connectVanSocket } = useVanOrders();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await postVanLogin(vanName, password);
      const isAuthenticated = handleVanAuthenticate(result);
      if (isAuthenticated) {
        setError("SUCCESS")
        console.log(result)
        connectVanSocket(result.vanName, result.token)
        return true;
      } else {
        setError("Password and Van Name combination are invalid")
        return false;
      }
    } catch (err) {
      setError("Server Failure")
      return false;
    }
  };

  const onVanNameChange = (event) => {
    setVanName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  return {
    vanName,
    onVanNameChange,
    password,
    onPasswordChange,
    error,
    handleLoginSubmit,
  };
}
