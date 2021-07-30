import React from "react";
import useUser from "../../hooks/useUser"


/**
 * @returns Button component to logout page
 */
export default function Logout() {
  const { logoutUser, isAuthenticated } = useUser();

  
  // Should only be visible if the user is logged in
  if (isAuthenticated) {
    return <div className="nav-logout" onClick={logoutUser}>Logout</div>
  } else {
    return <></>;
  }
}