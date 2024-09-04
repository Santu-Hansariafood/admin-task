import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const RateList = () => {
  const [rates, setRates] = useState([
    { id: 1, date: "2024-09-01", rate: 100 },
    { id: 2, date: "2024-09-02", rate: 150 },
    // Add more rate data here
  ]);

  const handleView = (id) => {
    alert(`Viewing rate with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing rate with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setRates(rates.filter((rate) => rate.id !== id));
    alert(`Deleted rate with ID: ${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">List Rates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-12 px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Rate</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate, index) => (
                <tr key={rate.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{rate.date}</td>
                  <td className="px-4 py-2">{rate.rate}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(rate.id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(rate.id)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rate.id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RateList;
