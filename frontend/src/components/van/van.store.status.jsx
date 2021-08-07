import React from "react";
import useVanUser from "../../hooks/useVanUser";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanStoreStatus() {
  const { vanDetails } = useVanUser();
  const { toggleVanReady } = useVanMyVan();

  return (
    <div>
      <h4>Store status</h4>
      <label className="switch">
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
  );
}
