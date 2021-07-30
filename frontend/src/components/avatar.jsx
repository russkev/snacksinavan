import React from "react";

/**
 * @param imageUrl The url of the image
 * @param width The width and height of the image
 * @returns An avatar image component
 */
export default function Avatar({ imageUrl, width = "100px", hardRight = false }) {
  if (hardRight) {
    return (
      <div
        className="avatar hard-right"
        style={{
          backgroundImage: `url(${imageUrl})`,
          width: width,
          height: width,
        }}
      />
    );
  } else {
    return (
      <div
        className="avatar"
        style={{
          backgroundImage: `url(${imageUrl})`,
          width: width,
          height: width,
        }}
      />
    );
  }
}
