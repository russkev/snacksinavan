import React from "react";

export default function InfoCard(props){
  return(
  <div className="info-card-holder">
    <div className="info-card">
      <div className="info-card-heading">
        <h4>{props.heading}</h4>
      </div>
      <div>{props.children}</div>
    </div>
  </div>
  )
}