import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Charts from "../components/ExpenseCharts";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseTable from "../components/ExpenseTable";
import Pagination from "../components/Pagination";
import { dummyExpenses } from "../dummyData";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "amount", direction: "asc" });
  const [editableRow, setEditableRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expensesData")) || {};
  
    const allExpenses = Object.values(storedData).flat(); // Flatten grouped data by category
    if (allExpenses.length === 0) {
      localStorage.setItem("expensesData", JSON.stringify(dummyExpenses));
      setExpenses(dummyExpenses);
      setFilteredExpenses(dummyExpenses);
    } else {
      setExpenses(allExpenses);
      setFilteredExpenses(allExpenses);
    }
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
        String(expense.amount).includes(value) ||
        expense.date.includes(value)
      );
    });
  
    setFilteredExpenses(filtered);
    setCurrentPage(0);
  };
  
 
  

  return (
    <PageContainer>
      <Charts expenses={expenses} filteredExpenses={filteredExpenses} />
      <div className="flex items-end justify-between">
        <h1 className="text-xl font-bold mb-4">Expense List</h1>
        <ExpenseFilters filterText={filterText} onFilterChange={handleFilterChange}/>
      </div>
      <div className="overflow-x-auto">
      <ExpenseTable
          currentPageItems={currentPageItems}
          editableRow={editableRow}
          onEditClick={setEditableRow}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
          handleSort={handleSort}
          getArrow={getArrow}
        />
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </PageContainer>
  );
};

export default HomePage;
