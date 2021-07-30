import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import useVanUser from "../hooks/useVanUser";
import VanRoutes from "./van.routes";
import { VanLoginContext } from "../contexts/van.login.context";

export function VanLoggedInRoute({ children, ...rest }) {
  const { vanIsAuthenticated } = useVanUser();
  
  if (vanIsAuthenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route {...rest}>
        <Redirect push to={VanRoutes.LOGIN.path} />
      </Route>
    );
  }
}

export function VanLoggedOutRoute({ children, ...rest }) {
  const { vanIsAuthenticated } = useVanUser();
  const { vanRedirectPath } = useContext(VanLoginContext);

  if (!vanIsAuthenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route {...rest}>
        <Redirect push to={vanRedirectPath} />
      </Route>
    );
  }
}
