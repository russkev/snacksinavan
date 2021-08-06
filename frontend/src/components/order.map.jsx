import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const lib = ["places"];

export default function OrderMap({ order }) {
  const zoom = 14;
  const location = { lat: order.van.latitude, lng: order.van.longitude };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
        {!order.isCompleted ? (
          <GoogleMap mapContainerClassName="order-map" zoom={zoom} center={location}>
            <Marker
              position={location}
              icon={{
                path: "M24 9C24 11.3051 23.1334 13.4077 21.7083 15C20.0604 16.8412 16 28 15 30C14 28 9.64996 16.6963 8 14.6573C6.65889 13 6 11.1433 6 9C6 4.02944 10.0294 0 15 0C19.9706 0 24 4.02944 24 9Z",
                fillColor: "#FF740F",
                strokeColor: "white",
                fillOpacity: 1,
                strokeWeight: 1,
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )}
      </LoadScript>
      <h4>{`Van: ${order.van.vanName}`}</h4>
      <div className="info-description">
        <span>{order.van.locationDescription}</span>
      </div>
      {!order.isCompleted ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
          className="primary button soft-shadow"
        >
          Open in Maps
        </a>
      ) : (
        <></>
      )}
    </>
  );
}
