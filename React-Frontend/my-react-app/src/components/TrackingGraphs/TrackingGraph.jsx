import React from "react";
import { motion } from "framer-motion";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";
import { Search, Eye } from "lucide-react";
import "./TrackingGraph.css";

const dailyData = [
  { date: "07-01", total: 2.4 },
  { date: "07-02", total: 4.0 },
  { date: "07-03", total: 1.5 },
  { date: "07-04", total: 5.2 },
  { date: "07-05", total: 5.8 },
  { date: "07-06", total: 3.75 },
  { date: "07-07", total: 5.9 },
  { date: "07-08", total: 1.6 },
];

const TrackingGraph = () => {
  return (
    <motion.div
      className="tracking-graph-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>

      <h2 className="title">Daily Data!</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TrackingGraph;
