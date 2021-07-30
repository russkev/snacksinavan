import { useContext, useEffect } from "react";
import { OrderContext } from "../contexts/order.context";
import { useState } from "react";

const ORDERS_PER_PAGE = 10;

/* Continuously says we are loading until the orders are received or an error occurs */
export default function useOrders() {
  const {
    orders,
    currentOrderId,
    setCurrentOrderId,
    loading,
    error,
    socket,
    getSocketConnection,
  } = useContext(OrderContext);

  const [orderSnacks, setOrderSnacks] = useState();
  const [pageInfo, setPageInfo] = useState({ current: 1, total: 1 });
  const [pageOrders, setPageOrders] = useState([]);
  function orderFromId(orderId) {
    return orders.find((order) => order._id === orderId);
  }

  async function cancelOrder(orderId) {
    const info = { orderId: orderId, isCancelled: true };
    socket.emit("cancelOrder", info);
    socket.on("error", (error) => console.log(error));
  }

  function currentOrder() {
    return orderFromId(currentOrderId);
  }

  function updateOrderItems(snack, count, order, setOrder, snacks) {
    var position = 0;
    var position2 = 0;
    for (var i = 0; i < order.length; i++) {
      if (order[i][0].name === snack) {
        position = i;
        break;
      }
    }
    if (count > 0) {
      for (i = 0; i < order.length; i++) {
        alert(JSON.stringify(snacks[i].name));
        if (snacks[i].name === snack) {
          position2 = i;
          break;
        }
      }
      order[position].push(snacks[position2]);
    } else {
      if (order[position].length > 0) {
        order[position].pop();
      }
    }

    setOrder(order);
  }

  // Initialize pageInfo
  useEffect(() => {
    if (orders) {
      setPageInfo({ ...pageInfo, total: Math.ceil(orders.length / ORDERS_PER_PAGE) });
    }
    // Including pageInfo in the dependency array will cause an infinite loop
    // eslint-disable-next-line
  }, [orders]);

  // Initialize current page
  useEffect(() => {
    if (orders) {
      setPageOrders(
        orders.slice(ORDERS_PER_PAGE * (pageInfo.current - 1), ORDERS_PER_PAGE * pageInfo.current)
      );
    }
    // Including pageInfo in the dependency array will cause an infinite loop
    // eslint-disable-next-line
  }, [orders]);

  const onNextPage = (event) => {
    event.preventDefault();
    if (pageInfo.current < pageInfo.total) {
      setPageOrders(
        orders.slice(ORDERS_PER_PAGE * pageInfo.current, ORDERS_PER_PAGE * (pageInfo.current + 1))
      );
      setPageInfo({ ...pageInfo, current: pageInfo.current + 1 });
    }
  };

  const onPrevPage = (event) => {
    event.preventDefault();
    if (pageInfo.current > 1) {
      setPageOrders(
        orders.slice(
          ORDERS_PER_PAGE * (pageInfo.current - 2),
          ORDERS_PER_PAGE * (pageInfo.current - 1)
        )
      );
      setPageInfo({ ...pageInfo, current: pageInfo.current - 1 });
    }
  };

  return {
    loading,
    orders,
    error,
    currentOrderId,
    setCurrentOrderId,
    orderSnacks,
    setOrderSnacks,
    currentOrder,
    orderFromId,
    cancelOrder,
    updateOrderItems,
    socket,
    pageOrders,
    onNextPage,
    onPrevPage,
    pageInfo,
    getSocketConnection,
  };
}
