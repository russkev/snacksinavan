import React from "react";
import useVanOrder, { ORDER_SATURATION, ORDER_VALUE } from "../../hooks/useVanOrder";
import LoadingButton from "../loading.button";
import VanOrderMain from "./van.order.main";
import VanOrderTime from "./van.order.time";

export default function VanOrder({ order }) {
  const { 
    toggleExpand, 
    timeLeft, 
    orderHue, 
    orderTotals, 
    setIsFulfilled, 
    fulfilledClicked 
  } = useVanOrder(order);

  const dateTime = new Date(order.updatedAt);
  const date = dateTime.toLocaleDateString();

  return (
    <div id={`van-order-card-${order._id}`} className="van van-order">
      <section>
        <LoadingButton isLoading={fulfilledClicked}>
          <button onClick={setIsFulfilled}>Fulfilled</button>
        </LoadingButton>
      </section>
      <VanOrderMain
        order={order}
        orderTotals={orderTotals}
        date={date}
        toggleExpand={toggleExpand}
      />
      <VanOrderTime
        titleText="Time left to prepare:"
        mainText={timeLeft}
        tagColor={`hsl(${orderHue}, ${ORDER_SATURATION}, ${ORDER_VALUE})`}
        order={order}
      />
    </div>
  );
}
