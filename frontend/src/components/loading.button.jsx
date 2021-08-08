import React from "react"
import ButtonLoading from "../media/button.loading";

export default function LoadingButton({isLoading, children}) {
  return (
    <div className="load-button complete">
      {isLoading ? (
        <svg viewBox="0 0 24 24">
          <ButtonLoading />
        </svg>
      ) : children}
    </div>
  );
}