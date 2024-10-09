import React from "react";

const ExpenseFilters = ({ filterText, onFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="Filter by Amount, description, category, or date"
      value={filterText}
      onChange={onFilterChange}
      className="border p-2 mb-4 w-96 outline-none"
    />
  );
};

export default ExpenseFilters;
