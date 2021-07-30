import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanLogout() {
  const { logoutVan } = useVanMyVan()

  const handleLogout = (event) => {
    event.preventDefault();
    logoutVan();
  };

  return (
    <div className="my-van-section">
      <h4 className="my-van-section-title">Account</h4>
      <div className="center-content-container">
        <button className="submit de-emphasised border" onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
}
