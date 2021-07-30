import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Routes from "../../routes/routes";

/**
 * @returns Button component to logout page
 */
export default function SignupButton() {
    
  const { isAuthenticated } = useUser();

  // Should only be visible if the user is not logged in
  if (isAuthenticated) {
    return <></>;
  } else {
    return <Link to={Routes.SIGNUP.path}>Signup</Link>;
  }
}
