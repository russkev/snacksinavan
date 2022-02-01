import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbar.context";



export default function useSnackbar() {
  const { 
    snackbarMessage, 
    setSnackbarMessage, 
    snackbarIsSuccess, 
    setSnackbarIsSuccess,
  } = useContext(SnackbarContext);

  const handleShowSnackbar = () => {
    const snackbarElement = document.getElementById("snackbar");
    if (snackbarElement) {
      snackbarElement.classList.add("show");
      setTimeout(() => {
        handleHideSnackbar();
      }, 3500);
      setTimeout(() => {
        setSnackbarMessage("")
      }, 4500);
    }
  };

  const handleHideSnackbar = (event) => {
    const snackbarElement = document.getElementById("snackbar");
    if (snackbarElement && snackbarElement.classList.contains("show")) {
      if (event) {
        event.target.blur();
      }
      snackbarElement.classList.remove("show");
    }
  };

  const handleSnackbarMessage = (message, isSuccess) =>
  {
    setSnackbarIsSuccess(isSuccess);
    setSnackbarMessage(message);
    handleShowSnackbar();
  }

  return {
    handleHideSnackbar,
    snackbarMessage,
    handleSnackbarMessage,
    snackbarIsSuccess,
  };
}