import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import stateDistData from "../../../data/state-dist.json";

const AddLocation = () => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");

  const districtsForSelectedState = state
    ? stateDistData.find((s) => s.name === state)?.cities || []
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationData = { location, address, state, district, pin };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/locations",
        locationData
      );

      if (response.status === 201) {
        toast.success("Location added successfully!");
        setLocation("");
        setAddress("");
        setState("");
        setDistrict("");
        setPin("");
      } else {
        toast.error("Unexpected response status. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(
            error.response.data.msg ||
              "Validation error. Please check your inputs."
          );
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
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
            {stateDistData.map((stateItem) => (
              <option key={stateItem.name} value={stateItem.name}>
                {stateItem.name}
              </option>
            ))}
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
            disabled={!state}
          >
            <option value="" disabled>
              Select District
            </option>
            {districtsForSelectedState.map((districtItem) => (
              <option key={districtItem} value={districtItem}>
                {districtItem}
              </option>
            ))}
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
            maxLength={6}
            minLength={6}
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
