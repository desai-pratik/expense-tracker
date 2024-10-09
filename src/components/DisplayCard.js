import React from "react";

const DisplayCard = ({ label, amount }) => {
  return (
    <div className="shadow-sm p-8 mb-12 h-64 flex flex-col justify-center items-center text-center bg-white rounded-lg">
      <h2 className="font-medium text-2xl mt-4">{label}</h2>
      <p className="mt-2 text-2xl font-medium">
        ${amount.toLocaleString("en-US")}
      </p>
    </div>
  );
};

export default DisplayCard;
