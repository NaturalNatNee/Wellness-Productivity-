import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./TrackingTable.css";
import authService from "../../services/authService";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimerData = async () => {
      try {
        setLoading(true);

        const currentUser = await authService.getCurrentUser();
        if (!currentUser || !currentUser._id) {
          throw new Error("User not logged in or user ID not found");
        }
        const userId = currentUser?._id;

        const response = await instance.get(`/viewRating?userId=${userId}`);
        console.log("Raw data from API:", response);

        // Access the Rating array directly
        const timers = response.data.Ratings || [];

        const formattedData = timers.map((timer) => {
          let formattedDate = "Unknown date";
          try {
            if (timer.createdAt) {
              const date = new Date(timer.createdAt);

              if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });
              }
            }
          } catch (err) {
            console.warn("Error formatting date for timer:", timer._id, err);
          }

          return {
            id: timer._id || Math.random().toString(),
            rating: timer.newRating || 0, // Adjust based on the actual property name
            date: formattedDate,
          };
        });

        setTimerData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timer data:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchTimerData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: timerData.map((timer) => timer.date), // Dates as labels
    datasets: [
      {
        label: "Productivity Rating",
        data: timerData.map((timer) => timer.rating), // Ratings as data points
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Productivity Over Time",
      },
    },
  };

  return (
    <motion.div
      className="tracking-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="header">
        <h2 className="title">Productivity Chart</h2>
      </div>
      <div className="chart-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </motion.div>
  );
};

export default TrackingTable;