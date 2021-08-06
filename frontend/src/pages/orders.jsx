import React from "react";
import useOrders from "../hooks/useOrders";
import useSnacks from "../hooks/useSnacks";
import useOrder from "../hooks/useOrder";
import "../styling/orders.css";
import ChevronLeftIcon from "../media/chevron.left.icon";

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
    orders,
  } = useOrders();

  if (ordersLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Something went wrong: {error.message}</p>;
  } else {
    return (
      <div className="orders container">
        <h1>My Orders</h1>
        <div>
          {!window.matchMedia("screen and (max-width: 800px)").matches ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Order</th>
                  <th>Items</th>
                  <th>Van</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {pageOrders.map((order) => (
                  <Order key={order._id} order={order} />
                ))}
              </tbody>
            </table>
          ) : (
            pageOrders.map((order) => <Order key={order.id} order={order} isMobile />)
          )}
        </div>
        <div className="pages">
          <p>{`${pageInfo.from} - ${pageInfo.to} of ${orders.length} orders`}</p>
          <div>
            <button
              className={pageInfo.current === 1 ? "pages disabled" : "pages"}
              onClick={onPrevPage}
            >
              {"<"}
            </button>
            <button
              className={pageInfo.current === pageInfo.total ? "pages disabled" : "pages"}
              onClick={onNextPage}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

/* Takes in an order and a count and returns this order's number, number of items,
total cost and status in a table row. */
function Order({ order, isMobile }) {
  const { loading } = useSnacks();
  const { orderTotals, orderStatus, handleOrderSelect } = useOrder(order);
  const dateTime = new Date(order.updatedAt);
  const date = dateTime.toLocaleDateString();
  // const groupedSnacks = order ? groupSnacks(order.snacks) : null;

  order.snacks.sort((a, b) => (a._id > b._id ? 1 : -1));

  function Items() {
    if (order.snacks.length <= 3) {
      return order.snacks.map((snack, index) => {
        return <img key={index} src={`../${snack.photo}`} alt={order.snacks[0].name}/>;
      });
    } else {
      return (
        <>
          <img 
            src={`../${order.snacks[0].photo}`} 
            alt={order.snacks[0].name} />
          <img
            src={`../${order.snacks[1].photo}`}
            alt={order.snacks[1].name}
            className="overlapping"
          />
          <span className="overlapping">
            <p>{`+${order.snacks.length - 2}`}</p>
          </span>
        </>
      );
    }
  }

  if (!loading && !isMobile) {
    return (
      <tr>
        <td>
          <button className="primary" onClick={handleOrderSelect}>
            Details
          </button>
        </td>
        <td>
          <h4>{order._id.slice(-6)}</h4>
          <p>{date}</p>
        </td>
        <td className="items">
          <Items />
        </td>
        <td>{order.van.vanName}</td>
        <td>
          <span className={`status ${orderStatus.color}`}>{orderStatus.text}</span>
        </td>
        <td>{`$${orderTotals.total.toFixed(2)}`}</td>
      </tr>
    );
  } else if (!loading && isMobile) {
    return (
      <div className="mobile" onClick={handleOrderSelect}>
        <span>
          <h4>{order._id.slice(-6)}</h4>
          <p>{order.van.vanName}</p>
          <p>{date}</p>
        </span>
        <span>
          <div className="items">
            <Items />
          </div>
          <p>{`$${orderTotals.total.toFixed(2)}`}</p>
        </span>
        <span>
          <span className={`status ${orderStatus.color}`}>{orderStatus.text}</span>
        </span>
        <span>
          <svg>
            <ChevronLeftIcon />
          </svg>
        </span>
      </div>
    );
  } else {
    return <></>;
  }
}
