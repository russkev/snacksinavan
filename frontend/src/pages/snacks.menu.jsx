import React from "react";
import useSnacks from "../hooks/useSnacks";
import MenuItemCard from "../components/menu.item.card";
import CheckoutButton from "../components/checkout.button";
import BackButton from "../components/navigation/back.button";
import useCart from "../hooks/useCart";
import Routes from "../routes/routes";
import "../styling/snack.menu.css";

export default function Menu() {
  const { loading, snacks, error, updateCategory } = useSnacks();
  const { cart, setCart, total, setTotal, /*orderId,*/ van } = useCart();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  // var heading;
  // if (!orderId) {
  //   heading = "Menu";
  // }
  // else {
  //   heading = "Change Order";
  // }

  return (
    <div className="container">
      <h1>Menu</h1>
      <nav className="categories">
        <div
          onClick={() => {
            updateCategory(0);
          }}
        >
          <h2>Drinks</h2>
          <div id="category-selector" className="category-left"></div>
        </div>
        <div
          onClick={() => {
            updateCategory(1);
          }}
        >
          <h2>Food</h2>
        </div>
      </nav>
      {van ? (
        <h4 className="van-sub-heading">Ordering From: {van}</h4>
      ) : (
        <>
          <h4 className="van-sub-heading">No van currently selected</h4>
        </>
      )}
      <div className="menu-list" id="menu-list-1">
        {snacks.length > 0 ? (
          snacks.map((menuItem) => (
            <MenuItemCard
              key={menuItem.name}
              snack={menuItem}
              cart={cart}
              setCart={setCart}
              total={total}
              setTotal={setTotal}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <BackButton to={Routes.HOME.path} />
      <CheckoutButton cart={cart} />
      <div className="blank-bottom" />
    </div>
  );
}
