import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import VanOrder from "../components/van/van.order";
import usePagination from "../hooks/usePagination";
import PaginationBar from "../components/pagination.bar";
import "../styling/van.orders.css";

// Displays all the active orders for the logged in van
export default function VanOrders() {
  const { vanOrders } = useVanOrders();
  const { pageInfo, onNextPage, onPrevPage } = usePagination(vanOrders.unfulfilled);

  return (
    <div className="van-bg van-orders">
      <PaginationBar
        orders={vanOrders.unfulfilled}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
      {pageInfo.orders.map((vanOrder) => {
        return <VanOrder key={vanOrder._id} order={vanOrder} />;
      })}
      <PaginationBar
        orders={vanOrders.unfulfilled}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
}
