import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddCommodity = () => {
  const [commodityName, setCommodityName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commodityName) {
      try {
        const response = await axios.post(
          "https://hansaria-admin-production.up.railway.app/api/commodities",
          {
            commodityName,
          }
        );

        if (response.status === 201) {
          toast.success("Commodity added successfully!");
          setCommodityName("");
        } else {
          toast.error("Failed to add commodity.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.msg || "Error adding commodity.");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Add Commodity</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Commodity Name</label>
          <input
            type="text"
            value={commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter commodity name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Commodity
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCommodity;
