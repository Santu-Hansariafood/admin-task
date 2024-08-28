import React, { useState } from 'react';
import Select from 'react-select'; // For multi-select dropdowns
import { FaPlus, FaMinus } from 'react-icons/fa'; // Icons for add and remove

// Mock data for units, states, and commodities
const units = [
  { value: 'Unit A', label: 'Unit A' },
  { value: 'Unit B', label: 'Unit B' },
  { value: 'Unit C', label: 'Unit C' },
];

const states = [
  { id: 1, name: 'California' },
  { id: 2, name: 'Texas' },
  { id: 3, name: 'New York' },
];

const commodities = [
  { value: 'Rice', label: 'Rice' },
  { value: 'Wheat', label: 'Wheat' },
  { value: 'Barley', label: 'Barley' },
];

const AddCompanyProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [contactNumbers, setContactNumbers] = useState(['']);
  const [contactPersons, setContactPersons] = useState(['']);
  const [selectedCommodities, setSelectedCommodities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      companyName,
      selectedUnits,
      selectedState,
      contactNumbers,
      contactPersons,
      selectedCommodities,
    });
  };

  const handleAddContactNumber = () => {
    setContactNumbers([...contactNumbers, '']);
  };

  const handleRemoveContactNumber = (index) => {
    const newContactNumbers = contactNumbers.filter((_, i) => i !== index);
    setContactNumbers(newContactNumbers);
  };

  const handleContactNumberChange = (value, index) => {
    const newContactNumbers = [...contactNumbers];
    newContactNumbers[index] = value;
    setContactNumbers(newContactNumbers);
  };

  const handleAddContactPerson = () => {
    setContactPersons([...contactPersons, '']);
  };

  const handleRemoveContactPerson = (index) => {
    const newContactPersons = contactPersons.filter((_, i) => i !== index);
    setContactPersons(newContactPersons);
  };

  const handleContactPersonChange = (value, index) => {
    const newContactPersons = [...contactPersons];
    newContactPersons[index] = value;
    setContactPersons(newContactPersons);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Company Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Select Unit</label>
            <Select
              options={units}
              isMulti
              value={selectedUnits}
              onChange={setSelectedUnits}
              className="w-full mt-1"
              placeholder="Select Units"
            />
          </div>

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

          {/* Multiple Contact Numbers */}
          <div className="mb-4">
            <label className="block text-gray-700">Contact Numbers</label>
            {contactNumbers.map((number, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => handleContactNumberChange(e.target.value, index)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <div className="ml-2 flex">
                  <button
                    type="button"
                    onClick={() => handleAddContactNumber()}
                    className="text-green-600 hover:text-green-800 mr-2"
                  >
                    <FaPlus />
                  </button>
                  {contactNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveContactNumber(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Multiple Contact Persons */}
          <div className="mb-4">
            <label className="block text-gray-700">Contact Persons</label>
            {contactPersons.map((person, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={person}
                  onChange={(e) => handleContactPersonChange(e.target.value, index)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <div className="ml-2 flex">
                  <button
                    type="button"
                    onClick={() => handleAddContactPerson()}
                    className="text-green-600 hover:text-green-800 mr-2"
                  >
                    <FaPlus />
                  </button>
                  {contactPersons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveContactPerson(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Select Commodity (Multi-Select) */}
          <div className="mb-4">
            <label className="block text-gray-700">Select Commodity</label>
            <Select
              options={commodities}
              isMulti
              value={selectedCommodities}
              onChange={setSelectedCommodities}
              className="w-full mt-1"
              placeholder="Select Commodities"
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
