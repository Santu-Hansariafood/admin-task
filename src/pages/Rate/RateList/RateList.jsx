import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./RateList.css";

const RateList = () => {
  const [date, setDate] = useState(new Date());
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rates");
        setRates(response.data);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDate = new Date(newDate).toISOString().split("T")[0];
    const rate = rates.find(
      (r) =>
        selectedDate >= new Date(r.fromDate).toISOString().split("T")[0] &&
        selectedDate <= new Date(r.toDate).toISOString().split("T")[0]
    );
    setSelectedRate(rate ? rate.rate : "No rate available");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Rate List</h2>
        <div className="flex justify-center mb-4">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar border border-gray-300 rounded-lg shadow-md"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Date:</h3>
          <p className="text-xl">{date.toDateString()}</p>
          <h3 className="text-lg font-semibold mt-2">Rate:</h3>
          <p className="text-xl">
            {selectedRate !== null ? `₹${selectedRate}` : "No rate available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateList;
