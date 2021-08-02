import React, { useContext } from "react";
import useCart from "../hooks/useCart.jsx";
import useSnacks from "../hooks/useSnacks";
import CartItemCard from "../components/cart.item.card";
import TotalPrice from "../components/price.total";
import SendOrderButton from "../components/send.order.button";
import Routes from "../routes/routes";
import { VanContext } from "../contexts/van.context.jsx";
import useGlobals from "../hooks/useGlobals";
import useUser from "../hooks/useUser";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import Loading from "../components/loading";
import ChevronRightIcon from "../media/chevron.left.icon.jsx";

export default function ConfirmCart() {
  const { toggleLoginIsOpen } = useLogin();
  const { isAuthenticated } = useUser();
  const { globals } = useGlobals();
  const { cart, total, setTotal, orderId, resetCart, submitLoading, displayMenu } = useCart();
  const { orderFromId } = useOrders();
  const order = orderId ? orderFromId(orderId) : null;
  const { loading, error } = useSnacks();
  const { van } = useContext(VanContext);
  var cantUpdate = false;
  if (orderId) {
    if (
      order &&
      (order.isFulfilled ||
        Math.floor((new Date().getTime() - new Date(order.updatedAt).getTime()) / 1000) >
          globals.cancelTime * 60 + 2)
    ) {
      cantUpdate = true;
    }
  }
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Something went wrong: {error.message}</p>;
  } else {
    var heading;
    if (!orderId) {
      heading = "Cart";
    } else {
      heading = "Confirm order change";
    }
    return (
      <div className="cart">
        <div>
          <button className="mobile-only close-cart" onClick={displayMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px">
              <ChevronRightIcon />
            </svg>
          </button>
          <h1> {heading} </h1>
        </div>
        <section>
          {Object.keys(cart).map((cartItem) => {
            return <CartItemCard key={cartItem} snackName={cartItem} />;
          })}
        </section>
        <section>
          <TotalPrice total={total} setTotal={setTotal} />
          {/* <div className="cart-price-card">
            <h3 className="van-confirm-cart-subheading">Van</h3>
            {van ? (
              <div className="van-confirm-cart-info">
                <span>Ordering From: {van}</span>
              </div>
            ) : (
              <div className="van-confirm-cart-info">
                <span>Ordering From: </span>
                <span id="no-van">No Van Selected</span>
              </div>
            )}
            {van ? <SelectVanButton isAVan={true} /> : <SelectVanButton isAVan={false} />}
          </div> */}
          {!isAuthenticated ? (
            <>
              <div className="please-login">
                <span>You must be logged in to place an order</span>
                <br />
                <Link to="#" onClick={toggleLoginIsOpen}>
                  Login
                </Link>{" "}
                or <Link to={Routes.SIGNUP.path}>make an account</Link>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* <BackButton to={Routes.SNACKS_MENU.path} /> */}
          {cantUpdate ? (
            <>
              <div className="horizontal-margin">
                <br></br>
                <h4> Unfortunately you have ran out of time for this change</h4>
              </div>
              <button className="checkout-button checkout-button-confirm" onClick={resetCart}>
                {" "}
                Reset cart
              </button>
            </>
          ) : (
            <div>
              {van == null ? (
                <SendOrderButton enabled={false} />
              ) : (
                <SendOrderButton enabled={true} />
              )}
            </div>
          )}
          <div className="blank-bottom" />
          {/* </div> */}
          {/* </div> */}
          <Loading isLoading={submitLoading} />
        </section>
      </div>
    );
  }
}
