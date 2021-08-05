import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./App.css";
// import "./VanApp.css";
import "./styling/button.css"
import "./styling/snackbar.css"
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

function App() {
  // const [isCustomer, setIsCustomer] = useState(false)
  return (
    <Router>
      <GlobalsContextProvider>
        <Switch>
          <Route path="/van">
            <VanUserContextProvider>
              <VanLoginContextProvider>
                <VanOrdersContextProvider>
                  <VanRoutesMap />
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
                        <RoutesMap />
                      </OrderContextProvider>
                    </LoginContextProvider>
                  </VanContextProvider>
                </CartContextProvider>
              </SnackContextProvider>
            </UserContextProvider>
          </Route>
        </Switch>
      </GlobalsContextProvider>
    </Router>
  );
}
export default App;
