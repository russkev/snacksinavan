import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanSubmitChanges() {
  const { handleLocationSubmit, locationIsChanged, onLocationCancel } = useVanMyVan();

  return (
    <div className="submit">
      <button
        className={locationIsChanged ? "primary soft-shadow" : "primary soft-shadow disabled"}
        type="button"
        onClick={handleLocationSubmit}
        disabled={!locationIsChanged}
      >
        Confirm changes
      </button>
      <button
        className={locationIsChanged ? "" : "disabled"}
        type="button"
        onClick={onLocationCancel}
        disabled={!locationIsChanged}
      >
        Cancel
      </button>
    </div>
  )
}
