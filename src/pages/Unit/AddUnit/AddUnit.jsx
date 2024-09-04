import React, { useState } from "react";

// Mock data for states dropdown
const states = [
  { id: 1, name: "California" },
  { id: 2, name: "Texas" },
  { id: 3, name: "New York" },
  // Add more states as needed
];

const AddUnit = () => {
  const [unitName, setUnitName] = useState("");
  const [unitLocation, setUnitLocation] = useState("");
  const [unitState, setUnitState] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      unitName,
      unitLocation,
      unitState,
      contactNumber,
      contactPerson,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Unit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Unit Name</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Added Unit Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unit Location</label>
            <input
              type="text"
              value={unitLocation}
              onChange={(e) => setUnitLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Added Location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unit State</label>
            <select
              value={unitState}
              onChange={(e) => setUnitState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Added Contact number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Person Name</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Added Contact Person Name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUnit;
