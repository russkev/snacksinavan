import React from "react";
import useVanOrder, { ORDER_SATURATION, ORDER_VALUE } from "../../hooks/useVanOrder";
import VanOrderComplete from "./van.order.complete";
import VanOrderMain from "./van.order.main";
import VanOrderTime from "./van.order.time";

export default function VanOrder({ order }) {
  const { toggleExpand, timeLeft, orderHue, orderTotals, setIsFulfilled, fulfilledClicked } =
    useVanOrder(order);

  const dateTime = new Date(order.updatedAt);
  const date = dateTime.toLocaleDateString();

  return (
    <div className="van order">
      <VanOrderComplete
        label="Fulfilled"
        isClicked={fulfilledClicked}
        setComplete={setIsFulfilled}
      />
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
      />
    </div>
  );
}
