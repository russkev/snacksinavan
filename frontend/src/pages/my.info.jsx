import React from "react";

import useUserDetails from "../hooks/useUserDetails";
import InputContainer from "../components/input.container";
import "../styling/account.details.css";
import LoadingButton from "../components/loading.button";

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
    currentSection,
    infoSection,
    onSelectPersonalDetails,
    onSelectSecurity,
    isMobile,
  } = useUserDetails();

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
                  <div></div>
                  <p>Account</p>
                </li>
                <li
                  onClick={onSelectSecurity}
                  className={currentSection === infoSection.SECURITY ? "selected" : ""}
                >
                  <div></div>
                  <p>Security</p>
                </li>
              </ul>
            </nav>
            <form onSubmit={handleUpdateInfoSubmit} autoComplete="off">
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
                <LoadingButton isLoading={loading}>
                  <button type="submit" className="primary soft-shadow">
                    Update
                  </button>
                </LoadingButton>
              </section>
            </form>
          </article>
        </div>
      </div>
      <div></div>
    </>
  );
}
