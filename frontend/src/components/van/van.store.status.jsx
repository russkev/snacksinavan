import React from "react";
import useVanUser from "../../hooks/useVanUser";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanStoreStatus() {
  const { vanDetails } = useVanUser();
  const { toggleVanReady } = useVanMyVan();

  return (
    <div className="my-van-section">
      <h4 className="my-van-section-title">Store Status</h4>
      <div className="center-content-container">
        <label className="my-van-switch">
          <input
            type="checkbox"
            onChange={toggleVanReady}
            checked={vanDetails.readyForOrders ? vanDetails.readyForOrders : false}
          />
          <div className="my-van-slider round">
            <span className="van-slider-on">Open</span>
            <span className="van-slider-off">Closed</span>
          </div>
        </label>
      </div>
    </div>
  );
}
