import React, { useState, useEffect } from "react";
import axios from "axios";

const ListGroupofCompany = () => {
  const [companies, setCompanies] = useState([]);

  // Fetch group of companies data from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/group-of-company');
        setCompanies(response.data.data); // Accessing the data field from response
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Group of Companies</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={company._id} className="border-b hover:bg-gray-50">
                <td className="p-3 px-5">{index + 1}</td> {/* Incremental ID */}
                <td className="p-3 px-5">{company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListGroupofCompany;
