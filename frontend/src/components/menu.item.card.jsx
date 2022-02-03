import React from "react";

export default function MenuItemCard({ snack, setSnack, toggleModal }) {
  const handleMenuCardClick = () => {
    setSnack(snack);
    toggleModal();
  };

  console.log(snack)

  return (
    <>
      <div className="menu-item-card" onClick={handleMenuCardClick} id={snack.name}>
        <img src={`../${snack.photo.medium}`} alt={snack.name} />
        <div>
          <section>
            <h3>{snack.name}</h3>
            <p className="menu-item-card-description">{snack.description}</p>
          </section>
          <h2>
            <div>{`$${snack.price.toFixed(2)}`}</div>
          </h2>
        </div>
      </div>
    </>
  );
}
