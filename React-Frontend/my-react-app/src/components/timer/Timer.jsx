import React, { useState, useEffect } from "react";
import "./timer.css";

function Timer() {
  const [time, setTime] = useState(); // this is the main time we see counting down (hours,minutes and seconds are converted to milliseconds and stored in here)
  const [hours, setHours] = useState(0); // this is hour place holder it's zero for now but once user inputs hour and hits start this gets the value they added inside hours
  const [minutes, setMinutes] = useState(0); // this is works like hours
  const [seconds, setSeconds] = useState(0); // this is works like minutes
  useEffect(() => {
    // this useEffects handles the count down
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1000); // this subtracts 1000 milliseconds from time(named here as "prevTime") and updates the "time state" using setTime fuction
    }, 1000); // this means that the useEffect runs every 1000 milisecond (1 second)
    return () => clearInterval(interval);
  });
  const handleClick = (e) => {
    // this runs when the start button is clicked
    const milliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000; // here is where the millisecond is being calculated
    setTime(milliseconds); // the time useState is being asigned using setTime()
  };

  const handleHoursChange = (e) => {
    // this runs when hour is set
    setHours(Number(e.target.value)); // this takes the hour set by user and converts it into number then sets it as the hour
  };
  const handleMinutesChange = (e) => {
    // this runs when minutes is set
    setMinutes(Number(e.target.value));
  };
  const handleSecondsChange = (e) => {
    // this runs when second is set
    setSeconds(Number(e.target.value));
  };

  const formatedTime = () => {
    // this formats the time by taking the milliseconds and and calculating how much hours, minutes and seconds is left
    let seconds = time / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60; // this makes sure that the timer starts counting down from 59-0
    minutes = minutes % 60;
    const isHour = hours > 0;
    const isMinute = minutes > 0;
    return `${isHour ? hours + ":" : ""}${
      isMinute ? minutes + ":" : ""
    }${seconds}`; // returns formatted time to be displayed (if hour and minute are zero they are set to not be displayed)
  };

  const isTimeAvailable = time > -1;

  return (
    <>  <h1 className="timer">
          {isTimeAvailable ? formatedTime() : "Set Session"}
        </h1>
        <h3 className= "breake">Set Break</h3>
      <div className="timer-container">
      
        <input
          className="time"
          type="number"
          placeholder="hour"
          onChange={handleHoursChange}
          disabled={isTimeAvailable}
        />
        <input
          className="time"
          type="number"
          placeholder="minutes"
          onChange={handleMinutesChange}
          disabled={isTimeAvailable}
        />
        <input
          className="time"
          type="number"
          placeholder="seconds"
          onChange={handleSecondsChange}
          disabled={isTimeAvailable}
        />
        <button onClick={handleClick} disabled={isTimeAvailable}>
          start
        </button>
        <button onClick={() => setTime(-1)}>reset</button>
      </div>
    </>
  );
}

export default Timer;
