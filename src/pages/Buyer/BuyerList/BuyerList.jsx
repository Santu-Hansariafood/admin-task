import React, { useState } from 'react';

const BuyerList = () => {
  // Sample data for demonstration purposes
  const [buyers, setBuyers] = useState([
    {
      id: 1,
      name: 'John Doe',
      groupOfCompany: 'Group1',
      location: 'New York',
      productCapacity: '1000',
      date: '2024-09-03',
      state: 'New York',
      units: ['Unit1', 'Unit2'],
    },
    // Add more sample buyers as needed
  ]);

  // Handle Delete Buyer
  const deleteBuyer = (id) => {
    setBuyers(buyers.filter(buyer => buyer.id !== id));
  };

  // Handle Edit Buyer (for simplicity, this will just log the buyer info)
  const editBuyer = (id) => {
    const buyerToEdit = buyers.find(buyer => buyer.id === id);
    console.log('Editing buyer:', buyerToEdit);
    // Additional logic to handle editing can be implemented here
  };

  // Handle View Buyer Details (for simplicity, this will just log the buyer info)
  const viewBuyer = (id) => {
    const buyerToView = buyers.find(buyer => buyer.id === id);
    console.log('Viewing buyer:', buyerToView);
    // Additional logic to handle viewing details can be implemented here
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Buyer List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-3 px-5">No</th>
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Group of Company</th>
              <th className="text-left p-3 px-5">Location</th>
              <th className="text-left p-3 px-5">Product Capacity</th>
              <th className="text-left p-3 px-5">Date</th>
              <th className="text-left p-3 px-5">State</th>
              <th className="text-left p-3 px-5">Units</th>
              <th className="text-left p-3 px-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={buyer.id} className="border-b hover:bg-gray-50">
                <td className="p-3 px-5">{index + 1}</td>
                <td className="p-3 px-5">{buyer.name}</td>
                <td className="p-3 px-5">{buyer.groupOfCompany}</td>
                <td className="p-3 px-5">{buyer.location}</td>
                <td className="p-3 px-5">{buyer.productCapacity}</td>
                <td className="p-3 px-5">{buyer.date}</td>
                <td className="p-3 px-5">{buyer.state}</td>
                <td className="p-3 px-5">{buyer.units.join(', ')}</td>
                <td className="p-3 px-5">
                  <button
                    onClick={() => viewBuyer(buyer.id)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => editBuyer(buyer.id)}
                    className="text-green-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBuyer(buyer.id)}
                    className="text-red-500 hover:underline"
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

export default BuyerList;
