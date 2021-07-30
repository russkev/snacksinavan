import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import VanOrder, {NoOrders} from "../components/van/van.fulfilled.order";

// Displays all the fulfilled (and not completed) orders for the logged in van
export default function VanOrders() {
  const { vanOrders } = useVanOrders();

  return (
    <>
        <section className="van-order-bg fulfilled-bg">

         <NoOrders vanOrders = {vanOrders} />

          <hr className="van-order-separator" />
            {vanOrders.reduce((result, vanOrder) => {
                if (vanOrder.isFulfilled && !vanOrder.isCompleted && !vanOrder.isCancelled) {
                  result.push(<VanOrder key={vanOrder._id} order={vanOrder} />)
                }
                return result
            }, [])}
        </section>
    </>
  )
}


  