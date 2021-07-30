import React from "react";
import useOrders from "../hooks/useOrders";
import useSnacks from "../hooks/useSnacks";
import Routes from "../routes/routes";
import BackButton from "../components/navigation/back.button";
import useOrder from "../hooks/useOrder";
import NoOrders from "../components/no.orders";

/* Takes in a customer's username and gets all of their orders and returns
JSX with each of these orders in a table row. */
export default function Orders() {
  const {
    loading: ordersLoading,
    pageOrders,
    error,
    onNextPage,
    onPrevPage,
    pageInfo,
  } = useOrders();

  if (ordersLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Something went wrong: {error.message}</p>;
  } else {
    return (
      <div className="order-list container">
        <h5>My Orders</h5>
        <NoOrders orders={pageOrders} />
        {pageOrders.map((order) => (
          <Order key={order._id} order={order} />
        ))}
        {pageInfo.total > 1 ? (
          <div className="page-buttons-card">
            <button
              className={
                pageInfo.current === 1
                  ? "page-button page-button-left page-button-disabled"
                  : "page-button page-button-left"
              }
              disabled={pageInfo.current === 1}
              onClick={onPrevPage}
            >
              {"<"}
            </button>
            <div className="page-number page-button-with-divider ">{pageInfo.current}</div>
            <button
              className={
                pageInfo.current === pageInfo.total
                  ? "page-button page-button-with-divider page-button-right page-button-disabled"
                  : "page-button page-button-with-divider page-button-right"
              }
              disabled={pageInfo.current === pageInfo.total}
              onClick={onNextPage}
            >
              {">"}
            </button>
          </div>
        ) : (
          <></>
        )}
        <BackButton to={Routes.SNACKS_MENU.path} />
        <div className="blank-bottom" />
      </div>
    );
  }
}

/* Takes in an order and a count and returns this order's number, number of items,
total cost and status in a table row. */
function Order({ order }) {
  const { loading } = useSnacks();
  const { timeValue, orderTotals, orderStatus, handleOrderSelect } = useOrder(order);

  if (!loading) {
    return (
      <div className="order-history-card" onClick={handleOrderSelect}>
        <div className="order-history-container-status">
          <div className="order-history">
            <h6>{order.van.vanName}</h6>
            <div>{timeValue}</div>
          </div>
          <div className="order-history-status">
            <div className="order-history-status-text" style={{ color: orderStatus.color }}>
              {orderStatus.text}
            </div>
          </div>
        </div>
        <div className="order-history-container-amounts">
          <div>Subtotal:</div>
          <div>{`$${orderTotals.subtotal.toFixed(2)}`}</div>
          <div>Discount:</div>
          <div>{`$${orderTotals.discount.toFixed(2)}`}</div>
          <div className="order-history-bold">Total:</div>
          <div className="order-history-bold">{`$${orderTotals.total.toFixed(2)}`}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
