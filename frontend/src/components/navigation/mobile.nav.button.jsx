import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileNavButton({ path, icon, name, toggle, className }) {
  
  // Popup menu doesn't work without delay
  const toggleWithDelay = () => setTimeout(() => toggle(), 10)
  
  return (
    <NavLink
      onClick={toggleWithDelay}
      className={className + " square desktop button"}
      activeClassName="active"
      exact
      to={path}
    >
      <svg viewBox="0 0 24 24">{icon()}</svg>
      {name}
    </NavLink>
  );
}
