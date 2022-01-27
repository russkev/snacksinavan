import React from "react";
import { Link } from "react-router-dom";
import BackButtonIcon from "../../media/back.button";

export default function BackButton({ to }) {
  return (
    <Link to={to} className="back-button">
      <svg className="back-button" viewBox="0 0 60 60">
        <BackButtonIcon />
      </svg>
    </Link>
  );
}
