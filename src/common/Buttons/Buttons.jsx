import React from "react";

const Buttons = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Buttons;
