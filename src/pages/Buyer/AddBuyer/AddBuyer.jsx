import React, { useState } from "react";
import Select from "react-select"; // Import react-select for multi-select dropdowns
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for adding/removing fields

const AddBuyer = () => {
  const [buyerName, setBuyerName] = useState("");
  const [buyerMobile, setBuyerMobile] = useState([""]);
  const [buyerEmail, setBuyerEmail] = useState([""]);
  const [buyerCompany, setBuyerCompany] = useState("");
  const [selectedCommodities, setSelectedCommodities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log({
      buyerName,
      buyerMobile,
      buyerEmail,
      buyerCompany,
      selectedCommodities: selectedCommodities.map((commodity) => commodity.value),
    });
  };

  const companies = ["Company A", "Company B", "Company C"];
  const commodities = [
    { value: "Commodity 1", label: "Commodity 1" },
    { value: "Commodity 2", label: "Commodity 2" },
    { value: "Commodity 3", label: "Commodity 3" },
  ];

  const handleAddMobile = () => {
    setBuyerMobile([...buyerMobile, ""]);
  };

  const handleRemoveMobile = (index) => {
    const newMobileNumbers = buyerMobile.filter((_, i) => i !== index);
    setBuyerMobile(newMobileNumbers);
  };

  const handleMobileChange = (value, index) => {
    const newMobileNumbers = [...buyerMobile];
    newMobileNumbers[index] = value;
    setBuyerMobile(newMobileNumbers);
  };

  const handleAddEmail = () => {
    setBuyerEmail([...buyerEmail, ""]);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = buyerEmail.filter((_, i) => i !== index);
    setBuyerEmail(newEmails);
  };

  const handleEmailChange = (value, index) => {
    const newEmails = [...buyerEmail];
    newEmails[index] = value;
    setBuyerEmail(newEmails);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Buyer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Name</label>
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Enter buyer name"
            required
          />
        </div>

        {/* Multiple Mobile Numbers */}
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Mobile</label>
          {buyerMobile.map((mobile, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={mobile}
                onChange={(e) => handleMobileChange(e.target.value, index)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter buyer mobile"
                required
              />
              <div className="ml-2 flex">
                <button
                  type="button"
                  onClick={() => handleAddMobile()}
                  className="text-green-600 hover:text-green-800 mr-2"
                >
                  <FaPlus />
                </button>
                {buyerMobile.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMobile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Multiple Emails */}
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Email</label>
          {buyerEmail.map((email, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value, index)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter buyer email"
                required
              />
              <div className="ml-2 flex">
                <button
                  type="button"
                  onClick={() => handleAddEmail()}
                  className="text-green-600 hover:text-green-800 mr-2"
                >
                  <FaPlus />
                </button>
                {buyerEmail.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Buyer Company</label>
          <select
            value={buyerCompany}
            onChange={(e) => setBuyerCompany(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Multi-select for Commodities */}
        <div className="mb-4">
          <label className="block text-gray-700">Commodity</label>
          <Select
            options={commodities}
            isMulti
            value={selectedCommodities}
            onChange={setSelectedCommodities}
            className="w-full mt-1"
            placeholder="Select Commodities"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBuyer;
