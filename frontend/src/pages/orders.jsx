import React from "react";
import useOrders from "../hooks/useOrders";
import useSnacks from "../hooks/useSnacks";
import useOrder from "../hooks/useOrder";
import "../styling/orders.css";
import ChevronLeftIcon from "../media/chevron.left.icon";
import PaginationBar from "../components/pagination.bar";
import LoadingLogo from "../components/loading.logo";

/* Takes in a customer's username and gets all of their orders and returns
JSX with each of these orders in a table row. */
export default function Orders() {
  const {
    loading: ordersLoading,
    error,
    onNextPage,
    onPrevPage,
    pageInfo,
    orders,
    breakLevel
  } = useOrders();


  if (ordersLoading) {
    return <LoadingLogo isLoading={true} />
  } else if (error) {
    return <LoadingLogo isLoading={ordersLoading} errorMessage={error.message} />
  } else {
    return (
      <div className="orders container">
        <div id="orders-break-points" />
        <h1>My Orders</h1>
        <div>
          {!breakLevel ? (
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
                {pageInfo.orders.map((order) => (
                  <Order key={order._id} order={order} />
                ))}
              </tbody>
            </table>
          ) : (
            pageInfo.orders.map((order) => <Order key={order._id} order={order} isMobile />)
          )}
        </div>
        <PaginationBar
          orders={orders}
          pageInfo={pageInfo}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
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

  const snacksList = order.snacks.reduce(function (accumulator, snackGroup) {
    return accumulator.concat(Array(snackGroup.quantity).fill(snackGroup.snack));
  }, []);

  function Items() {
    if (snacksList.length < 3) {
      return snacksList.map((snackItem, index) => {
        return <img key={index} src={`../${snackItem.photo.small}`} alt={snackItem.name} />;
      });
    } else {
      return (
        <>
          <img src={`../${snacksList[0].photo.small}`} alt={snacksList[0].name} />
          <img src={`../${snacksList[1].photo.small}`} alt={snacksList[1].name} className="overlapping" />
          <span className="overlapping">
            <p>{`+${snacksList.length - 2}`}</p>
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
