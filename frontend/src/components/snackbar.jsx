import React from "react";
import ErrorIcon from "../media/error.icon";
import SuccessIcon from "../media/success.icon";
import CloseIcon from "../media/close.icon";
import useSnackbar from "../hooks/useSnackbar";

export const SnackContainer = ({ isSuccess, children }) => {
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
          backgroundColor: "var(--warning)",
        }}
      >
        {children}
      </div>
    );
  }
};

export const Snackbar = () => {
  const { snackbarMessage, snackbarIsSuccess, handleHideSnackbar } = useSnackbar();
  const Icon = snackbarIsSuccess ? () => <SuccessIcon /> : () => <ErrorIcon />;

  return (
    <>
      <SnackContainer isSuccess={snackbarIsSuccess}>
        <section>
          <svg viewBox="0 0 24 24" fill="var(--background-white)">
            <Icon />
          </svg>
        </section>
        <section>
          <p>{snackbarMessage}</p>
        </section>
        <section>
          <button className="close" onClick={handleHideSnackbar}>
            <svg viewBox="0 0 24 24" className="close">
              <CloseIcon />
            </svg>
          </button>
        </section>
      </SnackContainer>
    </>
  );
};
