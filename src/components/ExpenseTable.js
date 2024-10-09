import React from "react";
import { MdBookmarkAdded, MdEditNote } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"; // Ensure you import the arrow icons

const ExpenseTable = ({ currentPageItems, editableRow, onEditClick, onEditChange, onSaveEdit, handleSort, getArrow }) => {
  return (
    <table className="min-w-full table-auto bg-white shadow-md rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 cursor-pointer" onClick={() => handleSort("amount")}>
            <div className="flex items-center">

            Amount {getArrow("amount")}
            </div>
          </th>
          <th className="p-2 cursor-pointer" onClick={() => handleSort("date")}>
            <div className="flex items-center">

            Date {getArrow("date")}
            </div>
          </th>
          <th className="p-2 cursor-pointer" onClick={() => handleSort("category")}>
            <div className="flex items-center">

            Category {getArrow("category")}
            </div>
          </th>
          <th className="p-2 text-start cursor-pointer" onClick={() => handleSort("description")}>
            <div className="flex items-center">
            Description {getArrow("description")}

            </div>
          </th>
          <th className="p-2 text-start cursor-pointer" onClick={() => handleSort("paymentMethod")}>
            <div className="flex items-center">
            Payment Method {getArrow("paymentMethod")}

            </div>
          </th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentPageItems.map((expense, index) => (
          <tr key={expense.id} className="border-b">
            {editableRow === index ? (
              <>
                <td className="p-2">
                  <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={(e) => onEditChange(e, index)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={(e) => onEditChange(e, index)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    name="category"
                    value={expense.category}
                    onChange={(e) => onEditChange(e, index)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    name="description"
                    value={expense.description}
                    onChange={(e) => onEditChange(e, index)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <select
                    name="paymentMethod"
                    value={expense.paymentMethod}
                    onChange={(e) => onEditChange(e, index)}
                    className="border p-1 w-full"
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                  </select>
                </td>
                <td className="p-2">
                  <button onClick={() => onSaveEdit(index)} className="bg-green-500 text-white px-2 py-1 rounded">
                    <MdBookmarkAdded />
                  </button>
                  <button onClick={() => onEditClick(null)} className="bg-gray-500 text-white px-2 py-1 rounded ml-2">
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
                  <button onClick={() => onEditClick(index)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    <MdEditNote />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
