import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styling/van.css";
import "./styling/button.css";
import "./styling/snackbar.css";
import "./styling/loading.css";
import "./styling/theme.css";
import { RoutesMap } from "./routes/routes";
import { VanRoutesMap } from "./routes/van.routes";
import { UserContextProvider } from "./contexts/user.context";
import { LoginContextProvider } from "./contexts/login.context";
import { CartContextProvider } from "./contexts/cart.context";
import { OrderContextProvider } from "./contexts/order.context";
import { SnackContextProvider } from "./contexts/snack.context";
import { VanUserContextProvider } from "./contexts/van.user.context";
import { VanLoginContextProvider } from "./contexts/van.login.context";
import { VanContextProvider } from "./contexts/van.context";
import { VanOrdersContextProvider } from "./contexts/van.orders.context";
import { GlobalsContextProvider } from "./contexts/globals.context";
import { LoadScript } from "@react-google-maps/api";
import { SnackbarContextProvider } from "./contexts/snackbar.context";
const lib = ["places"];

function App() {
  return (
    <Router>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
        <GlobalsContextProvider>
          <Switch>
            <Route path="/van">
              <VanUserContextProvider>
                <VanLoginContextProvider>
                  <VanOrdersContextProvider>
                    <SnackbarContextProvider>
                      <VanRoutesMap />
                    </SnackbarContextProvider>
                  </VanOrdersContextProvider>
                </VanLoginContextProvider>
              </VanUserContextProvider>
            </Route>
            <Route path="/">
              <UserContextProvider>
                <SnackContextProvider>
                  <CartContextProvider>
                    <VanContextProvider>
                      <LoginContextProvider>
                        <OrderContextProvider>
                          <SnackbarContextProvider>
                            <RoutesMap />
                          </SnackbarContextProvider>
                        </OrderContextProvider>
                      </LoginContextProvider>
                    </VanContextProvider>
                  </CartContextProvider>
                </SnackContextProvider>
              </UserContextProvider>
            </Route>
          </Switch>
        </GlobalsContextProvider>
      </LoadScript>
    </Router>
  );
}
export default App;
