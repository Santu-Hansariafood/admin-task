import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPurchaser = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    location: "",
    item: "",
    phoneNumber: "",
  });

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
        "http://localhost:5000/api/purchasers",
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
            <option value="Company A">Company A</option>
            <option value="Company B">Company B</option>
            <option value="Company C">Company C</option>
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
            <option value="Location A">Location A</option>
            <option value="Location B">Location B</option>
            <option value="Location C">Location C</option>
          </select>
        </div>

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
            <option value="Maize">Maize</option>
            <option value="Soya">Soya</option>
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
