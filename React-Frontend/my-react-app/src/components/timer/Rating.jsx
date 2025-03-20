import React, { useState } from "react";
import "./rating.css";
//import EmojiConvertor from "emoji-js";

const Rating = ({ onRate }) => {
  // State variable to track the currently selected rating

  const [selectedRating, setSelectedRating] = useState(null);
  const emoji = new EmojiConvertor();
  emoji.init_env(); // Initialize emoji-js environment

  const simle = `${emoji.replace_colons(":smiley:")} happy`;

  // Function to handle when a user clicks on a rating
  const handleRatingClick = (rating) => {
    setSelectedRating(rating); // Update the state with the selected rating
    if (onRate) {
      onRate(rating); // If an `onRate` function is provided, call it with the selected rating
    }
  };

  // Render the rating component
  return (
    <div className="rating-container">
      {/* Create a list of rating options from 1 to 5 */}
      {[smile, 2, 3, 4, 5].map((rating) => (
        <div
          key={rating} // Each rating box needs a unique key for React to track it
          className={`rating-box ${
            selectedRating === rating ? "selected" : ""
          }`} // Add a "selected" class if this rating is selected
          onClick={() => handleRatingClick(rating)} // Call the handleRatingClick function when the box is clicked
        >
          {rating} {/* Display the rating number inside the box */}
        </div>
      ))}
    </div>
  );
};

export default Rating;
