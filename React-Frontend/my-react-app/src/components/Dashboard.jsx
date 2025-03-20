import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "./Dashboard.css"; // Create this file for styling

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

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Wellness & Productivity Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="user-welcome">
        <h2>Welcome, {user?.firstName || "User"}!</h2>
        <p>Track your productivity and wellness journey here.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Start a Timer Session</h3>
          <p>Focus on your work with customizable timer sessions.</p>
          <button className="primary-btn" onClick={() => navigate("/timer")}>
            Start Timer
          </button>
        </div>

        <div className="dashboard-card">
          <h3>View Progress</h3>
          <p>See insights from your productivity and wellness data.</p>
          <button className="primary-btn" onClick={() => navigate("/progress")}>
            View Stats
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Account Settings</h3>
          <p>Update your profile and preferences.</p>
          <button
            className="secondary-btn"
            onClick={() => navigate("/profile")}
          >
            Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
