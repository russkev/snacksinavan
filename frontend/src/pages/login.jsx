import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useUser from "../hooks/useUser";
import Loading from "../components/loading";
import { handleShowSnackbar, Snackbar } from "../components/snackbar";
import Routes from "../routes/routes";
import InputContainer from "../components/input.container";
import "../styling/login.css";
import "../styling/input.css";
//TODO:
//  MyInfo page loads when not logged in but shouldn't
//  Login window appears on logout

/**
 * @returns Login form component
 */
export default function Login() {
  const {
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    handleLoginSubmit,
    loading,
    error,
    setLoginIsOpen,
    redirectToPath,
  } = useLogin();

  const { isAuthenticated } = useUser();
  const [signupRedirect, setSignupRedirect] = useState(false);

  const handleLoginSubmitAndAlert = (event) => {
    handleLoginSubmit(event).then((result) => {
      if (!result) {
        handleShowSnackbar();
      }
    });
  };

  const handleSignupRedirect = (event) => {
    event.preventDefault();
    setSignupRedirect(true);
    setTimeout(function () {
      setLoginIsOpen(false);
    }, 100);
  };

  if (isAuthenticated) {
    return <Redirect push to={redirectToPath} />;
  } else if (signupRedirect) {
    return <Redirect push to={Routes.SIGNUP.path} />;
  } else {
    return (
      <>
        <div className="login-window">
          <h1>Sign in</h1>
          <button
            type="button"
            className="close"
            onClick={() => setLoginIsOpen(false)}
          >
            &times;
          </button>
          <div>
            <h4>Please enter your details</h4>
            <form onSubmit={handleLoginSubmitAndAlert}>
              <InputContainer label="Username" value={username}>
                <input
                  type="email"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={onUsernameChange}
                />
              </InputContainer>
              <InputContainer label="Password" value={password}>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </InputContainer>
              <button type="submit" className="primary soft-shadow">
                Okay
              </button>
              <div className="sign-in-bottom-div">
                <p>
                  Don't have an account?
                  <button className="text-button" onClick={handleSignupRedirect}>
                    Sign up here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Snackbar message={error} />
        <Loading isLoading={loading} />
      </>
    );
  }
}
