import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ChangePassword from "./authentication/ChangePassword";
import './settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();

        const handleDashboard = () => {
          navigate("/dashboard");
        };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="settings-header">
        <h1>ZenYourMess</h1>
        <h2>Settings</h2>
      </header>

        <button
          className="primary-btn"
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </button>
      <button className="primary-btn" onClick={handleLogout}>
        Logout
      </button>
      <button className="primary-btn" id="dashboard-btn" onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>
      </div>
  );
}

export default Settings;