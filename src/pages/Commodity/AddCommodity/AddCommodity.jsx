import React, { useState } from "react";
import { toast } from "react-toastify";

const AddCommodity = () => {
  const [commodityName, setCommodityName] = useState("");
  const [commodityCode, setCommodityCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation or API call can be done here
    if (commodityName && commodityCode) {
      toast.success("Commodity added successfully!");
      // Reset form
      setCommodityName("");
      setCommodityCode("");
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Add Commodity</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Commodity Name</label>
          <input
            type="text"
            value={commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter commodity name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Commodity Code</label>
          <input
            type="text"
            value={commodityCode}
            onChange={(e) => setCommodityCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter commodity code"
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Commodity
        </button>
      </form>
    </div>
  );
};

export default AddCommodity;
