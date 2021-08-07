import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanSubmitChanges({showSnackbar}) {
  const { handleLocationSubmit, locationIsChanged, onLocationCancel } = useVanMyVan();

  const handleLocationSubmitAndAlert = (event) => {
    handleLocationSubmit(event).then(() => {
        showSnackbar();
    });
  };
  return (
    <div className="submit">
      <button
        className={locationIsChanged ? "primary soft-shadow" : "primary soft-shadow disabled"}
        type="button"
        onClick={handleLocationSubmitAndAlert}
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
