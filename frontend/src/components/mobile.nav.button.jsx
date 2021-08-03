import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileNavButton({ path, icon, name, toggle }) {
  return (
    <NavLink
      onClick={toggle}
      className="nav-button mobile"
      activeClassName="active"
      exact
      to={path}
    >
      <svg viewBox="0 0 24 24">{icon()}</svg>
      {name}
    </NavLink>
  );
}
