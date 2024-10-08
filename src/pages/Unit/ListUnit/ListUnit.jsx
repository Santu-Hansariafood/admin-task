import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Mock data for unit list
const units = [
  {
    id: 1,
    unitName: "Unit A",
    unitLocation: "Location A",
    unitState: "California",
    contactNumber: "123-456-7890",
    contactPerson: "John Doe",
  },
  {
    id: 2,
    unitName: "Unit B",
    unitLocation: "Location B",
    unitState: "Texas",
    contactNumber: "987-654-3210",
    contactPerson: "Jane Smith",
  },
  // Add more unit data as needed
];

const ListUnit = () => {
  const handleView = (id) => {
    alert(`Viewing unit with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing unit with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    alert(`Deleted unit with ID: ${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">List Units</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-12 px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Unit Name</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left">Contact Number</th>
                <th className="px-4 py-2 text-left">Contact Person</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr key={unit.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{unit.unitName}</td>
                  <td className="px-4 py-2">{unit.unitLocation}</td>
                  <td className="px-4 py-2">{unit.unitState}</td>
                  <td className="px-4 py-2">{unit.contactNumber}</td>
                  <td className="px-4 py-2">{unit.contactPerson}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(unit.id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(unit.id)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(unit.id)}
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

export default ListUnit;
