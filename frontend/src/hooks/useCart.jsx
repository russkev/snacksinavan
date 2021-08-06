import { useContext } from "react";
import { CartContext } from "../contexts/cart.context.jsx";
import useOrders from "../hooks/useOrders";
import { VanContext } from "../contexts/van.context.jsx";
import { useHistory } from "react-router-dom";
import useLogin from "./useLogin";
import useUser from "./useUser";

async function postOrder(socket, cart, van, onOrderSuccess) {
  // console.log(cart)
  // var sendArr = [];
  // for (var i in cart) {
  //   for (var j = 0; j < cart[i]; j++) {
  //     sendArr.push(i);
  //   }
  // }

  // console.log(sendArr)
  const toSend = {
    snacks: cart,
    vanName: van,
  };

  socket.emit("createOrder", toSend);
  socket.on("error", (error) => {
    console.log(error);
    return false;
  });

  const newOrder = await socket.on("orderCreated", (newOrder) => {
    onOrderSuccess(newOrder._id);
    return newOrder;
  });

  return newOrder;
}

async function postOrderUpdate(socket, cart, orderId, onOrderSuccess) {
  var sendArr = [];
  for (var i in cart) {
    for (var j = 0; j < cart[i]; j++) {
      sendArr.push(i);
    }
  }
  const toSend = {
    orderId: orderId,
    snacks: sendArr,
  };
  socket.emit("orderModify", toSend);
  socket.on("error", (error) => console.log(error));
  const newOrder = await socket.on("orderModified", (changedOrder) => {
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
  const { setCurrentOrderId, socket } = useOrders();
  const { van, setVan } = useContext(VanContext);
  const history = useHistory();
  const { toggleLoginIsOpen } = useLogin();
  const { isAuthenticated } = useUser();

  function onOrderSuccess(orderId) {
    history.push(`/customer/orders/${orderId}`);
    setSubmitLoading(false)
    setCurrentOrderId(orderId);
    setCart({});
    setTotal(0);
    setOrderId("");
    setOrder();
  }

  function displayCart() {
    const confirmCart = document.getElementById("confirm-cart");
    confirmCart.classList.remove("slide-menu")
    confirmCart.classList.add("slide-cart")
  }

  function displayMenu() {
    const confirmCart = document.getElementById("confirm-cart");
    confirmCart.classList.remove("slide-cart");
    confirmCart.classList.add("slide-menu");
  }

  function updateCart(snack, count) {
    const snackName = snack["name"];
    let currCount = 0;
    if (snack.name in cart) {
      if (cart[snackName] + count > -1) {
        currCount = count;
        setCart({
          ...cart,
          [snackName]: cart[snackName] + count,
        });
      }
    } else {
      if (count > -1) {
        currCount = count;
        setCart({
          ...cart,
          [snackName]: currCount,
        });
      }
    }
    setTotal(total + snack.price * currCount);
  }

  function appendCart(snack, count) {
    const snackName = snack["name"];
    const oldCount = cart[snackName] ? cart[snackName] : 0;
    setCart({...cart, [snackName]: count})
    setTotal(total - oldCount * snack.price + count * snack.price)
  }

  function deleteFromCart(snack) {
    const {[snack]: _, ...newCart} = cart;
    console.log(newCart)
    setCart(newCart);
  }

  async function submitCart(event) {
    setSubmitLoading(true)
    if (isAuthenticated) {
      setOrderId("");
      if (event) {
        event.preventDefault();
      }
      var orderIsSuccessful = false;
      try {
        if (orderId) {
          orderIsSuccessful = await postOrderUpdate(socket, cart, orderId, onOrderSuccess);
        } else {
          orderIsSuccessful = await postOrder(socket, cart, van, onOrderSuccess);
        }
      } catch (error) {
        console.log(error);
      }
      return orderIsSuccessful;
    } else {
      toggleLoginIsOpen();
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
    var snacks = order["snacks"];
    var total = 0;
    var tempCart = {};
    for (var i in snacks) {
      if (snacks[i].name in tempCart) {
        tempCart[snacks[i].name] = tempCart[snacks[i].name] + 1;
      } else {
        tempCart[snacks[i].name] = 1;
      }
      total += snacks[i].price;
    }
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
  };
}
