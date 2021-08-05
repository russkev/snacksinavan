import React from "react";

import useUserDetails from "../hooks/useUserDetails";
import { Link } from "react-router-dom";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import useLogin from "../hooks/useLogin";
import Loading from "../components/loading";
import backButtonIcon from "../media/back_arrow.svg";
import InputContainer from "../components/input.container";
import "../styling/account.details.css";

export default function MyInfo() {
  const {
    loading,
    info,
    newUserDetails,
    onFirstNameChange,
    onLastNameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    handleUpdateInfoSubmit,
    message,
    isSuccess,
    currentSection,
    infoSection,
    onSelectPersonalDetails,
    onSelectSecurity,
    isMobile,
  } = useUserDetails();
  const { redirectFromPath } = useLogin();

  const handleUpdateAndAlert = (event) => {
    handleUpdateInfoSubmit(event).then(() => {
      handleShowSnackbar();
    });
  };

  return (
    <>
      <div className="my-info">
        <div className="container">
          <h1>Settings</h1>
          <article>
            <nav id="my-info-nav">
              <ul>
                <li
                  onClick={onSelectPersonalDetails}
                  className={currentSection === infoSection.PERSONAL_DETAILS ? "selected" : ""}
                >
                  Account
                </li>
                <li
                  onClick={onSelectSecurity}
                  className={currentSection === infoSection.SECURITY ? "selected" : ""}
                >
                  Security
                </li>
              </ul>
            </nav>
            <form onSubmit={handleUpdateAndAlert} autoComplete="off">
              {currentSection === infoSection.PERSONAL_DETAILS || isMobile ? (
                <section>
                  <h3>Personal Details</h3>
                  <hr />
                  <InputContainer label="email" value={info ? info.username : ""}>
                    <input
                      required
                      type="email"
                      id="email"
                      value={info ? info.username : ""}
                      disabled
                    />
                  </InputContainer>
                  <InputContainer label="First name" value={newUserDetails.firstName}>
                    <input
                      required
                      type="name"
                      id="firstName"
                      placeholder="first name*"
                      value={newUserDetails.firstName}
                      onChange={onFirstNameChange}
                    />
                  </InputContainer>
                  <InputContainer label="Last name" value={newUserDetails.lastName}>
                    <input
                      type="name"
                      id="lastName"
                      placeholder="last name"
                      value={newUserDetails.lastName}
                      onChange={onLastNameChange}
                    />
                  </InputContainer>
                </section>
              ) : (
                <></>
              )}
              {currentSection === infoSection.SECURITY || isMobile ? (
                <section>
                  <h3>Password</h3>
                  <p>
                    Please leave password fields blank if you do not wish to change your password
                  </p>
                  <hr />

                  <InputContainer label="New password" value={newUserDetails.password}>
                    <input
                      type="password"
                      id="password"
                      placeholder="New password"
                      value={newUserDetails.password}
                      onChange={onPasswordChange}
                      autoComplete="new-password"
                    />
                  </InputContainer>
                  <InputContainer
                    label="Confirm new password"
                    value={newUserDetails.passwordConfirm}
                  >
                    <input
                      type="password"
                      id="passwordConfirm"
                      placeholder="Confirm new password"
                      value={newUserDetails.passwordConfirm}
                      onChange={onPasswordConfirmChange}
                      autoComplete="new-password"
                    />
                  </InputContainer>
                </section>
              ) : (
                <></>
              )}
              <section>
                <button type="submit" className="primary soft-shadow">
                  Update
                </button>
              </section>
            </form>
          </article>
        </div>
      </div>
      <div>
        <Link id="my-info-back" to={redirectFromPath} className="back-button">
          <img src={backButtonIcon} alt="Back" />
        </Link>
      </div>
      <Loading isLoading={loading} />
      <Snackbar message={message} isSuccess={isSuccess} />
    </>
  );
}
