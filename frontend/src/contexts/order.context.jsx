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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);

  const getSocketConnection = (currentUsername, currentToken, isReconnecting) => {
    if (currentUsername && currentToken && (!socket || isReconnecting)) {
      const identity = {
        username: currentUsername,
        token: `Bearer ${currentToken}`,
      };
      setSocket(io(ENDPOINT, { auth: identity }));
    }
  };

  useEffect(() => {
    getSocketConnection(username, token, false);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // Don't need to include getSocketConnection
    //eslint-disable-next-line
  }, [username, socket, token]);

  // Update the list of orders when the user changes, when the isAuthenticated value changes
  // and when the currentOrder value changes.
  useEffect(() => {
    let mounted = true;

    if (mounted) {

      if (socket && isAuthenticated && username) {
        try {
          getOrders(socket, setOrders, setError, setLoading);
          socket.on("ordersChanged", (changeInfo) => {
            if (changeInfo.customer === username) {
              getOrders(socket, setOrders, setError, setLoading);
            }
          });
        } catch (error) {
          console.log(error);
          setError(error);
        }
      }
    }
    return () => {mounted=false;}
  }, [socket, isAuthenticated, username]);

  const value = {
    loading,
    error,
    orders,
    currentOrderId,
    setCurrentOrderId,
    socket,
    getSocketConnection,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
