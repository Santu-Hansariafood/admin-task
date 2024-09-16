import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCommodity, setSelectedCommodity] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [rates, setRates] = useState({});

  // Fetch companies, commodities, and locations from the API
  useEffect(() => {
    axios.get("http://localhost:5000/api/company-profile").then((response) => {
      setCompanies(response.data);
    });
    axios.get("http://localhost:5000/api/commodities").then((response) => {
      setCommodities(response.data);
    });
    axios.get("http://localhost:5000/api/locations").then((response) => {
      setLocations(response.data);
    });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      company: selectedCompany.map((company) => company.value),
      date: selectedDate,
      commodities: selectedCommodity.map((commodity) => ({
        commodityId: commodity.value,
        rate: rates[commodity.value],
      })),
      location: selectedLocation.map((location) => location.value),
    };

    console.log("Form Data:", formData);

    // Make the API call to submit the data
    axios
      .post("http://localhost:5000/api/rate-entry", formData)
      .then((response) => {
        console.log("Data submitted successfully", response.data);
        alert("Data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting data", error);
        alert("Error submitting data. Please try again.");
      });
  };

  // Handle rate change for each commodity
  const handleRateChange = (commodityId, value) => {
    setRates((prevRates) => ({ ...prevRates, [commodityId]: value }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Company (multiple select) */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Company
          </label>
          <Select
            isMulti
            options={companies.map((company) => ({
              value: company._id,
              label: company.companyName,
            }))}
            value={selectedCompany}
            onChange={setSelectedCompany}
            className="w-full"
          />
        </div>

        {/* Select Location */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Location
          </label>
          <Select
            isMulti
            options={locations.map((location) => ({
              value: location._id,
              label: location.locationName,
            }))}
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full"
          />
        </div>

        {/* Select Date */}
        <div>
          <label className="block mb-2 text-sm font-medium">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Select Commodity (multiple select) */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Commodity
          </label>
          <Select
            isMulti
            options={commodities.map((commodity) => ({
              value: commodity._id,
              label: commodity.commodityName,
            }))}
            value={selectedCommodity}
            onChange={setSelectedCommodity}
            className="w-full"
          />
        </div>

        {/* Rate Input for each selected commodity */}
        {selectedCommodity.length > 0 &&
          selectedCommodity.map((commodity) => (
            <div key={commodity.value}>
              <label className="block mb-2 text-sm font-medium">
                Enter Rate for {commodity.label}
              </label>
              <input
                type="text"
                placeholder={`Enter rate for ${commodity.label}`}
                value={rates[commodity.value] || ""}
                onChange={(e) =>
                  handleRateChange(commodity.value, e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
