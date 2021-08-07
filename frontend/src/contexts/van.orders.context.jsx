import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import groupSnacks from "../components/group.snacks";
import useVanUser from "../hooks/useVanUser";
import { orderCompare } from "../contexts/order.context";

const ENDPOINT = process.env.REACT_APP_API_URL;

export const VanOrdersContext = createContext([]);

function getVanOrders(socket, setVanOrders) {
  socket.emit("requestVanOrders");
  socket.once("getVanOrders", (currentOrders) => {
    // const sortedOrders = currentOrders.sort(orderCompare).reverse();
    // sortedOrders.forEach((order) => {
    //   order["snacks"] = groupSnacks(order.snacks);
    // });
    // setVanOrders(sortedOrders);
    console.log(currentOrders)
    setVanOrders(currentOrders)
  });
  socket.on("error", (error) => console.log(error));
}

export const VanOrdersContextProvider = ({ children }) => {
  const [vanOrders, setVanOrders] = useState([]);
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
    setVanOrders,
    vanSocket,
    connectVanSocket,
  };
  return <VanOrdersContext.Provider value={value}>{children}</VanOrdersContext.Provider>;
};
