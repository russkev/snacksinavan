import React from "react";
import loading_01 from "../media/loading_01.svg";

export default function Loading({ isLoading }) {
  if (isLoading) {
    return (
      <div className="fill-loading">
        <img src={loading_01} className="loading-circle" alt="loading" />
      </div>
    );
  } else {
    return <></>;
  }
}
