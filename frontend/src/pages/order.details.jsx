import React, { useState, useEffect } from "react";
import useOrders from "../hooks/useOrders";
import BackButton from "../components/navigation/back.button";
import Routes from "../routes/routes";
import orderTimeLeft from "../components/order.time.left";
import OrderStatus from "../components/order.status";
import CancelModal from "../components/cancel.order.modal";
import useModal from "../hooks/useModal";
import useGlobals from "../hooks/useGlobals";
import useOrder from "../hooks/useOrder";
import OrderModify from "../components/order.modify";
import OrderInvoice from "../components/order.invoice";
import OrderMap from "../components/order.map";
import OrderRating from "../components/order.rating";
import "../styling/order.details.css";

/* Displays the full details of a single order matched by its id.
 */
export default function OrderDetails() {
  const { orderFromId, loading, error } = useOrders();
  const { globals } = useGlobals();
  const orderId = window.location.pathname.split("/").pop();
  const order = orderId ? orderFromId(orderId) : null;
  const {
    orderTotals,
    orderStatus,
  } = useOrder(order);
  const [timeLeftDisplay, setTimeLeftDisplay] = useState(
    order ? orderTimeLeft(order, globals.cancelTime, false) : 0
  );
  // const [ratingValue, setRatingValue] = React.useState(2);

  // const groupedSnacks = order ? groupSnacks(order.snacks) : null;
  const [location, setLocation] = useState({ lat: -37.81494, lng: 144.96867 });
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
      <div className="order container">
        <h1>Order Details</h1>
        <OrderStatus order={order} orderStatus={orderStatus} />
        <article className="order-details">
          <section className="order-map">
            <OrderMap order={order} />
          </section>
          <section>
            <OrderInvoice order={order} orderTotals={orderTotals} />
            <OrderModify timeLeftDisplay={timeLeftDisplay} order={order} />
            <OrderRating order={order}/>
          </section>
        </article>
        <div className="blank-bottom" />
        <BackButton to={Routes.CUSTOMER_ORDERS.path} />
        <CancelModal isShowing={isShowing} hide={toggle} order={order} />
      </div>
    );
  }
}
