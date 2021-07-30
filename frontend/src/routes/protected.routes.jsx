import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";
import useLogin from "../hooks/useLogin";

/**
 * Routes that should only be accessible when user is logged in
 */
export function LoggedInRoute({ children, ...rest }) {
  const { isAuthenticated } = useUser();
  const { redirectFromPath } = useLogin()

  if (isAuthenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <>
        <Route {...rest}>
          <Redirect push to={redirectFromPath} />
        </Route>
      </>
    );
  }
}

/**
 * Routes that should only be accessible when user is NOT logged in
 */
export function LoggedOutRoute({ children, from, ...rest }) {
  const { isAuthenticated } = useUser();
  const { redirectFromPath } = useLogin()

  if (!isAuthenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route {...rest}>
        <Redirect push to={redirectFromPath} />
      </Route>
    );
  }
}
