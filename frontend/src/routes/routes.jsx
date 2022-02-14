import React from "react";
import { Switch, Route } from "react-router-dom";
import MenuCart from "../pages/menu.cart";
import ChooseVan from "../pages/choose.van";
import Signup from "../pages/signup";
import Login from "../pages/login";
import MyInfo from "../pages/my.info";
import ChooseApp from "../pages/choose.app";

import { LoggedInRoute, LoggedOutRoute } from "./protected.routes";
import LoginModal from "../components/login.modal";
import Orders from "../pages/orders";
import OrderDetails from "../pages/order.details";
import NotFound from "../pages/not.found";
import MainNav from "../components/navigation/main.nav";
import { Snackbar } from "../components/snackbar";

export const availability = {
  ALL: 0,
  LOGGED_IN_ONLY: 1,
  LOGGED_OUT_ONLY: 2,
};

const CUSTOMER_PREFIX = "/customer"

/**
 * The list of paths in the whole site.
 * All paths should be added here and the map function will deal with them appropriately
 */
const Routes = {
  HOME: {
    path: "/",
    component: ChooseApp,
    access: availability.ALL,
  },
  VAN_CHOICE: {
    path: CUSTOMER_PREFIX + "/chooseVan",
    component: ChooseVan,
    access: availability.ALL,
  },
  SNACKS_MENU: {
    path: CUSTOMER_PREFIX + "/menu",
    component: MenuCart,
    access: availability.ALL,
  },
  SIGNUP: {
    path: CUSTOMER_PREFIX + "/signup",
    component: Signup,
    access: availability.LOGGED_OUT_ONLY,
  },
  LOGIN: {
    path: CUSTOMER_PREFIX + "/login",
    component: Login,
    access: availability.LOGGED_OUT_ONLY,
  },
  MY_INFO: {
    path: CUSTOMER_PREFIX + "/info",
    component: MyInfo,
    access: availability.LOGGED_IN_ONLY,
  },
  CUSTOMER_ORDERS: {
    path: CUSTOMER_PREFIX + "/orders",
    component: Orders,
    access: availability.LOGGED_IN_ONLY,
  },
  CUSTOM_ORDER: {
    path: CUSTOMER_PREFIX + "/orders/:id",
    component: OrderDetails,
    access: availability.LOGGED_IN_ONLY,
  },
};

export function getLoggedInOnlyPaths() {
  let list = [];
  for (const routeKey in Routes) {
    const route = Routes[routeKey];
    if (route.access === availability.LOGGED_IN_ONLY) {
      list = [...list, route.path];
    }
  }
  return list;
}

export function getLoggedOutOnlyPaths() {
  let list = [];
  for (const routeKey in Routes) {
    const route = Routes[routeKey];
    if (route.access === availability.LOGGED_OUT_ONLY) {
      list = [...list, route.path];
    }
  }
  return list;
}

export function RoutesMap() {
  return (
    <>
      <MainNav />
      <Switch>
        {Object.keys(Routes).map((routeKey) => {
          const route = Routes[routeKey];
          if (route.access === availability.LOGGED_IN_ONLY) {
            return (
              <LoggedInRoute key={routeKey} exact path={route.path}>
                {route.component()}
                <Snackbar />
              </LoggedInRoute>
            );
          } else if (route.access === availability.LOGGED_OUT_ONLY) {
            return (
              <LoggedOutRoute key={routeKey} exact path={route.path}>
                {route.component()}
                <Snackbar />
              </LoggedOutRoute>
            );
          } else {
            return (
              <Route key={routeKey} exact path={route.path}>
                {route.component()}
                <Snackbar />
              </Route>
            );
          }
        })}
        <Route path="/van" />
        <Route>
          <NotFound />
          <Snackbar />
        </Route>
      </Switch>
      <LoginModal />
    </>
  );
}

export default Routes;
