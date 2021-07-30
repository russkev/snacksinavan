import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanSubmitChanges(props) {
  const { handleLocationSubmit, locationIsChanged, onLocationCancel } = useVanMyVan();

  const handleLocationSubmitAndAlert = (event) => {
    handleLocationSubmit(event).then(() => {
        props.showSnackbar();
    });
  };
  return (
    <div className="my-van-submit-buttons-container">
      <div className="submit-buttons my-van-submit-buttons">
        <button
          className={locationIsChanged ? "submit-button" : "submit-button greyed-out"}
          type="button"
          onClick={handleLocationSubmitAndAlert}
          disabled={!locationIsChanged}
        >
          Confirm
        </button>
        <button
          className={
            locationIsChanged
              ? "de-emphasised border submit-button"
              : "de-emphasised border submit-button greyed-out"
          }
          type="button"
          onClick={onLocationCancel}
          disabled={!locationIsChanged}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
