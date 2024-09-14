import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./RateList.css";

const RateList = () => {
  const [date, setDate] = useState(new Date());
  const [rates, setRates] = useState([]);
  const [weekRates, setWeekRates] = useState([]);

  // Fetch rates from the API
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rates");
        console.log("API Response:", response.data); // Log the API response
        setRates(response.data); // Store the rates in state
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };
    fetchRates();
  }, []);

  // Handle calendar date change
  const handleDateChange = (newDate) => {
    setDate(newDate);

    // Calculate the week starting from the selected date (Sunday to Saturday)
    const startOfWeek = new Date(newDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to the start of the week (Sunday)

    const weekRates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i); // Iterate through each day of the week
      const formattedDate = currentDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      console.log("Processing date:", formattedDate); // Log each processed date

      // Filter rates for the current day
      const dailyRates = rates.filter((r) => {
        const fromDate = new Date(r.fromDate).toISOString().split("T")[0];
        const toDate = new Date(r.toDate).toISOString().split("T")[0];
        return formattedDate >= fromDate && formattedDate <= toDate;
      });

      weekRates.push({
        day: currentDay.toDateString(),
        rates: dailyRates,
      });
    }
    setWeekRates(weekRates);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
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
        </div>
      </div>

      {/* Weekly Rate Table */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-bold mb-4 text-center">Weekly Rate List</h3>
        <table className="min-w-full bg-white border table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Commodity</th>
              {daysOfWeek.map((day, index) => (
                <th key={index} className="py-2 px-4 border">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rates.length === 0 ? (
              <tr>
                <td colSpan={daysOfWeek.length + 2} className="py-4 text-center">
                  No rates available
                </td>
              </tr>
            ) : (
              rates.map((rate, rateIndex) => (
                <tr key={rate._id}>
                  <td className="py-2 px-4 border">{rate.company}</td>
                  <td className="py-2 px-4 border">{rate.commodity}</td>
                  {weekRates.map((weekRate, dayIndex) => (
                    <td key={dayIndex} className="py-2 px-4 border">
                      {weekRate.rates.find(
                        (r) =>
                          r.company === rate.company &&
                          r.commodity === rate.commodity
                      )
                        ? `₹${rate.rate}`
                        : "N/A"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RateList;
