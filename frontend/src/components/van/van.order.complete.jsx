import React from "react"
import ButtonLoading from "../../media/button.loading";

export default function VanOrderComplete({label, isClicked, setComplete}) {
  return (
    <section className="complete">
      {isClicked ? (
        <svg viewBox="0 0 24 24">
          <ButtonLoading />
        </svg>
      ) : (
        <button onClick={setComplete}>{label}</button>
      )}
    </section>
  );
}