import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AddBuyer from "./pages/Buyer/AddBuyer/AddBuyer";
import BuyerList from "./pages/Buyer/BuyerList/BuyerList";
import AddCommodity from "./pages/Commodity/AddCommodity/AddCommodity";
import CommodityList from "./pages/Commodity/CommodityList/CommodityList";
import AddPurchaser from "./pages/Purchaser/AddPurchaser/AddPurchaser";
import ListPurchaser from "./pages/Purchaser/ListPurchaser/ListPurchaser";
import AddUnit from "./pages/Unit/AddUnit/AddUnit";
import ListUnit from "./pages/Unit/ListUnit/ListUnit";
import AddCompanyProfile from "./pages/CompanyProfile/AddCompanyProfile/AddCompanyProfile";
import ListCompanyProfile from "./pages/CompanyProfile/ListCompanyProfile/ListCompanyProfile";
import AddLocation from "./pages/Location/AddLocation/AddLocation";
import ListLocation from "./pages/Location/ListLocation/ListLocation";
import AddRate from "./pages/Rate/AddRate/AddRate";
import RateList from "./pages/Rate/RateList/RateList";
import ListGroupofCompany from "./pages/GroupofCompany/ListGroupofCompany/ListGroupofCompany";
import AddGroupofCompany from "./pages/GroupofCompany/AddGroupofCompany/AddGroupofCompany";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div
          className={`flex-1 overflow-auto p-4 ${
            isAuthenticated ? "ml-64" : ""
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/buyer/add"
              element={isAuthenticated ? <AddBuyer /> : <Navigate to="/" />}
            />
            <Route
              path="/buyer/list"
              element={isAuthenticated ? <BuyerList /> : <Navigate to="/" />}
            />
            <Route
              path="/commodity/add"
              element={isAuthenticated ? <AddCommodity /> : <Navigate to="/" />}
            />
            <Route
              path="/commodity/list"
              element={
                isAuthenticated ? <CommodityList /> : <Navigate to="/" />
              }
            />
            <Route
              path="/purchaser/add"
              element={isAuthenticated ? <AddPurchaser /> : <Navigate to="/" />}
            />
            <Route
              path="/purchaser/list"
              element={
                isAuthenticated ? <ListPurchaser /> : <Navigate to="/" />
              }
            />
            <Route
              path="/unit/add"
              element={isAuthenticated ? <AddUnit /> : <Navigate to="/" />}
            />
            <Route
              path="/unit/list"
              element={isAuthenticated ? <ListUnit /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/add"
              element={
                isAuthenticated ? <AddCompanyProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile/list"
              element={
                isAuthenticated ? <ListCompanyProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/location/add"
              element={isAuthenticated ? <AddLocation /> : <Navigate to="/" />}
            />
            <Route
              path="/location/list"
              element={isAuthenticated ? <ListLocation /> : <Navigate to="/" />}
            />
            <Route
              path="/rate/add"
              element={isAuthenticated ? <AddRate /> : <Navigate to="/" />}
            />
            <Route
              path="/rate/list"
              element={isAuthenticated ? <RateList /> : <Navigate to="/" />}
            />
            <Route
              path="/group/add"
              element={
                isAuthenticated ? <AddGroupofCompany /> : <Navigate to="/" />
              }
            />
            <Route
              path="/group/list"
              element={
                isAuthenticated ? <ListGroupofCompany /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
