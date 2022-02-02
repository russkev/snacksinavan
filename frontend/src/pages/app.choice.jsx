import React from "react"
import Routes from "../routes/routes"
import VanRoutes from "../routes/van.routes"
import { Link } from "react-router-dom"

export default function AppChoice() {
  return (
    <>
    <div className="signup">
      <div></div>
      <div className="container">
        <Link className="primary button" to={Routes.VAN_CHOICE.path}>
          Customer App
        </Link>
        <Link className="secondary button" to={VanRoutes.LOGIN.path}>
          Vendor App
        </Link>
      </div>
    </div>
    </>
  )
}