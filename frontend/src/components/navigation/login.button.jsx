import React from "react";
import useUser from "../../hooks/useUser";
import useLogin from "../../hooks/useLogin";

/**
 * @returns Button component to login page
 */
export default function LoginButton() {
  const { isAuthenticated } = useUser();
  const { toggleLoginIsOpen } = useLogin();

  if (isAuthenticated) {
    return <></>;
  } else {
    return (
      <>
        <div className="nav-login" onClick={toggleLoginIsOpen}>Login</div>
      </>
    );
  }
}
