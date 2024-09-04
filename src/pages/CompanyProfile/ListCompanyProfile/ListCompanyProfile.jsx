import React from 'react';

// Sample data array for demonstration
const companyProfiles = [
  { id: 1, companyName: 'ABC Industries', state: 'California', brokerageRate: 100 },
  { id: 2, companyName: 'XYZ Corp', state: 'Texas', brokerageRate: 150 },
  { id: 3, companyName: '123 Trading Co.', state: 'New York', brokerageRate: 200 },
];

const CompanyProfileTable = () => {
  const handleView = (id) => {
    console.log(`View company profile with ID: ${id}`);
    // Implement view logic here
  };

  const handleEdit = (id) => {
    console.log(`Edit company profile with ID: ${id}`);
    // Implement edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete company profile with ID: ${id}`);
    // Implement delete logic here
  };

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
              <tr key={profile.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{profile.companyName}</td>
                <td className="border p-2">{profile.state}</td>
                <td className="border p-2">{profile.brokerageRate}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleView(profile.id)}
                    className="text-blue-600 hover:text-blue-800 mx-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(profile.id)}
                    className="text-green-600 hover:text-green-800 mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
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

export default CompanyProfileTable;
