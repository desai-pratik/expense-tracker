import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="my-4">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"pagination flex justify-center items-center space-x-2"}
        previousLinkClassName={"bg-gray-200 px-3 py-1 rounded"}
        nextLinkClassName={"bg-gray-200 px-3 py-1 rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
        activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
        pageClassName={"px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"}
        breakLabel={"..."}
      />
    </div>
  );
};

export default Pagination;
