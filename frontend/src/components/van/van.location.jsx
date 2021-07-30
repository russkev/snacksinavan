import React from "react";
import useVanMyVan from "../../hooks/useVanMyVan";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchLocation from "../search.location";
import useVans from "../../hooks/useVans";
import useVanUser from "../../hooks/useVanUser";
import vanIcon from "../../media/material-ui-local-shipping-icon.svg";
const lib = ["places"];

export default function VanLocation() {
  const { currentLocation, setCurrentLocation, handleMarkerDragEnd } = useVanMyVan();
  const { vanName } = useVanUser();
  const { vans } = useVans();
  return (
    <div className="my-van-section my-van-section-map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
        <SearchLocation setCurrentLocation={setCurrentLocation} />
        <div className="vertical-gap-small" />
        <GoogleMap mapContainerClassName="my-van-map" zoom={16} center={currentLocation}>
          <Marker label="You" position={currentLocation} onDragEnd={handleMarkerDragEnd} draggable={true} />
          {vans.reduce((result, van) => {
            if (van.vanName !== vanName) {
              result.push(
                <Marker
                  key={van.vanName}
                  position={{ lat: van.latitude, lng: van.longitude }}
                  icon={{url: vanIcon}}
                />
              );
            }
            return result;
          }, [])}
        </GoogleMap>
        <div className="vertical-gap-small" />
      </LoadScript>
    </div>
  );
}
