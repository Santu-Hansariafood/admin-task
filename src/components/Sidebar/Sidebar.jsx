import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sidebarData from "../../data/data.json";
import {
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdCategory,
  MdShoppingCart,
  MdExitToApp,
  MdBuild,
  MdAccountCircle,
  MdMenu,
  MdClose,
  MdLocationOn,
  MdAttachMoney,
} from "react-icons/md";

const Sidebar = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const icons = {
    MdDashboard: <MdDashboard />,
    MdPeople: <MdPeople />,
    MdBusiness: <MdBusiness />,
    MdCategory: <MdCategory />,
    MdShoppingCart: <MdShoppingCart />,
    MdBuild: <MdBuild />,
    MdAccountCircle: <MdAccountCircle />,
    MdLocationOn: <MdLocationOn />,
    MdAttachMoney: <MdAttachMoney />
  };

  const handleLogout = () => {
    onLogout();
    toast.success("Logout successful!");
    navigate("/");
  };

  const toggleSubMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`flex ${isSidebarOpen ? "w-64" : "w-16"} bg-black text-white min-h-screen transition-width duration-300 relative`}>
      <div className="p-4">
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none z-10"
        >
          {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
        <h2 className={`text-2xl font-bold mb-6 ${isSidebarOpen ? "block" : "hidden"}`}>
          Admin
        </h2>
        <ul className="mt-8">
          {sidebarData.sidebar.map((item) => (
            <li key={item.id} className="mb-4">
              <NavLink
                to={item.path || "#"}
                className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => toggleSubMenu(item.id)}
              >
                <span className="mr-3 text-xl">{icons[item.icon]}</span>
                <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
              </NavLink>
              {activeMenu === item.id && item.subfields && isSidebarOpen && (
                <ul className="ml-4">
                  {item.subfields.map((subfield) => (
                    <li key={subfield.path} className="mb-2">
                      <NavLink
                        to={subfield.path}
                        className="flex items-center p-2 hover:bg-gray-600 rounded"
                        activeClassName="bg-gray-700"
                      >
                        <span className="mr-3 text-sm">•</span>
                        <span className="block">{subfield.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className={`mt-4 p-2 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded w-full text-center transition-colors duration-200`}
        >
          <MdExitToApp className="mr-2" />
          <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
