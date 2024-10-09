import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import { MdBookmarkAdded, MdEditNote, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import Charts from "../components/ExpenseCharts";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "amount", direction: "asc" });
  const [editableRow, setEditableRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expensesData")) || {};
    const allExpenses = Object.values(storedData).flat();
    setExpenses(allExpenses);
    setFilteredExpenses(allExpenses);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredExpenses(sortedExpenses);
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />;
    }
    return <MdKeyboardArrowUp />;
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredExpenses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...filteredExpenses];
    updatedExpenses[index][name] = value;
    setFilteredExpenses(updatedExpenses);
  };

  const handleSaveEdit = (index) => {
    const updatedExpense = filteredExpenses[index];
    const existingData = JSON.parse(localStorage.getItem("expensesData")) || {};

    existingData[updatedExpense.id] = updatedExpense;

    localStorage.setItem("expensesData", JSON.stringify(existingData));
    setEditableRow(null);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filtered = expenses.filter((expense) => {
      return (
        expense.description.toLowerCase().includes(value.toLowerCase()) ||
        expense.category.toLowerCase().includes(value.toLowerCase()) ||
        expense.amount.toLowerCase().includes(value.toLowerCase()) ||
        expense.date.includes(value) ||
        String(expense.amount).includes(value)
      );
    });

    setFilteredExpenses(filtered);
    setCurrentPage(0);
  };

  return (
    <PageContainer>
      <Charts expenses={expenses} filteredExpenses={filteredExpenses} />
      <h1 className="text-2xl font-bold mb-4">Expense List</h1>
      <input
        type="text"
        placeholder="Filter by Amount description, category, or date"
        value={filterText}
        onChange={handleFilterChange}
        className="border p-2 mb-4 w-full outline-none"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("amount")}>
                <div className="flex items-center">Amount {getArrow("amount")}</div>
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center"> Date {getArrow("date")}</div>
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center"> Category {getArrow("category")}</div>
              </th>
              <th className="p-2 text-start">Description</th>
              <th className="p-2 text-start">Payment Method</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((expense, index) => (
              <tr key={index} className="border-b">
                {editableRow === index ? (
                  <>
                    <td className="p-2">
                      <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={(e) => handleEditChange(e, index)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={(e) => handleEditChange(e, index)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="category"
                        value={expense.category}
                        onChange={(e) => handleEditChange(e, index)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="description"
                        value={expense.description}
                        onChange={(e) => handleEditChange(e, index)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        name="paymentMethod"
                        value={expense.paymentMethod}
                        onChange={(e) => handleEditChange(e, index)}
                        className="border p-1 w-full"
                      >
                        <option value="cash">Cash</option>
                        <option value="credit">Credit Card</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <button onClick={() => handleSaveEdit(index)} className="bg-green-500 text-white px-2 py-1 rounded">
                        <MdBookmarkAdded />
                      </button>
                      <button onClick={() => setEditableRow(null)} className="bg-gray-500 text-white px-2 py-1 rounded ml-2">
                        <CgClose />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{expense.amount}</td>
                    <td className="p-2">{expense.date}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">{expense.description}</td>
                    <td className="p-2">{expense.paymentMethod}</td>
                    <td className="p-2 text-center">
                      <button onClick={() => setEditableRow(index)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        <MdEditNote />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center items-center space-x-2"}
            previousLinkClassName={"bg-gray-200 px-3 py-1 rounded"}
            nextLinkClassName={"bg-gray-200 px-3 py-1 rounded"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
            pageClassName={"px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"}
            breakLabel={"..."}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
