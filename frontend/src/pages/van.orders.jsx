import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import VanOrder, {NoOrders} from "../components/van/van.order";
import "../styling/van.orders.css"

// Displays all the active orders for the logged in van
export default function VanOrders() {
  const { vanOrders } = useVanOrders();

  return (
      <div className="van-orders">

      <NoOrders vanOrders = {vanOrders} />

      {/* <hr className="van-order-separator" /> */}
        {vanOrders.reduce((result, vanOrder) => {
          if (!vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
            result.push(<VanOrder key={vanOrder._id} order={vanOrder} />);
          }
          return result;
        }, [])}
      </div>
  );
}
