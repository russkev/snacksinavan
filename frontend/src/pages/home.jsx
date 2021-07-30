import React, {useState} from "react";
import useVans from "../hooks/useVans";
import VanCard from "../components/van.card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchLocation from "../components/search.location";
import haversine from 'haversine-distance'
const lib = ["places"];

export default function Home() {
  const { loading, vans, error } = useVans();
  const [location, setLocation] = useState({lat: -37.81494, lng: 144.96867});
  const zoom = 13
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  const sortedVans = vans.sort((vanA, vanB) => {
  var distA = Math.pow((vanA.latitude - location.lat), 2) + Math.pow((vanA.longitude - location.lng), 2);
  var distB = Math.pow((vanB.latitude - location.lat), 2) + Math.pow((vanB.longitude - location.lng), 2);
  return distA - distB;
  });
  const closestVans = sortedVans.slice(0, 5)
  return (
    <div className="home-container">
      <h5 id="main-map-heading">Find a Van</h5>
      <hr />
      <div className="home-split">
        <div className="van-map-container">
          {/* <h5 className="van-list-container-heading">Search on the Map:</h5> */}
          <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
            <SearchLocation setCurrentLocation={setLocation} />
            <div className="vertical-gap-small" />
            <GoogleMap mapContainerClassName="home-map" zoom={zoom} center={location}>
              {closestVans.map((van) => {
                return (
                  <Marker
                    key={van.vanName}
                    label={van.vanName}
                    position={{ lat: van.latitude, lng: van.longitude }}
                    onClick={() => selectVan(van.vanName)}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="van-list-container">
          <h5 className="van-list-container-heading">The 5 Closest Vans:</h5>
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
      </div>
    </div>
  );
}


async function selectVan(vanName){
  const delay = ms => new Promise(res => setTimeout(res, ms));
  var vanCard = document.getElementById(vanName);
  vanCard.classList.add("highlighted");
  vanCard.scrollIntoView();
  await delay(5000);
  vanCard.classList.remove("highlighted");
}