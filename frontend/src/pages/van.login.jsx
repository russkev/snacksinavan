import React from "react";
import { Link, Redirect } from "react-router-dom";
import useVanLogin from "../hooks/useVanLogin";
import useVanUser from "../hooks/useVanUser";
import VanRoutes from "../routes/van.routes";
import { handleShowSnackbar, Snackbar } from "../components/snackbar";
import InputContainer from "../components/input.container";
import "../styling/van.login.css";

export default function VanLogin() {
  const {
    vanName,
    onVanNameChange,
    password,
    onPasswordChange,
    error,
    handleLoginSubmit,
    onDemoLogin,
  } = useVanLogin();

  const { vanIsAuthenticated } = useVanUser();

  const handleLoginSubmitAndAlert = (event) => {
    handleLoginSubmit(event).then((result) => {
      if (!result) {
        handleShowSnackbar();
      }
    });
  };

  if (vanIsAuthenticated) {
    return <Redirect push to={VanRoutes.MY_VAN.path} />;
  }
  return (
    <>
      <div className="van-login signup">
        <div></div>
        <div className="van-container container">
          <p>Welcome to</p>
          <h3>Snacks in a Van</h3>
          <h1>Vendor App</h1>
          <h4>Please sign in</h4>

          <article>
            <form onSubmit={handleLoginSubmitAndAlert}>
              <section>
                <InputContainer label="Van name" value={vanName}>
                  <input
                    type="username"
                    id="vanName"
                    placeholder="Van Name"
                    value={vanName}
                    onChange={onVanNameChange}
                  />
                </InputContainer>
                <InputContainer label="Password" value={password}>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                  />
                </InputContainer>
              </section>
              <div>
                <button type="submit" className="primary soft-shadow">
                  SUBMIT
                </button>
              </div>
              <p>
                Looking for a snack? The customer app is <Link to="/">here</Link>
              </p>
              <p>
                Want a <strong>demo</strong>? click{" "}
                <Link to="#" onClick={onDemoLogin}>
                  here
                </Link>{" "}
                to log in as Thelma
              </p>
            </form>
          </article>
        </div>
      </div>
      <Snackbar message={error} />
    </>
  );
}
