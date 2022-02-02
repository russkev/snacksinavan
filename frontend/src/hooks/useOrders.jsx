import { useContext, useEffect } from "react";
import { OrderContext } from "../contexts/order.context";
import { useState } from "react";
import usePagination from "./usePagination";
import { useHistory } from "react-router-dom";

export default function useOrders() {
  const { 
    orders, 
    currentOrderId, 
    setCurrentOrderId, 
    ordersLoading,
    setOrdersLoading, 
    getOrdersError, 
    socket, 
    initSocket 
  } = useContext(OrderContext);
  const history = useHistory();

  const [orderSnacks, setOrderSnacks] = useState();
  const { pageInfo, onNextPage, onPrevPage } =
    usePagination(orders);
  function orderFromId(orderId) {
    const foundOrder = orders.find((order) => order._id === orderId);
    return foundOrder;
  }
  const [breakLevel, setBreakLevel] = useState(1);

  async function cancelOrder(orderId) {
    const info = { orderId: orderId, isCancelled: true };
    socket.emit("cancelOrder", info);
    socket.on("error", (error) => console.log(error));
  }

  function currentOrder() {
    return orderFromId(currentOrderId);
  }

  function handleOrderResize() {
    const ordersNavElement = document.getElementById("orders-break-points");
    if (ordersNavElement) {
      setBreakLevel(parseInt(getComputedStyle(ordersNavElement).zIndex));
    }
  }

  useEffect(() => {
    handleOrderResize();
    window.addEventListener("resize", handleOrderResize);
    window.addEventListener("load", handleOrderResize);
    return () => {
      window.removeEventListener("resize", handleOrderResize);
      window.removeEventListener("resize", handleOrderResize);
    };
  }, [ordersLoading, history.location.pathname]);

  return {
    ordersLoading,
    setOrdersLoading,
    orders,
    getOrdersError,
    currentOrderId,
    setCurrentOrderId,
    orderSnacks,
    setOrderSnacks,
    currentOrder,
    orderFromId,
    cancelOrder,
    socket,
    onNextPage,
    onPrevPage,
    pageInfo,
    initSocket,
    breakLevel,
  };
}
