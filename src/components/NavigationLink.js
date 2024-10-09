import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ icon, label, link }) => {
  return (
    <Link
      to={link}
      className="block w-full p-2 rounded hover:bg-gray-200 w-60"
    >
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span className="text-lg">{label}</span>
      </div>
    </Link>
  );
};

export default NavigationLink;
