import { useContext } from "react";
import { OrderContext } from "../contexts/order.context";
import { useState } from "react";
import usePagination from "./usePagination"


export default function useOrders() {
  const { orders, currentOrderId, setCurrentOrderId, loading, error, socket, getSocketConnection } =
    useContext(OrderContext);

  const [orderSnacks, setOrderSnacks] = useState();
  const { pageInfo, pageOrders, onNextPage, onPrevPage } = usePagination(orders)
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
