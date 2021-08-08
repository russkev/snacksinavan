import React from "react";
import LoadingIcon from "../media/loading.icon";
import LogoIcon from "../media/logo.icon";

export default function LoadingLogo({ isLoading, errorMessage }) {
  if (errorMessage) {
    return (
      <div className="loading-logo">
        <div>
          <svg viewBox="0 0 500 500" className="logo">
            <LogoIcon />
          </svg>
          <p>Something went wrong: {errorMessage}</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="loading-logo">
        <div>
          <svg viewBox="0 0 100 100" className="circle">
            <LoadingIcon />
          </svg>
          <svg viewBox="0 0 500 500" className="logo">
            <LogoIcon />
          </svg>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
