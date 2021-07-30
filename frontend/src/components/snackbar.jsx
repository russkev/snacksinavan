import React from "react";

export const handleShowSnackbar = () => {
  const snackbarElement = document.getElementById("snackbar");
  if (snackbarElement) {
    snackbarElement.className = "snackbar-base show-snackbar";
    setTimeout(() => {
      snackbarElement.className = snackbarElement.className.replace("show-", "");
    }, 3500);
  }
};

export const Snackbar = ({ message, isSuccess }) => {
  if (isSuccess) {
    return (
      <div id="snackbar" className="snackbar-base snackbar" style={{ color: "darkgreen", borderColor: "darkgreen" }}>
        {message}
      </div>
    );
  } else {
    return (
      <div id="snackbar" className="snackbar-base snackbar" style={{ color: "darkred", borderColor: "darkred" }}>
        {message}
      </div>
    );
  }
};
