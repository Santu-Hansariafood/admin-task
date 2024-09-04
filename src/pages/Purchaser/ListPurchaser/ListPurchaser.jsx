import React, { useEffect, useState } from "react";

const ListPurchaser = () => {
  const [purchasers, setPurchasers] = useState([]);

  // Fetching data from API (assuming the data is fetched from an API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/purchasers"); // Change this to your actual API endpoint
        const data = await response.json();
        setPurchasers(data);
      } catch (error) {
        console.error("Error fetching purchaser data:", error);
      }
    };

    fetchData();
  }, []);

  // Handlers for actions
  const handleView = (id) => {
    // Add logic to view purchaser details
    console.log("View purchaser with ID:", id);
  };

  const handleEdit = (id) => {
    // Add logic to edit purchaser details
    console.log("Edit purchaser with ID:", id);
  };

  const handleDelete = (id) => {
    // Add logic to delete purchaser
    console.log("Delete purchaser with ID:", id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">List of Purchasers</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">No</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Buyer Company</th>
            <th className="text-left px-4 py-2">Location</th>
            <th className="text-left px-4 py-2">Item</th>
            <th className="text-left px-4 py-2">Phone Number</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchasers.length > 0 ? (
            purchasers.map((purchaser, index) => (
              <tr key={purchaser.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{purchaser.name}</td>
                <td className="px-4 py-2">{purchaser.company}</td>
                <td className="px-4 py-2">{purchaser.location}</td>
                <td className="px-4 py-2">{purchaser.item}</td>
                <td className="px-4 py-2">{purchaser.phoneNumber}</td>
                <td className="text-center px-4 py-2">
                  <button
                    onClick={() => handleView(purchaser.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(purchaser.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(purchaser.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-4 py-2">
                No purchasers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListPurchaser;
