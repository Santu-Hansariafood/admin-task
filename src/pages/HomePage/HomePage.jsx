import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Select from "react-select";

const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("default", { month: "long" })
);

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [places, setPlaces] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedCommodities, setSelectedCommodities] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthDates, setMonthDates] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [calendarExists, setCalendarExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/company-profile"
      );
      setCompanies(response.data);
      setPlaces(response.data.map((company) => company.companyName));
    } catch (err) {
      setError("Error fetching company data");
    }
  }, []);

  const fetchCommodities = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/commodities");
      setCommodities(
        response.data.map((commodity) => ({
          label: commodity.commodityName,
          value: commodity._id,
        }))
      );
    } catch (err) {
      setError("Error fetching commodities data");
    }
  }, []);

  useEffect(() => {
    fetchCompanyData();
    fetchCommodities();
  }, [fetchCompanyData, fetchCommodities]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const datesArray = Array.from(
      { length: firstDayOfMonth },
      () => null
    ).concat(
      Array.from({ length: daysInMonth }, (_, i) => {
        const dateObj = new Date(selectedYear, selectedMonth, i + 1);
        return {
          day: i + 1,
          weekday: dateObj.toLocaleDateString("default", { weekday: "short" }),
        };
      })
    );

    setMonthDates(datesArray);
  }, [selectedMonth, selectedYear]);

  const handleCompanyChange = useCallback(
    (e) => setSelectedCompany(e.target.value),
    []
  );
  const handlePlaceChange = useCallback(
    (e) => setSelectedPlace(e.target.value),
    []
  );
  const handleCommodityChange = useCallback(
    (selectedOptions) => setSelectedCommodities(selectedOptions),
    []
  );
  const handleMonthChange = useCallback(
    (e) => setSelectedMonth(parseInt(e.target.value)),
    []
  );
  const handleYearChange = useCallback(
    (e) => setSelectedYear(parseInt(e.target.value)),
    []
  );

  useEffect(() => {
    if (selectedCompany) {
      const fetchCalendar = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://localhost:5000/api/calendar/${selectedCompany}/calendar`,
            {
              params: { month: selectedMonth + 1, year: selectedYear },
            }
          );
          if (response.data) {
            setCalendarExists(true);
            const existingCalendar = response.data.calendar;
            const newInputValues = {};
            existingCalendar.forEach((dayEntry) => {
              dayEntry.commodityDetails.forEach((commodity) => {
                newInputValues[`${dayEntry.day}_${commodity.commodityId}`] =
                  commodity.inputValue || "";
              });
            });
            setInputValues(newInputValues);
          } else {
            setCalendarExists(false);
            setInputValues({});
          }
        } catch (err) {
          setError("Error fetching calendar data");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCalendar();
    }
  }, [selectedCompany, selectedMonth, selectedYear]);

  const handleInputChange = (e, day, commodityId) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [`${day}_${commodityId}`]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const calendarData = monthDates.filter(Boolean).map((dateObj) => ({
      day: dateObj.day,
      commodityDetails: selectedCommodities.map((commodity) => ({
        commodityId: commodity.value,
        inputValue: inputValues[`${dateObj.day}_${commodity.value}`] || "",
      })),
    }));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/calendar/${selectedCompany}/calendar`,
        {
          month: selectedMonth + 1,
          year: selectedYear,
          calendar: calendarData,
        }
      );
      console.log("Data saved:", response.data);
      setCalendarExists(true);
    } catch (err) {
      setError("Error saving calendar data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:5000/api/calendar/${selectedCompany}/calendar`,
        {
          params: { month: selectedMonth + 1, year: selectedYear },
        }
      );
      setCalendarExists(false);
      setInputValues({});
    } catch (err) {
      setError("Error deleting calendar");
    } finally {
      setIsLoading(false);
    }
  };

  // Rendering weeks and input fields
  const renderWeeks = useCallback(() => {
    const weeks = [1, 2, 3, 4, 5, 6];
    let dateIndex = 0;

    return weeks.map((week, idx) => (
      <tr key={idx} className="border-t border-gray-300">
        <td className="p-3 text-center font-semibold">{week}</td>
        <td className="p-3">
          <select
            value={selectedPlace}
            onChange={handlePlaceChange}
            className="border border-gray-300 rounded p-1 w-full bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            {places.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </td>
        <td className="p-3">
          <Select
            isMulti
            value={selectedCommodities}
            onChange={handleCommodityChange}
            options={commodities}
            className="w-full"
            placeholder="Select Commodities"
          />
        </td>
        {Array(7)
          .fill(0)
          .map((_, index) => {
            const dateObj = monthDates[dateIndex];
            dateIndex += 1;
            return (
              <td key={index} className="p-3">
                {dateObj ? (
                  selectedCommodities.map((commodity, i) => (
                    <div key={i} className="mb-2">
                      <input
                        type="text"
                        placeholder={`${commodity.label} ${dateObj.weekday} ${dateObj.day}`}
                        value={
                          inputValues[`${dateObj.day}_${commodity.value}`] || ""
                        }
                        onChange={(e) =>
                          handleInputChange(e, dateObj.day, commodity.value)
                        }
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))
                ) : (
                  <span>—</span>
                )}
              </td>
            );
          })}
      </tr>
    ));
  }, [
    commodities,
    handleCommodityChange,
    handleInputChange,
    inputValues,
    monthDates,
    places,
    selectedCommodities,
    selectedPlace,
  ]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Commodity Calendar</h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedCompany}
          onChange={handleCompanyChange}
          className="border rounded p-2 w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border rounded p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          className="border rounded p-2 w-24 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          min="1900"
          max="2100"
        />
      </div>

      <table className="w-full border-collapse table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b border-gray-300 bg-gray-100">
            <th className="p-3 text-left">Week</th>
            <th className="p-3 text-left">Place</th>
            <th className="p-3 text-left">Commodities</th>
            <th className="p-3 text-left">Sunday</th>
            <th className="p-3 text-left">Monday</th>
            <th className="p-3 text-left">Tuesday</th>
            <th className="p-3 text-left">Wednesday</th>
            <th className="p-3 text-left">Thursday</th>
            <th className="p-3 text-left">Friday</th>
            <th className="p-3 text-left">Saturday</th>
          </tr>
        </thead>
        <tbody>{renderWeeks()}</tbody>
      </table>

      <div className="mt-6">
        <button
          className={`px-5 py-2 rounded-lg text-white font-semibold ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading
            ? "Saving..."
            : calendarExists
            ? "Update Calendar"
            : "Save Calendar"}
        </button>
        {calendarExists && (
          <button
            className={`ml-3 px-5 py-2 rounded-lg text-white font-semibold ${
              isLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Calendar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
