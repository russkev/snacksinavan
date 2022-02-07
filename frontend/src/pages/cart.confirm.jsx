import React, { useContext } from "react";
import useCart from "../hooks/useCart.jsx";
import useSnacks from "../hooks/useSnacks";
import CartItemCard from "../components/cart.item.card";
import TotalPrice from "../components/price.total";
import { VanContext } from "../contexts/van.context.jsx";
import useGlobals from "../hooks/useGlobals";
import { Link } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import ChevronLeftIcon from "../media/chevron.left.icon.jsx";
import LoadingButton from "../components/loading.button.jsx";
import LoadingLogo from "../components/loading.logo.jsx";

export default function ConfirmCart({ isShowing, displayMenu }) {
  const { globals } = useGlobals();
  const {
    cart,
    total,
    setTotal,
    orderId,
    resetCart,
    submitLoading,
    submitCart,
    cartSize,
  } = useCart();
  const { orderFromId } = useOrders();
  const order = orderId ? orderFromId(orderId) : null;
  const { loading, getSnacksError } = useSnacks();
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
  if (loading || submitLoading) {
    return <LoadingLogo isLoading={true} />;
  } else if (getSnacksError) {
    return <LoadingLogo isLoading={loading} errorMessage={getSnacksError} />;
  } else {
    var heading;
    if (!orderId) {
      heading = "Cart";
    } else {
      heading = "Confirm order change";
    }
    return (
      <>
        {isShowing ? (
          <div className="fill loading" onClick={displayMenu}>
            {" "}
          </div>
        ) : (
          <></>
        )}
        <div className="cart">
          <div>
            <button className="mobile-only close-cart" onClick={displayMenu}>
              <svg>
                <ChevronLeftIcon />
              </svg>
            </button>
            <h1> {heading} </h1>
          </div>
          <section>
            {Object.keys(cart).map((cartItem) => {
              return <CartItemCard key={cartItem} snackId={cartItem} />;
            })}
          </section>

          <section className="totals">
            <TotalPrice total={total} setTotal={setTotal} />
            {!van ? (
              <>
                <div className="please-login">
                  <span>
                    No van selected. <br />
                    Please{" "}
                    <Link to="/" onClick={displayMenu}>
                      select a van to proceed
                    </Link>{" "}
                  </span>
                  <br />
                </div>
              </>
            ) : (
              <>
                <div>
                  <span>Your van: {van.vanName}</span>
                </div>
              </>
            )}
            {cantUpdate ? (
              <>
                <div className="horizontal-margin">
                  <br></br>
                  <h4> Unfortunately you have ran out of time for this change</h4>
                </div>
                <button
                  className="checkout-button checkout-button-confirm"
                  onClick={() => {
                    resetCart();
                    displayMenu();
                  }}
                >
                  {" "}
                  Reset cart
                </button>
              </>
            ) : (
              <div>
                <LoadingButton isLoading={submitLoading}>
                  <button
                    onClick={() => {
                      submitCart();
                      displayMenu();
                    }}
                    disabled={!cartSize() || !van}
                    className={`primary soft-shadow ${cartSize() && van ? "" : "disabled"}`}
                  >
                    {orderId ? "Confirm Change" : "Confirm"}
                  </button>
                </LoadingButton>
              </div>
            )}
            <div className="blank-bottom" />
          </section>
        </div>
      </>
    );
  }
}
