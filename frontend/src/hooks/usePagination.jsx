import { useEffect, useState } from "react"

const ORDERS_PER_PAGE = 3;

function initializePageInfo(orders, pageInfo, setPageInfo) {
  if (orders) {
    setPageInfo({
      ...pageInfo,
      total: Math.ceil(orders.length / ORDERS_PER_PAGE),
      from: Math.min(orders.length, 1),
      to: Math.min(ORDERS_PER_PAGE, orders.length),
    });
  }
}

function initializeCurrentPage(orders, pageInfo, setPageOrders) {
  const from = ORDERS_PER_PAGE * (pageInfo.current - 1);
  const to = ORDERS_PER_PAGE * pageInfo.current;
  if (orders) {
    setPageOrders(orders.slice(from, to));
  }
}

function handleNextPage(orders, pageInfo, setPageInfo, setPageOrders) {
  const from = ORDERS_PER_PAGE * pageInfo.current;
  const to = ORDERS_PER_PAGE * (pageInfo.current + 1);
  if (pageInfo.current < pageInfo.total) {
    setPageOrders(orders.slice(from, to));
    setPageInfo({
      ...pageInfo,
      current: pageInfo.current + 1,
      from: from + 1,
      to: Math.min(to, orders.length),
    });
  }
}

function handlePrevPage(orders, pageInfo, setPageInfo, setPageOrders) {
  const from = ORDERS_PER_PAGE * (pageInfo.current - 2);
  const to = ORDERS_PER_PAGE * (pageInfo.current - 1);
  if (pageInfo.current > 1) {
    setPageOrders(
      orders.slice(
        ORDERS_PER_PAGE * (pageInfo.current - 2),
        ORDERS_PER_PAGE * (pageInfo.current - 1)
      )
    );
    setPageInfo({ ...pageInfo, current: pageInfo.current - 1, from: from + 1, to: to });
  }
}

export default function usePagination(orders) {
  const [pageInfo, setPageInfo] = useState({ current: 1, total: 1 });
  const [pageOrders, setPageOrders] = useState([]);

  useEffect(() => {
    initializePageInfo(orders, pageInfo, setPageInfo)
    // Including pageInfo in the dependency array will cause an infinite loop
    // eslint-disable-next-line
  },[orders])

  useEffect(() => {
    initializeCurrentPage(orders, pageInfo, setPageOrders);
    // Including pageInfo in the dependency array will cause an infinite loop
    // eslint-disable-next-line
  }, [orders])

  const onNextPage = (event) => {
    event.preventDefault();
    handleNextPage(orders, pageInfo, setPageInfo, setPageOrders);
  };

  const onPrevPage = (event) => {
    event.preventDefault();
    handlePrevPage(orders, pageInfo, setPageInfo, setPageOrders);
  };

  return {
    pageInfo,
    pageOrders,
    onNextPage,
    onPrevPage
  }


}