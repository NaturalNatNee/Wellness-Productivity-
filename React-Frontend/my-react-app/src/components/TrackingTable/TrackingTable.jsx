import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./TrackingTable.css";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/timer",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const TrackingTable = () => {
  const [timerData, setTimerData] = useState([]);
  const [filteredTimers, setFilteredTimers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTimerData = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/getTimer");
        console.log("Raw data from API:", response);

        const formattedData = response.data.Rating.map((timer) => {
          let formattedDate = "Unknown date";
          try {
            if (timer.createdAt) {
              const date = new Date(timer.createdAt);
              if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split("T")[0];
              }
            }
          } catch (err) {
            console.warn("Error formatting date for timer:", timer._id, err);
          }

          return {
            id: timer._id || Math.random().toString(),
            rating: timer.rating || 0,
            date: formattedDate,
          };
        });

        console.log("Formatted data:", formattedData);
        setTimerData(formattedData);
        setFilteredTimers(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timer data:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchTimerData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = timerData.filter((timer) =>
      timer.date.toLowerCase().includes(value)
    );
    setFilteredTimers(filtered);
  };

  const getRatingClass = (rating) => {
    if (rating >= 4) return "high-rating";
    if (rating >= 2) return "medium-rating";
    return "low-rating";
  };

  const getRatingDisplay = (rating) => {
    return `${rating}/5`;
  };

  return (
    <motion.div
      className="tracking-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="header">
        <h2 className="title">Session List</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Sessions..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="tracking-table">
            <thead>
              <tr>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimers.length > 0 ? (
                filteredTimers.map((timer) => (
                  <motion.tr
                    key={timer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="session-rating">
                      <span
                        className={`rating-badge ${getRatingClass(
                          timer.rating
                        )}`}
                      >
                        {getRatingDisplay(timer.rating)}
                      </span>
                    </td>
                    <td className="session-date">{timer.date}</td>
                    <td className="session-actions">View</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    No sessions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default TrackingTable;