import React from "react";
import useSnacks, { category } from "../hooks/useSnacks";
import MenuItemCard from "../components/menu.item.card";
import useCart from "../hooks/useCart";
import EditIcon from "../media/edit.icon";
import { Link } from "react-router-dom";
import LocationIcon from "../media/location.icon";
import CartIcon from "../media/cart.icon";
import LoadingLogo from "../components/loading.logo";

export default function Menu() {
  const { loading, snacks, error, updateCategory, setMouseIsOver } = useSnacks();
  const { van, displayCart, cartSize } = useCart();

  return (
    <>
      <LoadingLogo isLoading={loading} error={error} />
      <div className="container">
        <h1>Menu</h1>
        <nav className="categories">
          <div
            onClick={() => {
              updateCategory(0);
            }}
          >
            <h2 className="category">Drinks</h2>
            <div id="category-selector" className={`category-${category.drinks}`}></div>
          </div>
          <div
            onClick={() => {
              updateCategory(1);
            }}
          >
            <h2 className="category inactive">Food</h2>
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
        <div className="menu-van">
          <div>
            <Link to="/" className="soft-shadow button">
              <svg viewBox="0 0 24 24">
                <EditIcon />
              </svg>
            </Link>
            {/* <h4>Your van:</h4> */}
            <section className="chosen-van">
              <svg viewBox="0 0 24 24">
                <LocationIcon />
              </svg>
              <div>
                <h4>Your van:</h4>
                {van ? (
                  <>
                    <h3>{van.vanName}</h3>
                    <p>{van.locationDescription}</p>
                  </>
                ) : (
                  <p>
                    <strong>No van selected</strong>
                  </p>
                )}
              </div>
              {/* <VanInfo /> */}
            </section>
          </div>
          <button onClick={displayCart} className="cart-button primary soft-shadow mobile-only">
            <svg height="24px" viewBox="0 0 24 24" width="24px">
              <CartIcon />
            </svg>
            <div>{cartSize()}</div>
          </button>
        </div>
        <div className="blank-bottom" />
      </div>
    </>
  );
}
