import React, { useState } from "react";
import "./rating.css";
import EmojiConvertor from "emoji-js"; // This works, but not in use
import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkYzk1OWVmZWFhNTFmZTk2MzIwOWVlIiwiZmlyc3ROYW1lIjoicm9iZW51cyIsImxhc3ROYW1lIjoiZ3V0ZXR0YSIsImVtYWlsIjoiZ0BoaW0ueWVzIn0sImlhdCI6MTc0MzU0NTQ3MiwiZXhwIjoxNzQzNTg4NjcyfQ.eZsTOLh-tVBoGXv9KmYjEMpoH2j1vN1Zhwoo2VZt-JY"

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/timer', // Replace this with your API's base URL
  headers: {
    'Authorization': `Bearer ${token}` , // Add your default authorization header if needed
    'Content-Type': 'application/json', // Set the default content type for requests
  },
});



const Rating = ({ onRate }) => {
  // State variable to track the currently selected rating
  const [selectedRating, setSelectedRating] = useState(null);

  // Initialize emoji-js environment
  const emoji = new EmojiConvertor();
  emoji.init_env();
  console.log(selectedRating)

  // Define the smile emoji
  //const smile = `${emoji.replace_colons(":smiley:")} happy`;
const codedRating = {
  "userId":"67dc959efeaa51fe963209ee",
  "newRating":`${selectedRating}`
}
  // Function to handle when a user clicks on a rating
  const handleRatingClick = (rating) => {
    setSelectedRating(rating); // Update the state with the selected rating
    if (onRate) {
      onRate(rating); // If an `onRate` function is provided, call it with the selected rating
      

      instance.post("/newRating", validateSession, async (req, res) => {
        try {
          const { newRating } = req.codedRating;
          const Rating = new Timer({
            newRating: newRating,
            userId: req.user.id,
          });
      
          await Rating.save();
          res.json({ userId: req.user._id, message: "New Rating Created", Rating });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
    }
  };

  // Render the rating component
  return (
    <div className="rating-container">
      {/* Create a list of rating options from 1 to 5 */}
      {[1, 2, 3, 4, 5].map((rating, index) => (
        <div
          key={index} // Each rating box needs a unique key for React to track it
          className={`rating-box ${
            selectedRating === rating ? "selected" : ""
          }`} // Add a "selected" class if this rating is selected
          onClick={() => handleRatingClick(rating)} // Call the handleRatingClick function when the box is clicked
        >
          {rating} {/* Display the rating inside the box */}
        </div>
      ))}
    </div>
  );
};

export default Rating;
