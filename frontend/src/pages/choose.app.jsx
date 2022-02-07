import React from "react";
import Routes from "../routes/routes";
import VanRoutes from "../routes/van.routes";
import { Link } from "react-router-dom";
import LogoIcon from "../media/logo.icon";
import "../styling/choose.app.css";
import LogoText from "../components/logo.text";

export default function ChooseApp() {
  return (
    <>
      <div className="choose-app full-screen">
        <aside>
          <section>
            <svg viewBox="0 0 500 500" className="logo">
              <LogoIcon />
            </svg>
            <LogoText />
          </section>
        </aside>
        <nav className="container">
          <section>
            <Link className="big orange-color button" to={Routes.VAN_CHOICE.path}>
              Customer App
            </Link>
            <Link className="big yellow-color button" to={VanRoutes.LOGIN.path}>
              Vendor App
            </Link>
          </section>
            <div className="blank-bottom"></div>
        </nav>
      </div>
    </>
  );
}


