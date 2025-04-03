import React, { useState } from "react";
import "./rating.css";
import axios from "axios";
import authService from "../../services/authService";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/timer", // Replace this with your API's base URL
  headers: {
    Authorization: `Bearer ${token}`, // Add your default authorization header if needed
    "Content-Type": "application/json", // Set the default content type for requests
  },
});

const currentUser = await authService.getCurrentUser();
const userId = await currentUser?._id; // Safely access the _id property
console.log(userId); // Outputs: "67dc959efeaa51fe963209ee"

const Rating = ({ onRate }) => {
  // State variable to track the currently selected rating
  const [selectedRating, setSelectedRating] = useState(null);

  // Emoji mapping to numbers
  const emojiMap = [
    { emoji: "😢", value: 1 }, // Saddest
    { emoji: "😟", value: 2 },
    { emoji: "😐", value: 3 },
    { emoji: "🙂", value: 4 },
    { emoji: "😁", value: 5 }, // Happiest
  ];

  const handleRatingClick = async (rating) => {
    setSelectedRating(rating); // Update the state with the selected rating

    if (onRate) {
      onRate(rating); // Call the provided callback with the rating
    }

    try {
      await instance.post("/newRating", { userId: userId, newRating: rating }); // Send the selected rating directly
      console.log("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // Render the rating component
  return (
    <div className="rating-container">
      {/* Create a list of emoji rating options */}
      {emojiMap.map((item, index) => (
        <div
          key={index} // Each rating box needs a unique key for React to track it
          className={`rating-box ${
            selectedRating === item.value ? "selected" : ""
          }`} // Add a "selected" class if this rating is selected
          onClick={() => handleRatingClick(item.value)} // Call the handleRatingClick function with the corresponding number
        >
          {item.emoji} {/* Display the emoji inside the box */}
        </div>
      ))}
    </div>
  );
};

export default Rating;