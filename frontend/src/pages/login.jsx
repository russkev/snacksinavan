import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useUser from "../hooks/useUser";
import { handleShowSnackbar, Snackbar } from "../components/snackbar";
import Routes from "../routes/routes";
import InputContainer from "../components/input.container";
import "../styling/login.css";
import "../styling/input.css";
import CloseIcon from "../media/close.icon";
import LoadingButton from "../components/loading.button"; 
import DemoCreate from "../components/demo.create";


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
          <button type="button" className="close" onClick={() => setLoginIsOpen(false)}>
            <svg viewBox="0 0 24 24" className="close">
              <CloseIcon />
            </svg>
          </button>
          <div>
            <h4>Please enter your details</h4>
                <p>
                  Don't have an account?{" "}
                  <Link to="#" onClick={handleSignupRedirect}>
                    Sign up here
                  </Link>
                </p>
            <form onSubmit={handleLoginSubmitAndAlert}>
              <InputContainer label="Username" value={username}>
                <input
                  type="email"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={onUsernameChange}
                  disabled={loading}
                />
              </InputContainer>
              <InputContainer label="Password" value={password}>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={onPasswordChange}
                  disabled={loading}
                />
              </InputContainer>
              <LoadingButton isLoading={loading}>
                <button type="submit" className="primary soft-shadow">
                  Okay
                </button>
              </LoadingButton>
              <p>Alternatively, <DemoCreate>make a demo account.</DemoCreate></p>
              <div className="sign-in-bottom-div">
              </div>
            </form>
          </div>
        </div>
        <Snackbar message={error} />
      </>
    );
  }
}
