import React from "react";
import ChooseVanButton from "../components/choose.van.button";

export default function VanCard(props){
  let distance = Math.floor(props.dist)
  return (
    <div className="van-card-holder">
      <div className="van-card" id={props.van.vanName}>
        <div className="van-card-heading">
          <h4>{props.van.vanName}:</h4>
          {distance < 1000 ? <h4>{distance}m</h4> : <h4>{(distance / 1000).toFixed(1)}km</h4>}
        </div>
        <div className="van-card-body">
          <p className="van-location-description">{props.van.locationDescription}</p>
          <div className="choose-van-button-container">
            <ChooseVanButton van={props.van} />
          </div>
        </div>
      </div>
    </div>
  );
}