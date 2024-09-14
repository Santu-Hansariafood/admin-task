import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommodityList = () => {
  const [commodities, setCommodities] = useState([]);

  // Fetch commodities data from the API
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/commodities');
        setCommodities(response.data);
      } catch (error) {
        console.error('Error fetching commodities:', error);
      }
    };

    fetchCommodities();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Commodity List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">Commodity Name</th>
            </tr>
          </thead>
          <tbody>
            {commodities.map((commodity) => (
              <tr key={commodity._id} className="border-b hover:bg-gray-50">
                <td className="p-3 px-5">{commodity._id}</td>
                <td className="p-3 px-5">{commodity.commodityName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommodityList;
