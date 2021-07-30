import React from "react";
import { Link } from "react-router-dom";

import useSignup from "../hooks/useSignup";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import Loading from "../components/loading";
import useLogin from "../hooks/useLogin";

/**
 * @returns Form component for new users to sign up with
 */
export default function Signup() {
  const {
    userDetails,
    error,
    page,
    loading,
    onFirstNameChange,
    onLastNameChange,
    onUsernameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    handleEmailCheck,
    handleSignupSubmit,
    handleBack,
  } = useSignup();

  const { redirectFromPath } = useLogin();

  const { toggleLoginIsOpen } = useLogin();

  const handleEmailCheckAndAlert = (event) => {
    handleEmailCheck(event).then((result) => {
      if (!result) {
        handleShowSnackbar();
      }
    });
  };

  const handleSignupAndAlert = (event) => {
    handleSignupSubmit(event).then((result) => {
      if (!result) {
        handleShowSnackbar();
      }
    })
  }

  return (
    <>
      <div className="fill-bg">
        <div className="container">
          <h5 id="login-title">Sign up for account</h5>
          <Link to={redirectFromPath}>
            <button type="button" className="nav-modal-close-button dark-color">
              &times;
            </button>
          </Link>
          <div className="auth auth-signup">
            <div className="card-light">
              <h4>Please enter your details</h4>
              {page === 1 ? (
                <form onSubmit={handleEmailCheckAndAlert}>
                  <div className="signup-fields">
                    <input
                      required
                      type="name"
                      id="firstName"
                      placeholder="first name*"
                      value={userDetails.firstName}
                      onChange={onFirstNameChange}
                    />
                    <input
                      type="name"
                      id="lastName"
                      placeholder="last name"
                      value={userDetails.lastName}
                      onChange={onLastNameChange}
                    />
                    <input
                      required
                      type="email"
                      id="username"
                      placeholder="email*"
                      value={userDetails.username}
                      onChange={onUsernameChange}
                    />
                  </div>

                  <div className="submit-buttons">
                    <button
                      type="button"
                      disabled
                      className="de-emphasised border submit-button greyed-out"
                    >
                      Back
                    </button>
                    <button type="submit" className="submit-button">
                      Next
                    </button>
                  </div>
                  <div className="right">
                    <span>*Required</span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupAndAlert}>
                  <div className="signup-fields">
                    <input
                      required
                      type="password"
                      id="password"
                      placeholder="password*"
                      value={userDetails.password}
                      onChange={onPasswordChange}
                    />
                    <input
                      required
                      type="password"
                      id="passwordConfirm"
                      placeholder="confirm password*"
                      value={userDetails.passwordConfirm}
                      onChange={onPasswordConfirmChange}
                    />
                  </div>
                  <div className="submit-buttons">
                    <button
                      type="button"
                      className="de-emphasised border submit-button"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button type="submit" className="submit-button">
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="padded">
              <p>
                Already have an account?{" "}
                <button className="text-button" onClick={toggleLoginIsOpen}>
                  Sign in
                </button>
              </p>
              <Link to={redirectFromPath}>
                <button className="de-emphasised border full-width">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Snackbar message={error} />
      <Loading isLoading={loading} />
    </>
  );
}
