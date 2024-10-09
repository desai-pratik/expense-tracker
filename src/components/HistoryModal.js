import React, { useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

const HistoryModal = ({
  opened,
  setOpened,
  label,
  amount,
  dateCreated,
  type,
  id,
  category,
}) => {
  const { deleteHistoryElement } = useContext(HistoryContext);
  const { subtractCategoryAmount, addCategory } = useContext(CategoriesContext);

  // Handle delete action
  const handleDelete = () => {
    deleteHistoryElement(id);
    if (type === "Expenses Reset") {
      addCategory({
        label: "Uncategorized",
        amount: amount,
        id: crypto.randomUUID(),
      });
    } else if (type === "Budget Reset") {
      addCategory({
        label: "Budget",
        amount: amount,
        id: crypto.randomUUID(),
      });
    }
    subtractCategoryAmount(category, amount);
    setOpened(false);
  };

  // If the modal is not open, do not render it
  if (!opened) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
        <p>
          <span className="font-bold">Label:</span> {label}
        </p>
        <p>
          <span className="font-bold">Type:</span> {type}
        </p>
        <p>
          <span className="font-bold">Amount:</span> ${amount.toLocaleString()}
        </p>
        <p>
          <span className="font-bold">Category:</span> {category}
        </p>
        <p>
          <span className="font-bold">Date Created:</span> {dateCreated}
        </p>
        <p>
          <span className="font-bold">ID:</span> {id}
        </p>
        <div className="flex gap-4 mt-6">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => setOpened(false)}
          >
            Exit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;

