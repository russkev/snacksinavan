import { useEffect, useReducer } from "react";

const ORDERS_PER_PAGE = 3;

const initialPaginationState = {
  current: 1,
  total: 1,
  from: 0,
  to: 0,
  orders: [],
};

function paginationReducer(paginationInfo, {type, allOrders}) {
  switch (type) {
    case "initial":
      if (allOrders) {
        const from = ORDERS_PER_PAGE * (paginationInfo.current - 1);
        const to = ORDERS_PER_PAGE * paginationInfo.current;
        return {
          ...paginationInfo,
          total: Math.ceil(allOrders.length / ORDERS_PER_PAGE),
          from: Math.min(allOrders.length, 1),
          to: Math.min(ORDERS_PER_PAGE, allOrders.length),
          orders: allOrders.slice(from, to),
        };
      } else {
        return paginationInfo;
      }
    case "nextPage":
      if (paginationInfo.current < paginationInfo.total) {
        const from = ORDERS_PER_PAGE * paginationInfo.current;
        const to = ORDERS_PER_PAGE * (paginationInfo.current + 1);
        return {
          ...paginationInfo,
          current: paginationInfo.current + 1,
          from: from + 1,
          to: Math.min(to, allOrders.length),
          orders: allOrders.slice(from, to),
        };
      } else {
        return paginationInfo;
      }
    case "prevPage":
      if (paginationInfo.current > 1) {
        const from = ORDERS_PER_PAGE * (paginationInfo.current - 2);
        const to = ORDERS_PER_PAGE * (paginationInfo.current - 1);
        return {
          ...paginationInfo,
          current: paginationInfo.current - 1,
          from: from + 1,
          to: to,
          orders: allOrders.slice(
            ORDERS_PER_PAGE * (paginationInfo.current - 2),
            ORDERS_PER_PAGE * (paginationInfo.current - 1)
          ),
        };
      } else {
        return paginationInfo;
      }
    default:
      return paginationInfo;
  }
}

export default function usePagination(orders) {
  const [pageInfo, dispatch] = useReducer(paginationReducer, initialPaginationState);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch({ type: "initial", allOrders: orders });
      ignore = true;
    }
    return () => { ignore = true; }
  }, [orders]);

  const onNextPage = (event) => {
    event.preventDefault();
    dispatch({ type: "nextPage", allOrders: orders });
  };

  const onPrevPage = (event) => {
    event.preventDefault();
    dispatch({ type: "prevPage", allOrders: orders });
  };

  return {
    pageInfo,
    onNextPage,
    onPrevPage,
  };
}
