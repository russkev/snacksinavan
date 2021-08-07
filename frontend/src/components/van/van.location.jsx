import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";
import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchLocation from "../search.location";

export default function VanLocation() {
  const { currentLocation, setCurrentLocation, handleMarkerDragEnd } = useVanMyVan();

  return (
    <>
      {!window.matchMedia("screen and (max-width: 850px)").matches ? (
        <SearchLocation setCurrentLocation={setCurrentLocation} title="Location" columns/>
      ) : (
        <SearchLocation setCurrentLocation={setCurrentLocation} title="Location" />
      )}
      <GoogleMap zoom={16} center={currentLocation} mapContainerClassName="van-map">
        <Marker label="You" position={currentLocation} onDragEnd={handleMarkerDragEnd} draggable />
      </GoogleMap>
    </>
  );
}
