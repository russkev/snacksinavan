import React from "react";
import useVanOrders from "../hooks/useVanOrders";
import FulfilledOrder from "../components/van/van.fulfilled.order";
import usePagination from "../hooks/usePagination";
import PaginationBar from "../components/pagination.bar";

// Displays all the fulfilled (and not completed) orders for the logged in van
export default function VanOrders() {
  const { vanOrders } = useVanOrders();
  const { pageInfo, pageOrders, onNextPage, onPrevPage } = usePagination(vanOrders.uncompleted);


  return (
    <div className="van-bg van-fulfilled">
      <PaginationBar
        orders={vanOrders.uncompleted}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
      {pageOrders.map((vanOrder) => {
        return <FulfilledOrder key={vanOrder._id} order={vanOrder} />;
      })}
      <PaginationBar
        orders={vanOrders.uncompleted}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
}
