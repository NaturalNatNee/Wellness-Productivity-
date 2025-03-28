import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./TrackingGraph.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);  

const TrackingGraph = () => {

  
  const data = {
    labels: ["session 1 ", "session 2 ", "session 3 ", "session 4 ", "session 5 ", "session 6 ", "session 7 ", "session 8 ", "session 9 ", "session 10 "], 
    datasets: [
      {
        label: "session length",
        data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
        backgroundColor: ["#8B5CF6", "#8B5CF6"],
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }
    
    return (
      <Bar data = {data} options = { options } />
      
    );
  };

export default TrackingGraph;
