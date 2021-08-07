import React from "react";
import { NavLink } from "react-router-dom";
import VanRoutes from "../../routes/van.routes";
import FulfilledIcon from "../../media/fulfilled.icon"
import VanIcon from "../../media/van.icon"
import OrdersClipboardIcon from "../../media/orders.clipboard.icon"
import HistoryIcon from "../../media/history.icon";
import "../../styling/van.nav.css"

export default function VanMainNav() {
  return (
    <nav className="van">
      <ul>
        <li>
          <NavLink
            className="my-van"
            activeClassName="active"
            exact
            to={VanRoutes.MY_VAN.path}
            onClick={(e) => e.target.blur()}
          >
            <svg viewBox="0 0 24 24">
              <VanIcon />
            </svg>
            My Van
          </NavLink>
        </li>
        <li>
          <NavLink
            className="orders"
            activeClassName="active"
            exact
            to={VanRoutes.ORDERS.path}
            onClick={(e) => e.target.blur()}
          >
            <svg viewBox="0 0 24 24">
              <OrdersClipboardIcon />
            </svg>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className="fulfilled"
            activeClassName="active"
            exact
            to={VanRoutes.FULFILLED.path}
            onClick={(e) => e.target.blur()}
          >
            <svg viewBox="0 0 24 24">
              <FulfilledIcon />
            </svg>
            Fulfilled
          </NavLink>
        </li>
        <li>
          <NavLink
            className="past-orders"
            activeClassName="active"
            exact
            to={VanRoutes.PAST_ORDERS.path}
            onClick={(e) => e.target.blur()}
          >
            <svg
              viewBox="0 0 24 24"
            >
              <HistoryIcon />
            </svg>
            Past Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
