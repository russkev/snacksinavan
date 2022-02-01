import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart.context.jsx";
import useOrders from "../hooks/useOrders";
import { VanContext } from "../contexts/van.context.jsx";
import { useHistory } from "react-router-dom";
import useLogin from "./useLogin";
import useUser from "./useUser";
import useVans from "./useVans";
import useSnackbar from "./useSnackbar.jsx";

async function postOrder(socket, cart, van, onOrderSuccess, onOrderFail) {
  const toSend = {
    snacks: cart,
    vanName: van.vanName,
  };

  socket.emit("createOrder", toSend);
  socket.on("error", (error) => {
    console.log(error);
    onOrderFail(error);
    return false;
  });

  const newOrder = await socket.on("orderCreated", (newOrder) => {
    onOrderSuccess(newOrder._id);
    return newOrder;
  });

  return newOrder;
}

async function postOrderUpdate(socket, cart, orderId, onOrderSuccess, onOrderFail) {
  const toSend = {
    orderId: orderId,
    snacks: cart,
  };
  socket.emit("orderModify", toSend);
  socket.on("error", (error) => {
    console.log(error);
    onOrderFail(error);
    return false;
  });
  const newOrder = await socket.on("orderModified", (changedOrder) => {
    console.log(changedOrder);
    onOrderSuccess(changedOrder._id);
    return true;
  });

  return newOrder;
}

export default function useCart() {
  const {
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
  } = useContext(CartContext);

  const { setCurrentOrderId, socket, setOrdersLoading } = useOrders();
  const { van, setVan } = useContext(VanContext);
  const [vanChoiceLoading, setVanChoiceLoading] = useState(false);
  const history = useHistory();
  const { toggleLoginIsOpen } = useLogin();
  const { isAuthenticated } = useUser();
  const { vanFromName } = useVans();
  const [isShowing, setIsShowing] = useState(false);
  const { handleSnackbarMessage } = useSnackbar()

  function onOrderSuccess(orderId) {
    setOrdersLoading(true);
    setSubmitLoading(true);
    setCurrentOrderId(orderId);
    setCart({});
    setTotal(0);
    setOrderId("");
    setOrder();

    setTimeout(() => {
      setSubmitLoading(false);
      history.push(`/customer/orders/${orderId}`);
    }, 300);
  }

  function onOrderFail(message) {
    setSubmitLoading(false);
    handleSnackbarMessage(message, false);
  }

  function displayCart() {
    const confirmCart = document.getElementById("confirm-cart");
    confirmCart.classList.remove("slide-menu");
    confirmCart.classList.add("slide-cart");
    setIsShowing(true);
  }

  function displayMenu() {
    const confirmCart = document.getElementById("confirm-cart");
    confirmCart.classList.remove("slide-cart");
    confirmCart.classList.add("slide-menu");
    setIsShowing(false);
  }

  function updateVan(vanName) {
    try {
      setVanChoiceLoading(true);
      setVan(vanFromName(vanName));
    } catch (error) {
      handleSnackbarMessage(error)
      console.log(error);
    } finally {
      setVanChoiceLoading(false);
    }
  }

  function updateCart(snack, count) {
    const snackId = snack["_id"];
    if (cart[snackId] && cart[snackId] + count >= 0) {
      const newCount = cart[snackId] + count;
      setCart({ ...cart, [snackId]: newCount });
      setTotal(total + snack.price * count);
    } else if (count >= 0) {
      setCart({ ...cart, [snackId]: count });
      setTotal(total + snack.price * count);
    }
  }

  function appendCart(snack, count) {
    const snackId = snack["_id"];
    const oldCount = cart[snackId] ? cart[snackId] : 0;
    setCart({ ...cart, [snackId]: count });
    setTotal(total - oldCount * snack.price + count * snack.price);
  }

  function deleteFromCart(snack) {
    const { [snack]: _, ...newCart } = cart;
    setCart(newCart);
  }

  async function submitCart(event) {
    setSubmitLoading(true);
    if (isAuthenticated) {
      setOrderId("");
      if (event) {
        event.preventDefault();
      }
      var orderIsSuccessful = false;
      try {
        if (orderId) {
          orderIsSuccessful = await postOrderUpdate(
            socket,
            cart,
            orderId,
            onOrderSuccess,
            onOrderFail
          );
        } else {
          orderIsSuccessful = await postOrder(socket, cart, van, onOrderSuccess, onOrderFail);
        }
      } catch (error) {
        console.log(error);
        handleSnackbarMessage(error, false)
        setSubmitLoading(false);
      }
      return orderIsSuccessful;
    } else {
      toggleLoginIsOpen();
      setSubmitLoading(false);
    }
  }

  function cartSize() {
    let count = 0;
    for (const key in cart) {
      count += cart[key];
    }
    return count;
  }

  function setOrderCart(order) {
    const tempCart = {};

    order.snacks.forEach((snackGroup) => {
      tempCart[snackGroup.snack._id] = snackGroup.quantity;
    });

    setCart(tempCart);
    setVan(order.van.vanName);
    setOrderId(order._id);
    setOrder(order);
    setTotal(total);
  }
  function resetCart() {
    setCart({});
    setTotal(0);
    setOrderId("");
    setOrder();
  }

  return {
    cart,
    setCart,
    total,
    setTotal,
    orderId,
    updateCart,
    deleteFromCart,
    submitCart,
    cartSize,
    setOrderCart,
    van,
    order,
    resetCart,
    submitLoading,
    appendCart,
    displayCart,
    displayMenu,
    updateVan,
    vanChoiceLoading,
    isShowing,
  };
}
