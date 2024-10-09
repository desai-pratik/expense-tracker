import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const DeleteCatToolTip = () => {
  return (
    <div className="relative inline-block">
      <div className="tooltip tooltip-info hidden group-hover:block absolute z-10 w-80 p-2 text-sm text-white bg-gray-800 rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2">
        Select a category and click 'Delete Category' to delete the selected category. This will only delete the category from the dropdown menu. You cannot delete a category that is being used.
      </div>
      <button
        className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-800 group"
        onMouseEnter={(e) => {
          const tooltip = e.currentTarget.nextElementSibling;
          if (tooltip) tooltip.classList.remove("hidden");
        }}
        onMouseLeave={(e) => {
          const tooltip = e.currentTarget.nextElementSibling;
          if (tooltip) tooltip.classList.add("hidden");
        }}
      >
        <AiOutlineInfoCircle className="text-xl" />
      </button>
    </div>
  );
};

export default DeleteCatToolTip;
