import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import stateDistData from "../../../data/state-dist.json";

const AddBuyer = () => {
  const [name, setName] = useState("");
  const [groupOfCompanies, setGroupOfCompanies] = useState([]);
  const [selectedGroupOfCompany, setSelectedGroupOfCompany] = useState("");
  const [location, setLocation] = useState([]);
  const [productCapacity, setProductCapacity] = useState("");
  const [date, setDate] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchGroupOfCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/company-profile"
        );
        setGroupOfCompanies(response.data);
      } catch (error) {
        console.error("Error fetching group of companies:", error);
      }
    };
    fetchGroupOfCompanies();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const selectedStateData = stateDistData.find(
        (state) => state.name === selectedState
      );
      if (selectedStateData) {
        setCities(selectedStateData.cities);
      } else {
        setCities([]);
      }
    }
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const buyerData = {
      name,
      groupOfCompany: selectedGroupOfCompany,
      locations: location,
      productCapacity,
      date,
      state: selectedState,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/buyers",
        buyerData
      );
      toast.success("Buyer added successfully!");
      setName("");
      setSelectedGroupOfCompany("");
      setLocation([]);
      setProductCapacity("");
      setDate("");
      setSelectedState("");
    } catch (error) {
      toast.error(
        `Error adding buyer: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleAddLocation = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !location.includes(selectedValue)) {
      setLocation([...location, selectedValue]);
    }
    e.target.value = "";
  };

  const handleRemoveLocation = (locationToRemove) => {
    setLocation(location.filter((loc) => loc !== locationToRemove));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Buyer</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-gray-700">Group of Company</label>
            <select
              value={selectedGroupOfCompany}
              onChange={(e) => {
                setSelectedGroupOfCompany(e.target.value);
                const selectedCompany = groupOfCompanies.find(
                  (company) => company.groupOfCompany === e.target.value
                );
                if (selectedCompany) {
                  setSelectedState(selectedCompany.state);
                } else {
                  setSelectedState("");
                }
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Group</option>
              {groupOfCompanies.map((company) => (
                <option key={company._id} value={company.groupOfCompany}>
                  {company.groupOfCompany}
                </option>
              ))}
            </select>
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
              {stateDistData.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <select
              onChange={handleAddLocation}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddBuyer;
