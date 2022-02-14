import React from "react";
import useVanOrder from "../../hooks/useVanOrder";
import LoadingButton from "../loading.button";
import VanOrderMain from "./van.order.main";
import VanOrderTime from "./van.order.time";

// Displays a single fulfilled order and its details, along with a button to
// complete the order.
export default function FulfilledOrder({ order }) {
  const { toggleExpand, orderTotals, setIsCompleted, completedClicked } = useVanOrder(order);

  // Get the time and date the order was last updated at
  let dateTime = new Date(order.updatedAt);
  let timeStamp = dateTime.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  let date = dateTime.toLocaleDateString();

  return (
    <div id={`van-fulfilled-card-${order._id}`} className="van fulfilled">
      <section>
        <LoadingButton isLoading={completedClicked}>
          <button onClick={setIsCompleted}>Collected</button>
        </LoadingButton>
      </section>
      <VanOrderMain
        order={order}
        orderTotals={orderTotals}
        date={date}
        toggleExpand={toggleExpand}
      />
      <VanOrderTime
        titleText="Time of order:"
        mainText={timeStamp}
        subHeadingText={date}
        order={order}
      />
    </div>
  );
}
