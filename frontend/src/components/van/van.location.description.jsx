import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";
import InputContainer from "../input.container"

export default function VanLocationDescription() {
  const {
    currentDescription,
    onDescriptionChange,
  } = useVanMyVan()

  return (
    <InputContainer label="Description" value={currentDescription}>
      <textarea
        type="text"
        id="van-location-description"
        placeholder="Description"
        value={currentDescription}
        onChange={onDescriptionChange}
        rows={3}
      />
    </InputContainer>
  )
}
