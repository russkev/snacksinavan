import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";
import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchLocation from "../search.location";

export default function VanLocation() {
  const { currentLocation, setCurrentLocation, handleMarkerDragEnd } = useVanMyVan();

  return (
    <>
      <SearchLocation setCurrentLocation={setCurrentLocation} />
      <GoogleMap zoom={16} center={currentLocation} mapContainerClassName="van-map">
        <Marker label="You" position={currentLocation} onDragEnd={handleMarkerDragEnd} draggable />
      </GoogleMap>
    </>
  );
}
