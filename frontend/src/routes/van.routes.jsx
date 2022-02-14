import React from "react";
import { Switch, Route } from "react-router-dom";
import VanLogin from "../pages/van.login";
import VanMyVan from "../pages/van.my.van";
import VanOrders from "../pages/van.orders";
import VanOrderHistory from "../pages/van.orderHistory";
import VanFulfilledOrders from "../pages/van.fulfilledOrders";
import { VanLoggedInRoute, VanLoggedOutRoute  } from "./protectedVanRoutes";
import VanMainNav from "../components/van_navigation/van.main.nav"
import { VanMyVanContextProvider } from "../contexts/van.my.van.context";
import { Snackbar } from "../components/snackbar";

const availability = {
  ALL: 0,
  LOGGED_IN_ONLY: 1,
  LOGGED_OUT_ONLY: 2,
};

const VAN_PREFIX = "/van"

const VanRoutes = {
  LOGIN: {
    path: VAN_PREFIX,
    component: VanLogin,
    access: availability.LOGGED_OUT_ONLY,
  },
  MY_VAN: {
    path: VAN_PREFIX + "/myVan",
    component: () => (
      <VanMyVanContextProvider>
        <VanMyVan />
      </VanMyVanContextProvider>
    ),
    access: availability.LOGGED_IN_ONLY,
  },
  ORDERS: {
    path: VAN_PREFIX + "/orders",
    component: VanOrders,
    access: availability.LOGGED_IN_ONLY,
  },
  FULFILLED: {
    path: VAN_PREFIX + "/fulfilled",
    component: VanFulfilledOrders,
    access: availability.LOGGED_IN_ONLY,
  },
  PAST_ORDERS: {
    path: VAN_PREFIX + "/pastOrders",
    component: VanOrderHistory,
    access: availability.LOGGED_IN_ONLY,
  },
};


export function VanRoutesMap() {
  return (
    <>
      <Switch>
        {Object.keys(VanRoutes).map((routeKey, i) => {
          const route = VanRoutes[routeKey];
          if (route.access === availability.LOGGED_IN_ONLY) {
              return (
                <VanLoggedInRoute key={routeKey} exact path={route.path}>
                  <VanMainNav />
                  {route.component()}
                  <Snackbar />
                </VanLoggedInRoute>
              );
          }
          else if (route.access === availability.LOGGED_OUT_ONLY) {
              return (
                <VanLoggedOutRoute key={routeKey} exact path={route.path}>
                  {route.component()}
                  <Snackbar />
                </VanLoggedOutRoute>
              );
          }
          else {
              return (
                <Route key={routeKey} exact path={route.path}>
                  {route.component()}
                  <Snackbar />
                </Route>
              );
          }
        })}
      </Switch>
    </>
  )
}

export default VanRoutes;