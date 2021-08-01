import React from "react";
import ChooseVanButton from "../components/choose.van.button";
import "../styling/van.card.css"

export default function VanCard(props){
  let distance = Math.floor(props.dist)
  return (
      <div className="van-card" id={props.van.vanName}>
        <div>
          <h2>{props.van.vanName}</h2>
          {distance < 1000 ? <h4>{distance}m</h4> : <h4>{(distance / 1000).toFixed(1)}km</h4>}
        </div>
        <div>
          <p>{props.van.locationDescription}</p>
          <ChooseVanButton van={props.van} />
        </div>
      </div>
  );
}