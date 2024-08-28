import React from "react";

const Cards = ({ children }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">{children}</div>
  );
};

export default Cards;
