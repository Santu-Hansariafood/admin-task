import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const RateEntryTable = () => {
  const [rateData, setRateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datesInRange, setDatesInRange] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rate-entry")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          const companyA = a.company.join(", ").toLowerCase();
          const companyB = b.company.join(", ").toLowerCase();
          return companyA.localeCompare(companyB);
        });
        setRateData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching the rate entry data!", error);
      });
  }, []);

  const getDatesInRange = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    setDatesInRange(dates);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    getDatesInRange(date);
    setShowCalendar(false);
  };

  const extractState = (locationString) => {
    const locationParts = locationString.split(",");
    if (locationParts.length > 2) {
      return locationParts[2].trim();
    }
    return "";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rate Entry Data",
          text: "Check out the latest rate entry data!",
          url: window.location.href,
        });
        console.log("Data shared successfully");
      } catch (error) {
        console.error("Error sharing data:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="flex justify-between mb-4 no-print">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/add-rate-entry")}
        >
          Add Rate Entry
        </button>
      </div>

      <div className="mb-4 no-print">
        {!showCalendar ? (
          <div
            className="bg-white border p-2 rounded cursor-pointer text-center w-40"
            onClick={() => setShowCalendar(true)}
          >
            {selectedDate.toDateString()}
          </div>
        ) : (
          <Calendar onChange={onDateChange} value={selectedDate} />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-left">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Commodity</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">State</th>
              {datesInRange.map((date, index) => (
                <th className="border p-2" key={index}>
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rateData.map((entry, entryIndex) =>
              entry.commodities.map((commodity, commodityIndex) => (
                <tr
                  key={`${entryIndex}-${commodityIndex}`}
                  className={
                    commodityIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }
                >
                  <td className="border p-2">{entry.company.join(", ")}</td>
                  <td className="border p-2">{commodity.commodityName}</td>
                  {entry.location.map((loc, locIndex) => {
                    const locationParts = loc.split(",");
                    return (
                      <React.Fragment key={locIndex}>
                        <td className="border p-2">{locationParts[0]}</td>
                        <td className="border p-2">{extractState(loc)}</td>
                      </React.Fragment>
                    );
                  })}
                  {datesInRange.map((date, dateIndex) => {
                    const rateForDate = commodity.rates.find(
                      (rate) => rate.date === date
                    );
                    return (
                      <td className="border p-2" key={dateIndex}>
                        {rateForDate ? rateForDate.rate : "N/A"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 no-print">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default RateEntryTable;
