import React, { useState } from 'react';

const AddCompanyProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [brokerageRate, setBrokerageRate] = useState('');

  // Mock data for states
  const states = [
    { id: 1, name: 'California' },
    { id: 2, name: 'Texas' },
    { id: 3, name: 'New York' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      companyName,
      selectedState,
      brokerageRate,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Company Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Company Name"
              required
            />
          </div>

          {/* State Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
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

          {/* Brokerage Rate Per Ton Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Brokerage Rate Per Ton</label>
            <input
              type="number"
              value={brokerageRate}
              onChange={(e) => setBrokerageRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Brokerage Rate"
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

export default AddCompanyProfile;
