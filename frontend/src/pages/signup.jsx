import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import Loading from "../components/loading";
import useLogin from "../hooks/useLogin";
import InputContainer from "../components/input.container";
import "../styling/signup.css";
import DemoCreate from "../components/demo.create";

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
    });
  };

  return (
    <>
      <div className="signup">
        <div></div>
        <div className="container">
          <h1>Sign up for account</h1>
          <Link to={redirectFromPath}>
            <button type="button" className="close">
              &times;
            </button>
          </Link>
          {/* <div className="auth auth-signup">
            <div className="card-light"> */}
          <article>
            {page === 1 ? (
              <form onSubmit={handleEmailCheckAndAlert}>
                <h4>Please enter your details (*required)</h4>
                {/* <div className="signup-fields"> */}
                <section>
                <InputContainer label="First name*" value={userDetails.firstName}>
                  <input
                    required
                    type="name"
                    id="firstName"
                    placeholder="first name*"
                    value={userDetails.firstName}
                    onChange={onFirstNameChange}
                  />
                </InputContainer>
                <InputContainer label="Last name" value={userDetails.lastName}>
                  <input
                    type="name"
                    id="lastName"
                    placeholder="last name"
                    value={userDetails.lastName}
                    onChange={onLastNameChange}
                  />
                </InputContainer>
                <InputContainer label="email*" value={userDetails.username}>
                  <input
                    required
                    type="email"
                    id="username"
                    placeholder="email*"
                    value={userDetails.username}
                    onChange={onUsernameChange}
                  />
                </InputContainer>
                </section>
                {/* </div> */}

                <div className="submit-buttons">
                  <button type="button" disabled className="disabled full-width">
                    Back
                  </button>
                  <button type="submit" className="primary soft-shadow full-width">
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupAndAlert}>
                <h4>Please enter your details (*required)</h4>
                <section>

                  <InputContainer label="Password*" value={userDetails.password}>
                    <input
                      required
                      type="password"
                      id="password"
                      placeholder="password*"
                      value={userDetails.password}
                      onChange={onPasswordChange}
                    />
                  </InputContainer>
                  <InputContainer label="Confirm password**" value={userDetails.passwordConfirm}>
                    <input
                      required
                      type="password"
                      id="passwordConfirm"
                      placeholder="confirm password*"
                      value={userDetails.passwordConfirm}
                      onChange={onPasswordConfirmChange}
                    />
                  </InputContainer>
                </section>
                <div className="submit-buttons">
                  <button type="button" className="full-width" onClick={handleBack}>
                    Back
                  </button>
                  <button type="submit" className="primary soft-shadow full-width">
                    Confirm
                  </button>
                </div>
              </form>
            )}
            <section>
              <p>
                Already have an account?{" "}
                <button className="text-button" onClick={toggleLoginIsOpen}>
                  Sign in
                </button>
              </p>
              <Link to={redirectFromPath}>
                <button className="full-width">Cancel</button>
              </Link>
              <DemoCreate />
            </section>
          </article>
        </div>
      </div>

      {/* </div>
      </div> */}
      <Snackbar message={error} />
      <Loading isLoading={loading} />
    </>
  );
}
