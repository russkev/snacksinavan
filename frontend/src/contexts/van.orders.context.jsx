import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useVanUser from "../hooks/useVanUser";
import { orderCompare, orderCompareReverse } from "./order.context";

const ENDPOINT = process.env.REACT_APP_API_URL;

export const VanOrdersContext = createContext([]);

function getVanOrders(socket, setVanOrders) {
  socket.emit("requestVanOrders");
  socket.once("getVanOrders", (currentOrders) => {
    const newVanOrders = currentOrders.reduce(
        (accumulator, vanOrder) => {
          if (!vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
            accumulator["unfulfilled"].push(vanOrder);
          } else if (vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
            accumulator["uncompleted"].push(vanOrder);
          } else {
            accumulator["completed"].push(vanOrder);
          }
          return accumulator;
        },
        { unfulfilled: [], uncompleted: [], completed: [] }
      )

      newVanOrders.unfulfilled.sort(orderCompareReverse);
      newVanOrders.uncompleted.sort(orderCompareReverse);
      newVanOrders.completed.sort(orderCompare);
      setVanOrders(newVanOrders);
  });
  socket.on("error", (error) => console.log(error));
}

export const VanOrdersContextProvider = ({ children }) => {
  const [vanOrders, setVanOrders] = useState({ unfulfilled: [], uncompleted: [], completed: [] });
  const { vanName, vanToken } = useVanUser();
  const [vanSocket, setVanSocket] = useState(null);

  const connectVanSocket = (currentVanName, currentToken) => {
    if (currentVanName && currentToken) {
      const identity = {
        vanName: currentVanName,
        vanToken: `Bearer ${currentToken}`,
      };
      setVanSocket(io(ENDPOINT, { auth: identity }));
    }
  };

  // Authenticate van with socket
  useEffect(() => {
    if (vanName && !vanSocket && vanToken) {
      const identity = {
        vanName: vanName,
        vanToken: `Bearer ${vanToken}`,
      };
      setVanSocket(io(ENDPOINT, { auth: identity }));
    }

    return () => {
      if (vanSocket) {
        vanSocket.disconnect();
      }
    };
  }, [vanName, vanSocket, vanToken]);

  // Get orders
  useEffect(() => {
    if (vanSocket && vanName) {
      getVanOrders(vanSocket, setVanOrders);
      vanSocket.on("ordersChanged", (changeInfo) => {
        if (changeInfo.van === vanName) {
          getVanOrders(vanSocket, setVanOrders);
        }
      });
    }
  }, [vanSocket, vanName]);

  const value = {
    vanOrders,
    vanSocket,
    connectVanSocket,
  };
  return <VanOrdersContext.Provider value={value}>{children}</VanOrdersContext.Provider>;
};
