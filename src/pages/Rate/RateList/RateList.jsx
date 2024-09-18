import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const RateList = () => {
  const [rateData, setRateData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const [editableRates, setEditableRates] = useState({});

  const getWeekDays = (date) => {
    const start = new Date(date);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(start);
      currentDay.setDate(start.getDate() + i);
      const formattedDate = currentDay.toISOString().split("T")[0];
      days.push(formattedDate);
      console.log("Generated date:", formattedDate);
    }

    return days;
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rate-entry")
      .then((response) => {
        setRateData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rate data", error);
      });
  }, []);

  useEffect(() => {
    setWeekDays(getWeekDays(startDate));
  }, [startDate]);

  const groupedData = rateData.reduce((acc, entry) => {
    entry.company.forEach((company) => {
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(entry);
    });
    return acc;
  }, {});

  const handleRateChange = (
    companyName,
    entryIndex,
    commodityIndex,
    day,
    newRate
  ) => {
    console.log("handleRateChange - Day:", day);
    setEditableRates((prevRates) => ({
      ...prevRates,
      [`${companyName}-${entryIndex}-${commodityIndex}-${day}`]: newRate,
    }));
  };

  const getRateValue = (
    companyName,
    entryIndex,
    commodityIndex,
    day,
    defaultValue
  ) => {
    const key = `${companyName}-${entryIndex}-${commodityIndex}-${day}`;
    return editableRates[key] !== undefined ? editableRates[key] : defaultValue;
  };

  const handleUpdateRates = async (companyName) => {
    const updates = [];

    Object.keys(editableRates).forEach((key) => {
      if (key.startsWith(companyName)) {
        const [_, entryIndex, commodityIndex, ...dateParts] = key.split("-");

        const date = dateParts.join("-");

        console.log("Date in update payload:", date);

        const updatedRate = editableRates[key];

        if (updatedRate !== "-") {
          updates.push({
            entryIndex: Number(entryIndex),
            commodityIndex: Number(commodityIndex),
            date: date,
            rate: updatedRate,
          });
        }
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/rate-entry/${companyName}`,
        { updates }
      );
      console.log("Rates updated successfully:", response.data);
      alert("Rates updated successfully!");
    } catch (error) {
      console.error("Error updating rates:", error);
      alert("Error updating rates.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Weekly Rate Table</h1>
      <Calendar
        onChange={setStartDate}
        value={startDate}
        maxDetail="month"
        minDetail="month"
      />

      {Object.keys(groupedData).map((companyName) => (
        <div key={companyName} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {companyName} -{" "}
            {groupedData[companyName][0]?.location?.[0] || "N/A"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Sl. No</th>
                <th className="border p-2">Commodity</th>
                {weekDays.map((day, index) => (
                  <th key={index} className="border p-2">
                    {new Date(day).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groupedData[companyName].map((entry, entryIndex) =>
                entry.commodities.map((commodity, commodityIndex) => (
                  <tr key={`${entryIndex}-${commodityIndex}`}>
                    {commodityIndex === 0 && (
                      <td
                        rowSpan={entry.commodities.length}
                        className="border p-2 text-center"
                      >
                        {entryIndex + 1}
                      </td>
                    )}
                    <td className="border p-2">{commodity.commodityName}</td>
                    {weekDays.map((day, dayIndex) => (
                      <td key={dayIndex} className="border p-2">
                        <input
                          type="text"
                          value={getRateValue(
                            companyName,
                            entryIndex,
                            commodityIndex,
                            day,
                            entry.commodities[commodityIndex]?.rates.find(
                              (rate) => rate.date === day
                            )?.rate || ""
                          )}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (/^\d{0,5}$/.test(newValue)) {
                              handleRateChange(
                                companyName,
                                entryIndex,
                                commodityIndex,
                                day,
                                newValue
                              );
                            }
                          }}
                          maxLength={5}
                          placeholder="Enter rate"
                          className="w-full p-2 border border-gray-300"
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button
            onClick={() => handleUpdateRates(companyName)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update {companyName} Rates
          </button>
        </div>
      ))}
    </div>
  );
};

export default RateList;
