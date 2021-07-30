import React, { useState, useEffect } from "react";
import useOrders from "../hooks/useOrders";
import BackButton from "../components/navigation/back.button";
import Routes from "../routes/routes";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import groupSnacks from "../components/group.snacks";
import orderTimeLeft from "../components/order.time.left";
import OrderDetailsHeading from "../components/order.details.heading";
import OrderStatusBar from "../components/order.status.bar";
import InfoCard from "../components/info.card";
import CancelModal from "../components/cancel.order.modal";
import useModal from "../hooks/useModal";
import useCart from "../hooks/useCart";
import useGlobals from "../hooks/useGlobals";
import useOrder from "../hooks/useOrder";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
const lib = ["places"];

/* Displays the full details of a single order matched by its id.
 */
export default function OrderDetails() {
  const history = useHistory();
  const { orderFromId, loading, error } = useOrders();
  const { setOrderCart } = useCart();
  const { globals } = useGlobals();
  const orderId = window.location.pathname.split("/").pop();
  const order = orderId ? orderFromId(orderId) : null;
  const {
    rating,
    setRating,
    handleRatingSubmit,
    orderTotals,
    orderStatus,
    comment,
    onCommentChange,
  } = useOrder(order);
  const [timeLeftDisplay, setTimeLeftDisplay] = useState(
    order ? orderTimeLeft(order, globals.cancelTime, false) : 0
  );
  // const [ratingValue, setRatingValue] = React.useState(2);

  const groupedSnacks = order ? groupSnacks(order.snacks) : null;
  const [location, setLocation] = useState({ lat: -37.81494, lng: 144.96867 });
  const zoom = 14;
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    if (order) {
      const timer = setTimeout(() => {
        setTimeLeftDisplay(orderTimeLeft(order, globals.cancelTime, false));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Something went wrong: {error.message}</p>;
  } else if (!order) {
    return <p>Order could not be found</p>;
  } else {
    if (location.lat !== order.van.latitude && location.lng !== order.van.longitude) {
      setLocation({ lat: order.van.latitude, lng: order.van.longitude });
    }
    return (
      <div className="order-details-container">
        <OrderDetailsHeading />
        <OrderStatusBar order={order} orderStatus={orderStatus} />
        <div className="order-details-split">
          <div className="order-map-container">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
              {!order.isCompleted ? (
                <GoogleMap mapContainerClassName="order-map" zoom={zoom} center={location}>
                  <Marker
                    label={order.van.vanName}
                    position={{ lat: order.van.latitude, lng: order.van.longitude }}
                  />
                </GoogleMap>
              ) : (
                <></>
              )}
            </LoadScript>
            <InfoCard heading={`Van: ${order.van.vanName}`}>
              <div className="info-description"><span >{order.van.locationDescription}</span></div>
            </InfoCard>
          </div>

          <div className="order-info-container">
            <InfoCard heading={"Order Details"}>
              <div className="snacks-in-order info-description">
                {groupedSnacks.map((snack) => (
                  <span key={snack[0].name} className="info-totals-span">
                    <div>
                      <b>{snack.length}x</b> {snack[0].name}
                    </div>
                    <div>{`$${(snack.length * snack[0].price).toFixed(2)}`}</div>
                  </span>
                ))}
                {orderTotals ? (
                  <>
                    <span className="info-totals-span info-vertical-space">
                      <div>Subtotal</div>
                      <div>{`$${orderTotals.subtotal.toFixed(2)}`}</div>
                    </span>
                    <span className="info-totals-span">
                      <div>Discount</div>
                      <div>{`$${orderTotals.discount.toFixed(2)}`}</div>
                    </span>
                    <span className="info-totals-span">
                      <div>
                        <b>Total</b>
                      </div>
                      <div>
                        <b>{`$${orderTotals.total.toFixed(2)}`}</b>
                      </div>
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </InfoCard>
            {!order.isFulfilled ? (
              <InfoCard heading="Modify Order">
                {timeLeftDisplay !== 0 ? (
                  <>
                    <div className="info-description">
                      Time remaining to change or cancel (unless completed): {timeLeftDisplay}
                    </div>
                    <div className="order submit-buttons">
                      <button
                        className="changeOrderButton de-emphasised border"
                        onClick={() => {
                          setOrderCart(order);
                          history.push("/cart/");
                        }}
                      >
                        Change Order
                      </button>
                      <button className="cancelOrderButton de-emphasised border" onClick={toggle}>
                        Cancel Order
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="info-totals-span">
                    <div className="info-description">No time left to change or cancel your order. Sorry!</div>
                  </span>
                )}
              </InfoCard>
            ) : (
              <></>
            )}
            {order.isCompleted && order.rating === null ? (
              <>
                <InfoCard heading="Rate Order">
                  <Rating
                    name="simple-controlled"
                    precision={0.5}
                    size="large"
                    value={rating}
                    onChange={(event, newRating) => {
                      setRating(newRating);
                    }}
                  />
                  <form onSubmit={handleRatingSubmit}>
                    <input
                      type="comment"
                      id="comment"
                      placeholder="comment"
                      value={comment}
                      onChange={onCommentChange}
                      style={{ background: "#EEE" }}
                    />
                    <button type="submit"> Submit Rating </button>
                  </form>
                </InfoCard>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="blank-bottom" />
        <BackButton to={Routes.CUSTOMER_ORDERS.path} />
        <CancelModal isShowing={isShowing} hide={toggle} order={order} />
      </div>
    );
  }
}
