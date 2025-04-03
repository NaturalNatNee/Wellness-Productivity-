import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "./Dashboard.css"; // Create this file for styling
import Timer from "./timer/Timer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError("Failed to load user data");
        // If authentication fails, redirect to login
        if (err.message?.includes("unauthorized")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <button className="settings-btn" onClick={() => navigate("/settings")}>
        Settings
      </button>
      <header className="dashboard-header">
        <h1>ZenYourMess!</h1>
        <h2>Where Coders Compile Dreams and Execute Naps!</h2>
      </header>

      <div className="user-welcome">
        <h2>Welcome, {user?.firstName}!</h2>
        <p>Productivity and Wellness Tracking</p>
      </div>

      <div className="dashboard-grid">
        <button className="primary-btn" onClick={() => navigate("/timer")}>
          Start Timer
        </button>
      </div>
      <button className="primary-btn" onClick={() => navigate("/progress")}>
        View Stats
      </button>
    </div>
  );
}

export default Dashboard;
