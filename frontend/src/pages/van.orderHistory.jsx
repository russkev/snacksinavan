import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import CompletedOrder from "../components/van/van.completed.order";
import usePagination from "../hooks/usePagination";
import PaginationBar from "../components/pagination.bar";

// Displays all the completed orders (order history) for the logged in van
export default function VanOrderHistory() {
  const { vanOrders } = useVanOrders();
  const { pageInfo, pageOrders, onNextPage, onPrevPage } = usePagination(vanOrders.completed);

  return (
    <div className="van-bg van-completed">
      <PaginationBar
        orders={vanOrders.completed}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
      {pageOrders.map((vanOrder) => {
        return <CompletedOrder key={vanOrder._id} order={vanOrder} />;
      })}
      <PaginationBar
        orders={vanOrders.completed}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
}
