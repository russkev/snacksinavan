import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function SearchLocation({ setCurrentLocation }) {
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
    <div className="my-van-address-search">
      <fieldset className="search-element-fieldset">
        <legend className="search-element-legend">Search</legend>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          className="my-van-address-search-input"
        >
          <input type="text" />
        </Autocomplete>
        <div />
      </fieldset>
        <button onClick={onUseLocationClick} className="icon-button use-my-location">
          Use my location
          <span className="material-icons-outlined margin-left-small">my_location</span>
        </button>
    </div>
  );
}
