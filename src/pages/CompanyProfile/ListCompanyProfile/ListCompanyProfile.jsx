import React, { useState, useEffect } from 'react';

const CompanyProfile = () => {
  const [companyProfiles, setCompanyProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyProfiles = async () => {
      try {
        const response = await fetch('https://hansaria-admin-production.up.railway.app/api/company-profile');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCompanyProfiles(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompanyProfiles();
  }, []);

  const handleView = (id) => {
    console.log(`View company profile with ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit company profile with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete company profile with ID: ${id}`);
  };

  if (loading) {
    return <p>Loading company profiles...</p>;
  }

  if (error) {
    return <p>Error fetching company profiles: {error}</p>;
  }

  if (companyProfiles.length === 0) {
    return <p>No company profiles available.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Company Profiles</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Company Name</th>
              <th className="border p-2">State</th>
              <th className="border p-2">Brokerage Rate Per Ton</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {companyProfiles.map((profile, index) => (
              <tr key={profile._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{profile.companyName}</td>
                <td className="border p-2">{profile.state}</td>
                <td className="border p-2">{profile.brokerageRate}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleView(profile._id)}
                    className="text-blue-600 hover:text-blue-800 mx-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(profile._id)}
                    className="text-green-600 hover:text-green-800 mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile._id)}
                    className="text-red-600 hover:text-red-800 mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyProfile;
