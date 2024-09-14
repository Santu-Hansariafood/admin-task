import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ListLocation = () => {
  const [locations, setLocations] = useState([]);

  // Fetch locations data from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/locations");
        setLocations(response.data); // Assuming the response is directly the array of locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleView = (id) => {
    alert(`Viewing location with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing location with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setLocations(locations.filter((location) => location._id !== id));
    alert(`Deleted location with ID: ${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">List Locations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-12 px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left">District</th>
                <th className="px-4 py-2 text-left">Pin</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={location._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{location.location}</td>
                  <td className="px-4 py-2">{location.address}</td>
                  <td className="px-4 py-2">{location.state}</td>
                  <td className="px-4 py-2">{location.district}</td>
                  <td className="px-4 py-2">{location.pin}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(location._id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex items-center"
                      >
                        <FaEye className="mr-1" />
                      </button>
                      <button
                        onClick={() => handleEdit(location._id)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => handleDelete(location._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListLocation;
