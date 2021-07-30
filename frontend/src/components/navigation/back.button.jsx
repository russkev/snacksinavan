import React from "react";
import backButtonIcon from "../../media/back_arrow.svg";
import { Link } from "react-router-dom";

export default function BackButton({ to }) {
  return (
    <Link to={to} className="back-button">
      <img src={backButtonIcon} alt="Back" />
    </Link>
  );
}
