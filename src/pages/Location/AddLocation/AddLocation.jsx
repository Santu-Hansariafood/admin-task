import React, { useState } from "react";

const AddLocation = () => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const locationData = { location, address, state, district, pin };
    console.log(locationData); // Replace with API call to store data in the database
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Location</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select State
            </option>
            <option value="State 1">State 1</option>
            <option value="State 2">State 2</option>
            {/* Add more states here */}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="district"
          >
            District
          </label>
          <select
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select District
            </option>
            <option value="District 1">District 1</option>
            <option value="District 2">District 2</option>
            {/* Add more districts here */}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pin"
          >
            Pin
          </label>
          <input
            type="text"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter pin code"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocation;
