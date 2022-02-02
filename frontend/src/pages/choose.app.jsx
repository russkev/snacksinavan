import React from "react";
import Routes from "../routes/routes";
import VanRoutes from "../routes/van.routes";
import { Link } from "react-router-dom";
import LogoIcon from "../media/logo.icon";
import "../styling/choose.app.css";
import LogoTextBigSnacks from "../media/logo.text.big.snacks";
import LogoTextBigInA from "../media/logo.text.big.in.a";
import LogoTextBigVan from "../media/logo.text.big.van";

export default function ChooseApp() {
  return (
    <>
      <div className="choose-app full-screen">
        <aside>
          <section>
            <svg viewBox="0 0 500 500" className="logo">
              <LogoIcon />
            </svg>
            <div className="logo-text-big">
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
          </section>
        </aside>
        <nav className="container">
          <section>
            <Link className="big orange-color button" to={Routes.VAN_CHOICE.path}>
              Customer App
            </Link>
            <div></div>
            <Link className="big yellow-color button" to={VanRoutes.LOGIN.path}>
              Vendor App
            </Link>
          </section>
        </nav>
      </div>
    </>
  );
}
