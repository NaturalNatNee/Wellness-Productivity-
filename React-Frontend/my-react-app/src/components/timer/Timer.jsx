import React, { useState, useEffect } from "react";

import Rating from "./Rating";
import "./timer.css";

function Timer() {
  // State variables to manage the timer and user interactions
  const [time, setTime] = useState(null); // Tracks the remaining time in milliseconds
  const [hours, setHours] = useState(0); // Stores the number of hours for the session
  const [minutes, setMinutes] = useState(0); // Stores the number of minutes for the session
  const [breakMinutes, setBreakMinutes] = useState(0); // Stores the duration of each break in minutes
  const [breakCount, setBreakCount] = useState(0); // Stores the number of breaks the user wants
  const [isRunning, setIsRunning] = useState(false); // Tracks whether the timer is currently running
  const [nowBreak, setNowBreak] = useState("Session Time"); // Indicates whether it's session time or break time
  const [countUp, setCountUp] = useState(false); // Determines if the timer counts up or down
  const [presets, setPresets] = useState([]); // Stores saved timer presets
  const [selectedPreset, setSelectedPreset] = useState(null); // Tracks the currently selected preset
  const [sessionCompleted, setSessionCompleted] = useState(false); // Tracks whether the session has been completed
  const [userRating, setUserRating] = useState(null); // Stores the user's rating for the session

  // Function to calculate the duration of each session segment
  // This divides the total session time evenly based on the number of breaks
  const calculateSessionSegment = () => {
    const totalSessionTime = (hours * 3600 + minutes * 60) * 1000; // Convert hours and minutes to milliseconds
    return totalSessionTime / (breakCount + 1); // Divide the total time by the number of breaks + 1
  };

  // Effect to handle the countdown or count-up logic for the timer
  useEffect(() => {
    // If the timer is not running or there is no time left, do nothing
    if (time === null || time <= 0 || !isRunning) return;

    // Set up an interval to update the timer every second
    const interval = setInterval(() => {
      setTime((prevTime) => (countUp ? prevTime + 1000 : prevTime - 1000)); // Increment or decrement the time
    }, 1000);

    // Clear the interval when the component unmounts or the timer stops
    return () => clearInterval(interval);
  }, [time, isRunning, countUp]);

  // Effect to handle transitions between session time and break time
  useEffect(() => {
    // If the timer reaches 0, determine what to do next
    if (time === 0) {
      if (nowBreak === "Session Time" && breakCount > 0) {
        // If it's session time and there are breaks left, switch to break time
        setNowBreak("Break Time");
        setTime(breakMinutes * 60000); // Set the timer for the break duration
        showWellnessTip(); // Show a wellness tip during the break
      } else if (nowBreak === "Break Time") {
        // If it's break time, switch back to session time
        setNowBreak("Session Time");
        setBreakCount((prev) => prev - 1); // Decrease the number of remaining breaks
        setTime(calculateSessionSegment()); // Set the timer for the next session segment
      } else {
        // If there are no more breaks or session segments, mark the session as completed
        setIsRunning(false);
        setSessionCompleted(true);
        logSession(); // Log the session details
      }
    }
  }, [time, nowBreak, breakCount, breakMinutes, hours, minutes]);

  // Function to start or pause the timer
  const handleStartPauseClick = () => {
    if (isRunning) {
      // If the timer is running, pause it
      setIsRunning(false);
    } else if (time > 0) {
      // If there is time left, resume the timer
      setIsRunning(true);
    } else {
      // If the timer is not running and no time is set, start a new session
      const sessionSegment = calculateSessionSegment(); // Calculate the duration of the first session segment
      setTime(sessionSegment); // Set the timer
      setIsRunning(true); // Start the timer
      setSessionCompleted(false); // Reset the session completion status
    }
  };

  // Function to save the current timer settings as a preset
  const handlePresetSave = () => {
    const newPreset = {
      hours,
      minutes,
      breakMinutes,
      breakCount,
    }; // Create a new preset object with the current settings
    const updatedPresets = [...presets, newPreset]; // Add the new preset to the list of presets
    setPresets(updatedPresets); // Update the state with the new list of presets
    localStorage.setItem("timerPresets", JSON.stringify(updatedPresets)); // Save the presets to localStorage
  };

  // Function to load a selected preset into the timer settings
  const handlePresetSelect = (preset) => {
    setHours(preset.hours); // Set the hours from the preset
    setMinutes(preset.minutes); // Set the minutes from the preset
    setBreakMinutes(preset.breakMinutes); // Set the break duration from the preset
    setBreakCount(preset.breakCount); // Set the number of breaks from the preset
    setSelectedPreset(preset); // Mark the preset as selected
  };

  // Function to display a random wellness tip during breaks
  const showWellnessTip = () => {
    const tips = [
      "Drink plenty of water throughout the day to stay hydrated.",
      "Start your day with a healthy breakfast to boost your energy levels",
      "Practice mindfulness for 5-10 minutes every morning to reduce stress.",
      "Incorporate more fruits and vegetables into your diet for better health",
      "Get at least 30 minutes of physical activity each day.",
      "Make sure you're getting 7-8 hours of sleep every night for optimal health",
      "Take breaks thought the day to stretch and recharge your energy",
    ]; // List of wellness tips
    const randomTip = tips[Math.floor(Math.random() * tips.length)]; // Pick a random tip
    alert(randomTip); // Show the tip in an alert
  };

  // Function to log the completed session details
  const logSession = () => {
    const sessionLog = {
      date: new Date().toLocaleString(), // Record the date and time of the session
      sessionTime: `${hours}h ${minutes}m`, // Record the session duration
      breakTime: `${breakMinutes}m`, // Record the break duration
      breaks: breakCount, // Record the number of breaks
      rating: userRating, // Record the user's rating
    }; // Create a log object with the session details
    const logs = JSON.parse(localStorage.getItem("sessionLogs")) || []; // Retrieve existing logs from localStorage
    logs.push(sessionLog); // Add the new log to the list
    localStorage.setItem("sessionLogs", JSON.stringify(logs)); // Save the updated logs to localStorage
  };

  // Function to check if there is time left in the timer
  const isTimeAvailable = time !== null && time > 0;

  // Function to format the remaining time into a human-readable format (HH:MM:SS)
  const formattedTime = () => {
    let totalSeconds = Math.max(time / 1000, 0); // Convert milliseconds to seconds
    const hours = Math.floor(totalSeconds / 3600); // Calculate the number of hours
    totalSeconds %= 3600; // Remove the hours from the total seconds
    const minutes = Math.floor(totalSeconds / 60); // Calculate the number of minutes
    const seconds = totalSeconds % 60; // Calculate the remaining seconds

    return `${hours > 0 ? `${hours}:` : ""}${minutes > 0 ? `${minutes}:` : ""}${
      seconds < 10 ? `0${seconds}` : seconds
    }`; // Format the time as HH:MM:SS
  };

  // Render the timer UI and handle user interactions
  return (
    <div className="container">
      <div className="clock">
        <h1 className="timer">
          {isTimeAvailable ? formattedTime() : "Set Session"}{" "}
          {/* Display the formatted time or a placeholder */}
        </h1>
        <h3 className="break">
          {isTimeAvailable
            ? `${nowBreak}, ${breakCount}'s left` // Display the current state (session or break) and remaining breaks
            : "Set Break"}
        </h3>
      </div>
      <div className="timer-container">

        <input
          className="time"
          type="number"
          placeholder="hour"
          onChange={(e) => setHours(Number(e.target.value))} // Update the hours state when the user inputs a value
          disabled={isTimeAvailable} // Disable the input if the timer is running

        />
        <input
          className="time"
          type="number"
          placeholder="minutes"

          onChange={(e) => setMinutes(Number(e.target.value))} // Update the minutes state when the user inputs a value
          disabled={isTimeAvailable} // Disable the input if the timer is running
        />
        <input
          className="time"
          type="number"
          placeholder="break minutes"
          onChange={(e) => setBreakMinutes(Number(e.target.value))} // Update the break duration when the user inputs a value
          disabled={isTimeAvailable} // Disable the input if the timer is running

        />
        <input
          className="time"
          type="number"

          placeholder="break count"
          onChange={(e) => setBreakCount(Number(e.target.value))} // Update the number of breaks when the user inputs a value
          disabled={isTimeAvailable} // Disable the input if the timer is running
        />
        <button onClick={handleStartPauseClick}>
          {isRunning ? "Pause" : "Start"}{" "}
          {/* Display "Pause" if the timer is running, otherwise "Start" */}
        </button>
        <button
          onClick={() => {
            setTime(null); // Reset the timer
            setIsRunning(false); // Stop the timer
            setNowBreak("Session Time"); // Reset to session time
            setSessionCompleted(false); // Reset the session completion status
          }}
        >
          Reset
        </button>
        <button onClick={handlePresetSave}>Save Preset</button>
        <select
          onChange={
            (e) => handlePresetSelect(JSON.parse(e.target.value)) // Load the selected preset
          }
          disabled={isTimeAvailable} // Disable the dropdown if the timer is running
        >
          <option value="">Select Preset</option>
          {presets.map((preset, index) => (
            <option key={index} value={JSON.stringify(preset)}>
              {`${preset.hours}h ${preset.minutes}m, ${
                preset.breakMinutes / 60000
              }m break, ${preset.breakCount} breaks`}{" "}
              {/* Display the preset details */}
            </option>
          ))}
        </select>
       
      </div>
      {sessionCompleted && (
        <div className="rating-section">
          <h3>Rate Your Session</h3>
          <Rating onRate={(rating) => setUserRating(rating)} />{" "}
          {/* Allow the user to rate the session */}
        </div>
      )}
    </div>

  );
}

export default Timer;
