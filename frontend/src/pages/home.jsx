import React, { useState } from "react";
import useVans from "../hooks/useVans";
import VanCard from "../components/van.card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchLocation from "../components/search.location";
import haversine from "haversine-distance";
import "../styling/home.css";
import "../styling/customer.css";

const lib = ["places"];

async function selectVan(vanName) {
  let vanCards = document.getElementsByClassName("van-card");
  Array.from(vanCards).forEach((vanCard) => {
    vanCard.classList.remove("highlighted");
  })
  var vanCard = document.getElementById(vanName);
  vanCard.classList.add("highlighted");
  vanCard.scrollIntoView();
}


export default function Home() {
  const { loading, vans, error } = useVans();
  const [location, setLocation] = useState({ lat: -37.81494, lng: 144.96867 });
  const zoom = 12;
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  const sortedVans = vans.sort((vanA, vanB) => {
    var distA =
      Math.pow(vanA.latitude - location.lat, 2) + Math.pow(vanA.longitude - location.lng, 2);
    var distB =
      Math.pow(vanB.latitude - location.lat, 2) + Math.pow(vanB.longitude - location.lng, 2);
    return distA - distB;
  });
  const closestVans = sortedVans.slice(0, 5);

  return (
    <div className="container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
        <div className="split">
          <section>
            <div>
              <h1>Find a van</h1>
              <SearchLocation setCurrentLocation={setLocation} />
              <div className="van-list">
                {closestVans.map((van) => (
                  <VanCard
                    key={van.vanName}
                    van={van}
                    dist={haversine(location, { lat: van.latitude, lng: van.longitude })}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="map">
            <GoogleMap
              zoom={zoom}
              center={location}
              mapContainerClassName="map-main"
              options={{mapTypeControl: false}}
            >
              {closestVans.map((van, index) => {
                return (
                  <Marker
                    key={van.vanName}
                    label={van.vanName}
                    position={{ lat: van.latitude, lng: van.longitude }}
                    onClick={() => selectVan(van.vanName)}
                    icon={{
                      path: "M24 9C24 11.3051 23.1334 13.4077 21.7083 15C20.0604 16.8412 16 28 15 30C14 28 9.64996 16.6963 8 14.6573C6.65889 13 6 11.1433 6 9C6 4.02944 10.0294 0 15 0C19.9706 0 24 4.02944 24 9Z",
                      fillColor: "#FF740F",
                      strokeColor: "white",
                      fillOpacity: 1,
                      strokeWeight: 1,
                    }}
                  />
                );
              })}
            </GoogleMap>
          </section>
        </div>
      </LoadScript>
    </div>
  );
}