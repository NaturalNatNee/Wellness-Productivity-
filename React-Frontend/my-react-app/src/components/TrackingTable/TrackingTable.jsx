import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import "./TrackingTable.css"; // Import the CSS file
import EmojiConvertor from "emoji-js"

const orderData = [
  { id: "Coding", user: "", total: 2.4, status: "Happy", date: "2023-07-01" },
  { id: "Coding", user: "", total: 4.0, status: "Processing", date: "2023-07-02" },
  { id: "Coding", user: "", total: 1.5, status: "Shipped", date: "2023-07-03" },
  { id: "Coding", user: "", total: 5.2, status: "Pending", date: "2023-07-04" },
  { id: "Coding", user: "", total: 5.8, status: "Happy", date: "2023-07-05" },
  { id: "Coding", user: "", total: 3.75, status: "Processing", date: "2023-07-06" },
  { id: "Coding", user: "", total: 5.9, status: "Shipped", date: "2023-07-07" },
  { id: "Coding", user: "", total: 1.6, status: "Happy", date: "2023-07-08" },
];

const emoji = new EmojiConvertor();
emoji.init_env(); // Initialize emoji-js environment


const TrackingTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData.filter(
      (order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Happy":
        return `${emoji.replace_colons(":smiley:")} happy`;
      case "Nuetral":
        return `${emoji.replace_colons(":nerd_face:")} nerd`;
      case "Shipped":
        return `${emoji.replace_colons(":face_with_rolling_eyes:")} status-shipped`;
      default:
        return `${emoji.replace_colons(":thinking_face:")} status-pending`;
    }
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
          <Search className="search-icon" size={18} />
        </div>
      </div>

      <div className="table-container">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>User</th>
              <th>Study Time</th>
              <th>MoodTracker</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="order-id">{order.id}</td>
                <td className="customer-name">{order.customer}</td>
                <td className="order-total">{order.total.toFixed(2)} hrs </td>
                <td className="order-status">
                  <span
                    className={`status-badge ${getStatusClassName(
                      order.status
                    )}`}dangerouslySetInnerHTML={{
                      __html: getStatusClassName(order.status),
                    }}
                  />
                </td>
                <td className="order-date">{order.date}</td>
                <td className="order-actions">
                  <button className="view-button">
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TrackingTable;