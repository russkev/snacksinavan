import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";

export default function VanLocationDescription() {
  const {
    currentDescription,
    onDescriptionChange,
  } = useVanMyVan()

  return (
    <div className="my-van-section">
      <fieldset className="search-element-fieldset">
        <legend className="search-element-legend">Description</legend>
        <textarea
          rows="3"
          className="my-van-input"
          type="description"
          id="description"
          value={currentDescription}
          onChange={onDescriptionChange}
          />
          </fieldset>
        <div></div>
    </div>
  );
}
