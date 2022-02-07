import React from "react";
import LogoTextBigSnacks from "../media/logo.text.big.snacks";
import LogoTextBigInA from "../media/logo.text.big.in.a";
import LogoTextBigVan from "../media/logo.text.big.van";

export default function LogoText() {
  return (
    <div className="logo-text">
      <svg viewBox="0 0 275 196">
        <LogoTextBigSnacks />
      </svg>
      <svg viewBox="0 0 275 196">
        <LogoTextBigInA />
      </svg>
      <svg viewBox="0 0 275 196">
        <LogoTextBigVan />
      </svg>
    </div>
  );
}
