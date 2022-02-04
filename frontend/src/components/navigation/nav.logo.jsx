import React from "react";
import LogoIcon from "../../media/logo.icon";
import Routes from "../../routes/routes";
import { Link } from "react-router-dom";
import LogoText from "../LogoText";

export default function NavLogo() {
  return (
    <div className="nav-logo">
      <Link to={Routes.HOME.path}>
        <svg viewBox="0 0 500 500">
          <LogoIcon />
        </svg>
        <LogoText />
      </Link>
    </div>
  );
}
