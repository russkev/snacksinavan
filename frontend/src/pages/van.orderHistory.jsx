import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import Order, {NoOrders} from "../components/van/van.completed.order";

// Displays all the completed orders (order history) for the logged in van
export default function VanOrderHistory() {
  const { vanOrders } = useVanOrders();
  const orders = JSON.parse(JSON.stringify(vanOrders));
  orders.reverse();

  
  return (
    <>
      <section className="van-order-bg history-bg">

     
      <NoOrders vanOrders = {vanOrders} />

      <hr className="van-order-separator" />
        {orders.reduce((result, vanOrder) => {
          if (vanOrder.isCompleted && !vanOrder.isCancelled) {
            result.push(<Order key={vanOrder._id} order={vanOrder} />);
          }
          return result;
        }, [])}
      </section>
    </>
  );
}
