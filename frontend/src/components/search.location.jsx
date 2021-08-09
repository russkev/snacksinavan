import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "../styling/address.search.css";
import "../styling/input.css";
import InputContainer from "./input.container";
import UseMyLocationIcon from "../media/use.my.location.icon";

export default function SearchLocation({ setCurrentLocation, title, columns }) {
  const [autocomplete, setAutocomplete] = useState();

  const onLoad = (currAutocomplete) => {
    setAutocomplete(currAutocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const newPosition = {
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng(),
      };
      setCurrentLocation(newPosition);
    } else {
      console.log("Autocomplete is not loaded yet");
    }
  };

  const onUseLocationClick = (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition((userPosition) => {
      const newPosition = {
        lat: Number(userPosition.coords.latitude.toFixed(4)),
        lng: Number(userPosition.coords.longitude.toFixed(4)),
      };
      setCurrentLocation(newPosition);
    });
  };

  return (
    <div className={`address-search ${columns ? "columns" : ""}`}>
      <div>
        {title ? <h4>{title}</h4> : <></>}
        <InputContainer label="Search" value={true}>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input type="text" />
          </Autocomplete>
        </InputContainer>
      </div>
      <button onClick={onUseLocationClick} className="icon-button use-my-location">
        <div>
          Use my location
          <svg viewBox="0 0 24 24">
            <UseMyLocationIcon />
          </svg>
        </div>
      </button>
    </div>
  );
}
