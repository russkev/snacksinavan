import React from "react";
import useSnacks from "../hooks/useSnacks";
import MenuItemCard from "../components/menu.item.card";
import CheckoutButton from "../components/checkout.button";
import BackButton from "../components/navigation/back.button";
import useCart from "../hooks/useCart";
import useVans from "../hooks/useVans";
import Routes from "../routes/routes";
import "../styling/snack.menu.css";
import EditIcon from "../media/edit.icon";
import { Link } from "react-router-dom";
import LocationIcon from "../media/location.icon";

export default function Menu() {
  const { loading, snacks, error, updateCategory, setMouseIsOver } = useSnacks();
  const { cart, setCart, total, setTotal, /*orderId,*/ van } = useCart();
  const { vanFromName, vans } = useVans();
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

  function VanInfo() {
    // console.log(van)
    // console.log(vanFromName(van))

    const vanObject = vanFromName(van);
    if (van && vanObject) {
      return (
        <div>
          <h3>{van}</h3>
          <p>{vanObject.locationDescription}</p>
        </div>
      );
    } else {
      return (
        <p>
          No van selected. You must <Link to="/">select a van</Link> to be able to complete an
          order.
        </p>
      );
    }
  }

  return (
    // <div className="container">
    <>
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
      <div
        className="menu-list"
        id="menu-list-1"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        {snacks.length > 0 ? (
          snacks.map((menuItem) => <MenuItemCard key={menuItem.name} snack={menuItem} />)
        ) : (
          <></>
        )}
      </div>
      {/* <BackButton to={Routes.HOME.path} /> */}
      {/* <CheckoutButton cart={cart} /> */}
      <div className="menu-van">
        <div style={van ? {} : {border: "2px solid var(--warning)"}}>
          <Link to="/" className="soft-shadow button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <EditIcon />
            </svg>
          </Link>
          <h4>Your van</h4>
          <section>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px">
              <LocationIcon />
            </svg>
            <VanInfo />
          </section>
        </div>
      </div>
      <div className="blank-bottom" />
    </>
    // </div>
  );
}
