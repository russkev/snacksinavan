import React from "react"

export default function PaginationBar({orders, pageInfo, onNextPage, onPrevPage}) {
  return (
    <div className="pages">
      <p>{`${pageInfo.from} - ${pageInfo.to} of ${orders.length} orders`}</p>
      <div>
        <button
          className={pageInfo.current === 1 ? "pages disabled" : "pages"}
          onClick={onPrevPage}
        >
          {"<"}
        </button>
        <button
          className={pageInfo.current >= pageInfo.total ? "pages disabled" : "pages"}
          onClick={onNextPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}