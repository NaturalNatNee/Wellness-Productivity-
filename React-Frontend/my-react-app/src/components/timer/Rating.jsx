import React, { useState } from "react";
import "./rating.css";
import EmojiConvertor from "emoji-js"; // This works, but not in use
import axios from "axios";

//import validateSession from "../../../../../server/middleware/validate-session.js";

const token = localStorage.getItem("token");
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

  // Function to handle when a user clicks on a rating


//   const handleRatingClick = async (rating) => {
//     setSelectedRating(rating); // Update the state with the selected rating
//     if (onRate) {
//       onRate(rating); // If an `onRate` function is provided, call it with the selected rating
      
//       try {

//       await instance.post("/newRating",  (req, res) => {
//           const codedRating = {

//   "newRating":`${selectedRating}`
// }
//           const { newRating } = req.codedRating;
//           const Rating = new Timer({
//             newRating: rating,
//            // userId: req.user.id,
//           });
      
//           await Rating.save();
//           res.json({  message: "New Rating Created", Rating });
//         } catch (error) {
//           res.status(500).json({ message: error.message });
//         }
//       });
      
//     }
//   };





const handleRatingClick = async (rating) => {
  setSelectedRating(rating); // Update the state with the selected rating

  if (onRate) {
      onRate(rating); // Call the provided callback with the rating
  }

  try {
      await instance.post("/newRating", { newRating: rating }); // Send the selected rating directly
      console.log("Rating submitted successfully");
  } catch (error) {
      console.error("Error submitting rating:", error);
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
