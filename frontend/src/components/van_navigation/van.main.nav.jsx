import React from "react";
import { Link } from "react-router-dom";
import VanRoutes from "../../routes/van.routes";
import {useLocation} from "react-router-dom";

export default function VanMainNav() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="nav van-nav">
      <nav>
        <ul className="nav-list van-nav-list">
          <li>
            <Link className="nav-link" to={VanRoutes.MY_VAN.path}>
              {path.includes(VanRoutes.MY_VAN.path) ? <div className="my-van-bg tab">My Van</div> : <div className="my-van-bg tab minimised">My Van</div>}
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={VanRoutes.ORDERS.path}>
              {path.includes(VanRoutes.ORDERS.path) ? <div className="order-bg tab">Orders</div> : <div className="order-bg tab minimised">Orders</div>}
              
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={VanRoutes.FULFILLED.path}>
              {path.includes(VanRoutes.FULFILLED.path) ? <div className="fulfilled-bg tab">Fulfilled</div> : <div className="fulfilled-bg tab minimised">Fulfilled</div>}
              
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={VanRoutes.PAST_ORDERS.path}>
              {path.includes(VanRoutes.PAST_ORDERS.path) ? <div className="history-bg tab">Past Orders</div> : <div className="history-bg tab minimised">Past Orders</div>}
              
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
