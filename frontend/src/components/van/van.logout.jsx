import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanLogout() {
  const { logoutVan } = useVanMyVan()

  const handleLogout = (event) => {
    event.preventDefault();
    logoutVan();
  };

  return (
    <div>
      <h4>Account</h4>
      <button className="warning-color full-width" onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
