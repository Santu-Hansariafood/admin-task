import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import stateDistData from "../../../data/state-dist.json";

const AddCompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [brokerageRate, setBrokerageRate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroupOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/group-of-company"
        );
        setGroupOptions(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch group of company options");
      }
    };
    fetchGroupOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyProfileData = {
      companyName,
      state: selectedState,
      brokerageRate,
      groupOfCompany: selectedGroup,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/company-profile",
        companyProfileData
      );
      toast.success("Company profile added successfully!");
      setCompanyName("");
      setSelectedState("");
      setBrokerageRate("");
      setSelectedGroup("");
    } catch (error) {
      toast.error(
        `Error adding company profile: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Company Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-700">
              Brokerage Rate Per Ton
            </label>
            <input
              type="number"
              value={brokerageRate}
              onChange={(e) => setBrokerageRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Brokerage Rate"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Group of Company</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Group of Company</option>
              {groupOptions.map((group) => (
                <option key={group._id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
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

export default AddCompanyProfile;
