import React from "react";
import { Link } from "react-router-dom";

export default function SelectVanButton(props) {
  if (props.isAVan){
    return (
      <Link
        to={{
          pathname: "/",
        }}
        className="please-select-van-button">
          Change Van?
      </Link>
    )
  }else {
    return (
      <Link
          to={{
            pathname: "/",
          }}
          className="please-select-van-button no-van">
            Select a Van!
      </Link>
    )
  }
}