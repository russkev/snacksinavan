import { useContext, useEffect } from "react";
import { OrderContext } from "../contexts/order.context";
import { useState } from "react";
import usePagination from "./usePagination";

export default function useOrders() {
  const {
    orders,
    currentOrderId,
    setCurrentOrderId,
    loading,
    setLoading,
    error,
    socket,
    getSocketConnection,
  } = useContext(OrderContext);

  const [orderSnacks, setOrderSnacks] = useState();
  const { pageInfo, pageOrders, onNextPage, onPrevPage } = usePagination(orders);
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


  useEffect(() => {
    function handleOrderResize() {
      const ordersNavElement = document.getElementById("orders-break-points");
      if (ordersNavElement) {
        // console.log(getComputedStyle(ordersNavElement).zIndex);
        setBreakLevel(parseInt(getComputedStyle(ordersNavElement).zIndex));
      }
    }

    window.addEventListener("resize", handleOrderResize);
    window.addEventListener("load", handleOrderResize);
    return () => {
      window.removeEventListener("resize", handleOrderResize);
      window.removeEventListener("resize", handleOrderResize);
    };
  }, [setBreakLevel]);

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
    socket,
    pageOrders,
    onNextPage,
    onPrevPage,
    pageInfo,
    getSocketConnection,
    breakLevel,
  };
}
