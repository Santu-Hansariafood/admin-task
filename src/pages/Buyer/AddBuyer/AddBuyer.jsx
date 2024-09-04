import React, { useState } from 'react';

// Sample data for state dropdown options
const states = [
  { value: 'California', label: 'California' },
  { value: 'Texas', label: 'Texas' },
  { value: 'New York', label: 'New York' },
];

// Corrected group of company options
const groupOfCompanies = [
  { value: 'Group1', label: 'Group1' },
  { value: 'Group2', label: 'Group2' },
  { value: 'Group3', label: 'Group3' },
];

// Sample data for unit dropdown options
const unitOptions = [
  { value: 'Unit1', label: 'Unit1' },
  { value: 'Unit2', label: 'Unit2' },
  { value: 'Unit3', label: 'Unit3' },
];

const AddBuyer = () => {
  const [name, setName] = useState('');
  const [selectedGroupOfCompany, setSelectedGroupOfCompany] = useState('');
  const [location, setLocation] = useState('');
  const [productCapacity, setProductCapacity] = useState('');
  const [date, setDate] = useState('');
  const [state, setState] = useState('');
  const [units, setUnits] = useState(['']); // State to handle multiple units

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      selectedGroupOfCompany,
      location,
      productCapacity,
      date,
      state,
      units,
    });
  };

  // Function to handle adding a new unit
  const addUnit = () => {
    setUnits([...units, '']);
  };

  // Function to handle removing a unit
  const removeUnit = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  // Function to handle unit change
  const handleUnitChange = (value, index) => {
    const newUnits = [...units];
    newUnits[index] = value;
    setUnits(newUnits);
  };

  // Get available unit options, excluding already selected units
  const getAvailableUnitOptions = (index) => {
    const selectedUnits = units.filter((unit, i) => i !== index);
    return unitOptions.filter((unit) => !selectedUnits.includes(unit.value));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Buyer</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Name"
              required
            />
          </div>

          {/* Group of Company Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Group of Company</label>
            <select
              value={selectedGroupOfCompany}
              onChange={(e) => setSelectedGroupOfCompany(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Group</option>
              {groupOfCompanies.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Location"
              required
            />
          </div>

          {/* State Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Dropdowns */}
          {units.map((unit, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700">Unit {index + 1}</label>
              <div className="flex">
                <select
                  value={unit}
                  onChange={(e) => handleUnitChange(e.target.value, index)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Unit</option>
                  {getAvailableUnitOptions(index).map((unitOption) => (
                    <option key={unitOption.value} value={unitOption.value}>
                      {unitOption.label}
                    </option>
                  ))}
                </select>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeUnit(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addUnit}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors mb-4"
          >
            Add Another Unit
          </button>

          {/* Product Capacity Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Product Capacity</label>
            <input
              type="text"
              value={productCapacity}
              onChange={(e) => setProductCapacity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Product Capacity"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
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

export default AddBuyer;
