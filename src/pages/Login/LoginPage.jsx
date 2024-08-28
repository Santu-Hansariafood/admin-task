import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "../../data/data.json";
import Card from "../../common/Cards/Cards";
import Input from "../../common/InputText/InputText";
import Button from "../../common/Buttons/Buttons";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const { username: validUsername, password: validPassword } = data.login;
  
    if (username === validUsername && password === validPassword) {
      setError("");
      toast.success("Login Successful!");
      onLogin();
      navigate("/home");
    } else {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Input
          type="text"
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
