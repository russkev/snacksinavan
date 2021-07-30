import React from "react";

import useUserDetails from "../hooks/useUserDetails";
import { Link } from "react-router-dom";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import useLogin from "../hooks/useLogin";
import Loading from "../components/loading";
import backButtonIcon from "../media/back_arrow.svg";

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
  } = useUserDetails();
  const { redirectFromPath } = useLogin();

  const handleUpdateAndAlert = (event) => {
    handleUpdateInfoSubmit(event).then(() => {
      handleShowSnackbar();
    });
  };

  return (
    <>
      <div className="fill-bg-with-nav">
        <div className="container">
          <h5 id="my-info-title">My Account</h5>
          <div className="auth auth-signup">
            <div className="card-light">
              <form onSubmit={handleUpdateAndAlert}>
                <h4>Personal Details</h4>
                <div className="my-info-fields">
                  <hr className="my-info-line"></hr>
                  <h6 className="my-info-subheading">Email:</h6>
                  {info ? <h3 className="my-info-subheading">{info.username}</h3> : <></>}
                  <h6 className="my-info-subheading">First name:</h6>
                  <input
                    required
                    type="name"
                    id="firstName"
                    placeholder="first name*"
                    value={newUserDetails.firstName}
                    onChange={onFirstNameChange}
                  />
                  <h6 className="my-info-subheading">Surname:</h6>
                  <input
                    type="name"
                    id="lastName"
                    placeholder="last name"
                    value={newUserDetails.lastName}
                    onChange={onLastNameChange}
                  />
                  <h4>Security</h4>
                  <h6 id="leave-blank-instructions" className="my-info-subheading">
                    Please leave password fields blank if you do not wish to change your password
                  </h6>
                  <hr className="my-info-line"></hr>

                  <h6 className="my-info-subheading">New Password:</h6>
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    value={newUserDetails.password}
                    onChange={onPasswordChange}
                  />
                  <h6 className="my-info-subheading">Confirm New Password:</h6>
                  <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="confirm password"
                    value={newUserDetails.passwordConfirm}
                    onChange={onPasswordConfirmChange}
                  />
                </div>
                <div className="my-info-submit-button">
                  <button type="submit" className="my-info-submit">
                    Update
                  </button>
                </div>
              </form>
              <Link to={redirectFromPath}>
                <button className="de-emphasised border full-width">Back</button>
              </Link>
            </div>
          </div>
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
