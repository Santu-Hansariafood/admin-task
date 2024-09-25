import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddGroupofCompany = () => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName) {
      toast.error("Group of Company Name is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://hansaria-admin-production.up.railway.app/api/group-of-company",
        { name: groupName }
      );
      toast.success("Group of Company added successfully!");
      setGroupName("");
    } catch (error) {
      // Display backend error message to the user
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Group of Company
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700"
          >
            Group of Company Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter group name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddGroupofCompany;
