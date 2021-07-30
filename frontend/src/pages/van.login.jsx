import React from "react"
import { Redirect } from "react-router-dom";
import useVanLogin from "../hooks/useVanLogin"
import useVanUser from "../hooks/useVanUser"
import VanRoutes from "../routes/van.routes"
import { handleShowSnackbar, Snackbar } from "../components/snackbar";





export default function VanLogin() {
  const { 
    vanName, 
    onVanNameChange, 
    password, 
    onPasswordChange,
    error,
    handleLoginSubmit,
  } = useVanLogin()

  const { vanIsAuthenticated } = useVanUser()

  const handleLoginSubmitAndAlert = (event) => {
    handleLoginSubmit(event).then((result) => {
      if (!result) {
        handleShowSnackbar();
      } 
    })
  }

  if (vanIsAuthenticated) {
    return <Redirect push to={VanRoutes.MY_VAN.path} />
  }
  return (
    <>
      <div className="container">
        <h5>Sign in</h5>
        <form onSubmit={handleLoginSubmitAndAlert}>
          <input
            type="username"
            id="vanName"
            placeholder="Van Name"
            value={vanName}
            onChange={onVanNameChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
          />
          <button type="submit">
            SUBMIT
          </button>
        </form>
      </div>
      <Snackbar message={error} />

    </>   
  )
}