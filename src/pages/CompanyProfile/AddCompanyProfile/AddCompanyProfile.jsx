import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import stateDistData from "../../../data/state-dist.json";
import "react-toastify/dist/ReactToastify.css";

const AddCompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [brokerageRate, setBrokerageRate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

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

  useEffect(() => {
    const fetchLocationOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/locations");
        // Format the locations for react-select
        const formattedLocations = response.data.map((location) => ({
          value: location._id,
          label: location.location,
          address: location.address,
          state: location.state,
          pin: location.pin,
        }));
        setLocationOptions(formattedLocations);
      } catch (error) {
        toast.error("Failed to fetch location options");
      }
    };
    fetchLocationOptions();
  }, []);

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyProfileData = {
      companyName,
      state: selectedState,
      brokerageRate,
      groupOfCompany: selectedGroup,
      locations: selectedLocations.map((location) => ({
        location: location.label,
        address: location.address,
        state: location.state,
        pin: location.pin,
      })),
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
      setSelectedLocations([]);
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
            <label className="block text-gray-700">Locations</label>
            <Select
              isMulti
              value={selectedLocations}
              onChange={handleLocationChange}
              options={locationOptions}
              className="w-full"
              placeholder="Select Locations"
            />
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
