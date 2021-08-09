import React from "react";
import useVanOrder from "../../hooks/useVanOrder";
import VanOrderMain from "./van.order.main";
import VanOrderTime from "./van.order.time";

// Displays a single completed order and its details
export default function CompletedOrder({ order }) {
  const { toggleExpand, orderTotals } = useVanOrder(order);

  // Dealing with the date and time
  let dateTime = new Date(order.updatedAt);
  let timeStamp = dateTime.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  let date = dateTime.toLocaleDateString();
  
  return (
    <div className="van completed">
      <VanOrderMain
        order={order}
        orderTotals={orderTotals}
        date={date}
        toggleExpand={toggleExpand}
        hasRating
        rating={order.rating}
        feedback={order.feedback}
      />
      <VanOrderTime 
        titleText="Time of order"
        mainText={timeStamp}
        subHeadingText={date}
        order={order}
      />
    </div>
  );
}
