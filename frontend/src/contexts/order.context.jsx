import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useUser from "../hooks/useUser";


const ENDPOINT = process.env.REACT_APP_API_URL;

export const OrderContext = createContext([]);

export function orderCompare(orderA, orderB) {
  const dateA = new Date(orderA.updatedAt).getTime();
  const dateB = new Date(orderB.updatedAt).getTime();
  return dateB - dateA;
}

export function orderCompareReverse(orderA, orderB) {
  const dateA = new Date(orderA.updatedAt).getTime();
  const dateB = new Date(orderB.updatedAt).getTime();
  return dateA - dateB;
}
/* Contacts the backend API to get the orders for a given by customerUsername */
async function getOrders(socket, setOrders, setError, setLoading) {
  socket.emit("requestCustomerOrders");
  socket.on("orderListCustomer", (currentOrders) => {
    if (currentOrders) {
      const sortedOrders = currentOrders.sort(orderCompare);
      setOrders(sortedOrders);
    }
    setLoading(false);
  });
  socket.on("error", (error) => {
    console.log(error);
    setError(error);
    setLoading(false);
  });
}

function handleSocketConnection(currentUsername, currentToken, setSocket) {
  const identity = {
    username: currentUsername,
    token: `Bearer ${currentToken}`,
  };
  const newSocket = io(ENDPOINT, { auth: identity });
  let socketId = 0;
  newSocket.on("connect", () => {
    socketId = newSocket.id
    console.log(`New user socket connection: ${socketId}`);
  });
  newSocket.on("disconnect", () => {
    console.log(`User socket disconnected: ${socketId}`);
  })
  setSocket(newSocket);
}

const getSocketConnection = (currentUsername, currentToken, isReconnecting, socket, setSocket) => {
  if (currentUsername && currentToken && (!socket || isReconnecting)) {
    handleSocketConnection(currentUsername, currentToken, setSocket);
  }
};

/**
 * Main order context provider.
 * Provides globally accessible and modifiable states for the useUser hook to interact with.
 *
 * Storing orders here means we don't need to fetch them from the server every time which
 * slow.
 */
export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState("");
  const { username, token, isAuthenticated } = useUser();
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [newOrderLoading, setNewOrderLoading] = useState(true);
  const [getOrdersError, setGetOrdersError] = useState("");
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    getSocketConnection(username, token, false, socket, setSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [username, socket, token]);

  function initSocket(username, token, isReconnecting) {
    getSocketConnection(username, token, isReconnecting, socket, setSocket)
  }

  // // Update the list of orders when the user changes, when the isAuthenticated value changes
  // // and when the currentOrder value changes.
  useEffect(() => {
    if (socket && isAuthenticated && username) {
      try {

        getOrders(socket, setOrders, setGetOrdersError, setOrdersLoading);
        socket.on("ordersChanged", (changeInfo) => {
          if (changeInfo.customer === username) {
            getOrders(socket, setOrders, setGetOrdersError, setOrdersLoading);
          }
        })
      } catch (error) {
        console.log(error);
        setGetOrdersError(error);
        setOrdersLoading(false);
      }
    }
  }, [socket, username, isAuthenticated]);

  const value = {
    ordersLoading,
    setOrdersLoading,
    newOrderLoading,
    setNewOrderLoading,
    getOrdersError,
    orders,
    currentOrderId,
    setCurrentOrderId,
    socket,
    initSocket
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
