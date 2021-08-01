import React from "react";
import "../styling/input.css";

export default function InputContainer({ label, value, children }) {
  return (
    <fieldset>
      <legend style={value ? { padding: "0 0.5rem" } : { padding: 0 }}>
        {value ? label : ""}
      </legend>
      {children}      
    </fieldset>
  );
}