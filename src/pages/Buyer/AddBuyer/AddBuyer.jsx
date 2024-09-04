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

const AddBuyer = () => {
  const [name, setName] = useState('');
  const [selectedGroupOfCompany, setSelectedGroupOfCompany] = useState('');
  const [location, setLocation] = useState([]); // State for multiple selected locations
  const [productCapacity, setProductCapacity] = useState('');
  const [date, setDate] = useState('');
  const [state, setState] = useState('');

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
    });
  };

  // Handle change for adding a location
  const handleAddLocation = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !location.includes(selectedValue)) {
      setLocation([...location, selectedValue]);
    }
    e.target.value = ''; // Reset dropdown after selection
  };

  // Function to remove a location
  const handleRemoveLocation = (locationToRemove) => {
    setLocation(location.filter(loc => loc !== locationToRemove));
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

          {/* Location Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <select
              onChange={handleAddLocation}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Location</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {/* Display selected locations as tags */}
            <div className="mt-2 flex flex-wrap">
              {location.map((loc) => (
                <div
                  key={loc}
                  className="bg-blue-100 text-blue-800 font-semibold py-1 px-3 rounded-full m-1 flex items-center"
                >
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
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
