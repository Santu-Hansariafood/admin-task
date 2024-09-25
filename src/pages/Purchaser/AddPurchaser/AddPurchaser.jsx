import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const AddPurchaser = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    location: "",
    item: "",
    phoneNumber: "",
  });

  const [commodities, setCommodities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get(
          "https://hansaria-admin-production.up.railway.app/api/commodities"
        );
        setCommodities(response.data);
      } catch (error) {
        console.error("Error fetching commodities:", error);
        toast.error("Failed to load commodities.");
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "https://hansaria-admin-production.up.railway.app/api/company-profile"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to load companies.");
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://hansaria-admin-production.up.railway.app/api/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to load locations.");
      }
    };

    fetchCommodities();
    fetchCompanies();
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request with data:", formData);
      const response = await axios.post(
        "https://hansaria-admin-production.up.railway.app/api/purchasers",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Created successfully!");
        setFormData({
          name: "",
          company: "",
          location: "",
          item: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      console.error("Error received:", error.response);
      toast.error(error.response?.data?.msg || "Error storing purchaser data.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Purchaser</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Buyer Company</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company.companyName}>
                {company.companyName} - {company.state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location.location}>
                {location.location} {location.district}, {location.state},{" "}
                {location.pin}
              </option>
            ))}
          </select>
        </div>

        {/* Item Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700">Item</label>
          <select
            name="item"
            value={formData.item}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Item</option>
            {commodities.map((commodity) => (
              <option key={commodity._id} value={commodity.commodityName}>
                {commodity.commodityName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPurchaser;
