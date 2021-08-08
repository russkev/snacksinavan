import React from "react"

export default function VanOrderTime({mainText, titleText, subHeadingText, tagColor}) {
  return (
    <section className="countdown">
      <h4>{titleText}</h4>
      <div>
        <div>
          <h2>{mainText}</h2>
          {subHeadingText ? (
            <p>{subHeadingText}</p>
          ) : <></>}
        </div>
        <div
          style={tagColor ? { backgroundColor: tagColor } : {}}
        ></div>
      </div>
    </section>
  );
}