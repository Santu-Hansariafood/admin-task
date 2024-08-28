import React from "react";

const InputText = ({ type, placeholder, value, onChange, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2 font-semibold">{label}</label>
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded outline-green-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputText;
