import React, { createContext, useState } from "react";

export const CartContext = createContext([]);

/**
 * Main cart context provider.
 * Provides globally accessible and modifiable states for the useUser hook to interact with.
 */
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const value = {
    cart,
    setCart,
    total,
    setTotal,
    orderId,
    setOrderId,
    order,
    setOrder,
    submitLoading,
    setSubmitLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
