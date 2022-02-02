import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import useLogin from "../hooks/useLogin";
import InputContainer from "../components/input.container";
import "../styling/signup.css";
import DemoCreate from "../components/demo.create";
import LoadingButton from "../components/loading.button";

/**
 * @returns Form component for new users to sign up with
 */
export default function Signup() {
  const {
    userDetails,
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

  const { redirectFromPath, toggleLoginIsOpen } = useLogin();

  return (
    <>
      <div className="full-screen signup">
        <div></div>
        <div className="container">
          <h1>Sign up for account</h1>
          <Link to={redirectFromPath}>
            <button type="button" className="close">
              &times;
            </button>
          </Link>
          <article>
            {page === 1 ? (
              <form onSubmit={handleEmailCheck}>
                <h4>Please enter your details (*required)</h4>
                <section>
                  <InputContainer label="First name*" value={userDetails.firstName}>
                    <input
                      required
                      type="name"
                      id="firstName"
                      placeholder="first name*"
                      value={userDetails.firstName}
                      onChange={onFirstNameChange}
                      disabled={loading}
                    />
                  </InputContainer>
                  <InputContainer label="Last name" value={userDetails.lastName}>
                    <input
                      type="name"
                      id="lastName"
                      placeholder="last name"
                      value={userDetails.lastName}
                      onChange={onLastNameChange}
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </InputContainer>
                </section>

                <div className="submit-buttons">
                  <button type="button" disabled className="disabled full-width">
                    Back
                  </button>
                  <LoadingButton isLoading={loading}>
                    <button type="submit" className="primary soft-shadow full-width">
                      Next
                    </button>
                  </LoadingButton>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </InputContainer>
                </section>
                <div className="submit-buttons">
                  <button type="button" className="full-width" onClick={handleBack}>
                    Back
                  </button>
                  <LoadingButton isLoading={loading}>
                    <button type="submit" className="primary soft-shadow full-width">
                      Confirm
                    </button>
                  </LoadingButton>
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
              <p>
                {" "}
                Alternatively, <DemoCreate> make a demo account </DemoCreate>
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
