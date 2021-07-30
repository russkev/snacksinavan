import React from "react";
import { Switch, Route } from "react-router-dom";
import VanLogin from "../pages/van.login";
import VanMyVan from "../pages/van.my.van";
import VanOrders from "../pages/van.orders";
import VanOrderHistory from "../pages/van.orderHistory";
import VanFulfilledOrders from "../pages/van.fulfilledOrders";
import { availability } from "./routes";
import { VanLoggedInRoute, VanLoggedOutRoute  } from "./protectedVanRoutes";
import VanMainNav from "../components/van_navigation/van.main.nav"
import { VanMyVanContextProvider } from "../contexts/van.my.van.context";


const VanRoutes = {
  LOGIN: {
    path: "/van",
    component: VanLogin,
    access: availability.LOGGED_OUT_ONLY,
  },
  MY_VAN: {
    path: "/van/myVan",
    component: 
      () => (<VanMyVanContextProvider><VanMyVan /></VanMyVanContextProvider>),
    access: availability.LOGGED_IN_ONLY,
  },
  ORDERS: {
    path: "/van/orders",
    component: VanOrders,
    access: availability.LOGGED_IN_ONLY,
  },
  FULFILLED: {
    path: "/van/fulfilled",
    component: VanFulfilledOrders,
    access: availability.LOGGED_IN_ONLY,
  },
  PAST_ORDERS: {
    path: "/van/pastOrders",
    component: VanOrderHistory,
    access: availability.LOGGED_IN_ONLY
  }
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
                </VanLoggedInRoute>
              );
          }
          else if (route.access === availability.LOGGED_OUT_ONLY) {
              return (
                <VanLoggedOutRoute key={routeKey} exact path={route.path}>
                  {route.component()}
                </VanLoggedOutRoute>
              );
          }
          else {
              return (
                <Route key={routeKey} exact path={route.path}>
                  {route.component()}
                </Route>
              );
          }
        })}
      </Switch>
    </>
  )
}

export default VanRoutes;