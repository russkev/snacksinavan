import React from "react"
import StarFilledIcon from "../media/star.filled.icon";

export default function Stars({rating}) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= rating) {
          return (
            <span className="star filled" key={i}>
              <svg viewBox="0 0 24 24">
                {" "}
                <StarFilledIcon />{" "}
              </svg>
            </span>
          );
        } else {
          return (
            <span className="star" key={i}>
              <svg viewBox="0 0 24 24">
                {" "}
                <StarFilledIcon />{" "}
              </svg>
            </span>
          );
        }
      })}
    </div>
  );
}