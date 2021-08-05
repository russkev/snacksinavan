import React from "react";
import ErrorIcon from "../media/error.icon";
import SuccessIcon from "../media/success.icon";
import CloseIcon from "../media/close.icon";

export const handleShowSnackbar = () => {
  const snackbarElement = document.getElementById("snackbar");
  if (snackbarElement) {
    snackbarElement.classList.add("show");
    setTimeout(() => {
      handleHideSnackbar();
    }, 3500);
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

const SnackContainer = ({ isSuccess, children }) => {
  if (isSuccess) {
    return (
      <div
        id="snackbar"
        style={{
          color: "var(--success)",
          borderColor: "var(--success)",
          backgroundColor: "var(--success)",
        }}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        id="snackbar"
        style={{
          color: "var(--warning)",
          borderColor: "var(--warning)",
          backgroundColor: "var(--warning)"
        }}
      >
        {children}
      </div>
    );
  }
};

export const Snackbar = ({ message, isSuccess }) => {
  const Icon = isSuccess ? () => <SuccessIcon /> : () => <ErrorIcon />;

  return (
    <>
      <SnackContainer isSuccess={isSuccess}>
        {/* <div id="snackbar" style={{ color:  "var(--success)", borderColor:  "var(--success)" }}> */}
        <section>
          <svg viewBox="0 0 24 24" fill="var(--background-white)">
            <Icon />
          </svg>
        </section>
        <section>
          <p>{message}</p>
        </section>
        <section>
          <button className="close" onClick={handleHideSnackbar}>
            <svg viewBox="0 0 24 24" className="close">
              <CloseIcon />
            </svg>
          </button>
        </section>
        {/* </div> */}
      </SnackContainer>
    </>
  );
};
