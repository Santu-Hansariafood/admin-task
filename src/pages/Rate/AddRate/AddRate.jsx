import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddRate = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rate, setRate] = useState("");
  const [company, setCompany] = useState("");
  const [commodity, setCommodity] = useState("");
  const [companies, setCompanies] = useState([]);
  const [commodities, setCommodities] = useState([]);

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/company-profile"
        );
        setCompanies(response.data);
      } catch (error) {
        toast.error("Failed to fetch companies.");
      }
    };
    fetchCompanies();
  }, []);

  // Fetch commodities from API
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/commodities"
        );
        setCommodities(response.data);
      } catch (error) {
        toast.error("Failed to fetch commodities.");
      }
    };
    fetchCommodities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fromDate || !toDate || !rate || !company || !commodity) {
        toast.error("Please fill in all the fields.");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/rates", {
        fromDate,
        toDate,
        rate,
        company,
        commodity,
      });

      toast.success("Rate added successfully!");
      setFromDate("");
      setToDate("");
      setRate("");
      setCompany("");
      setCommodity("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add rate";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Rate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fromDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              From Date:
            </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="toDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              To Date:
            </label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rate:
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              placeholder="Enter Rate"
              onChange={(e) => setRate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Company:
            </label>
            <select
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="commodity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Commodity:
            </label>
            <select
              id="commodity"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a Commodity</option>
              {commodities.map((commodity) => (
                <option key={commodity._id} value={commodity.commodityName}>
                  {commodity.commodityName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddRate;
