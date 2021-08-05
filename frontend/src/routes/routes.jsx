import React from "react";
import { Switch, Route } from "react-router-dom";
import MenuCart from "../pages/menu.cart";
import Home from "../pages/home";
import Signup from "../pages/signup";
import Login from "../pages/login";
import MyInfo from "../pages/my.info";

import { LoggedInRoute, LoggedOutRoute } from "./protected.routes";
import LoginModal from "../components/login.modal";
import Orders from "../pages/orders";
import OrderDetails from "../pages/order.details";
import NotFound from "../pages/not.found";
import MainNav from "../components/navigation/main.nav";

export const availability = {
  ALL: 0,
  LOGGED_IN_ONLY: 1,
  LOGGED_OUT_ONLY: 2,
};

/**
 * The list of paths in the whole site.
 * All paths should be added here and the map function will deal with them appropriately
 */
const Routes = {
  HOME: {
    path: "/",
    component: Home,
    access: availability.ALL,
  },
  SNACKS_MENU: {
    path: "/menu",
    component: MenuCart,
    access: availability.ALL,
  },
  SIGNUP: {
    path: "/signup",
    component: Signup,
    access: availability.LOGGED_OUT_ONLY,
  },
  LOGIN: {
    path: "/login",
    component: Login,
    access: availability.LOGGED_OUT_ONLY,
  },
  MY_INFO: {
    path: "/info",
    component: MyInfo,
    access: availability.LOGGED_IN_ONLY,
  },
  CUSTOMER_ORDERS: {
    path: "/customer/orders",
    component: Orders,
    access: availability.LOGGED_IN_ONLY,
  },
  CUSTOM_ORDER: {
    path: "/customer/orders/:id",
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
        {Object.keys(Routes).map((routeKey, i) => {
          const route = Routes[routeKey];
          if (route.access === availability.LOGGED_IN_ONLY) {
            return (
              <LoggedInRoute key={routeKey} exact path={route.path}>
                {/* <MainNav /> */}
                {route.component()}
              </LoggedInRoute>
            );
          } else if (route.access === availability.LOGGED_OUT_ONLY) {
            return (
              <LoggedOutRoute key={routeKey} exact path={route.path}>
                {/* <MainNav /> */}
                {route.component()}
              </LoggedOutRoute>
            );
          } else {
            return (
              <Route key={routeKey} exact path={route.path}>
                {/* <MainNav /> */}
                {route.component()}
              </Route>
            );
          }
        })}
        <Route path="/van" />
        <Route>
          {/* <MainNav /> */}
          <NotFound />
        </Route>
      </Switch>
      <LoginModal />
    </>
  );
}

export default Routes;
