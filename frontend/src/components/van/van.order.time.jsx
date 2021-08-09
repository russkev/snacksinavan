import React from "react";

export default function VanOrderTime({ mainText, titleText, subHeadingText, tagColor, order }) {
  return (
    <section className="countdown">
      <h4>{titleText}</h4>
      <div>
        <div>
          <h2>{mainText}</h2>
          {subHeadingText ? <p>{subHeadingText}</p> : <></>}
        </div>
        <div style={tagColor ? { backgroundColor: tagColor } : {}}></div>
      </div>
      <span className="notice">
        {order.isChanged || order.isCancelled ? (
          <h3>
            <strong>{order.isChanged ? "Changed" : "-- Cancelled --"}</strong>
          </h3>
        ) : (
          <></>
        )}
      </span>
    </section>
  );
}
