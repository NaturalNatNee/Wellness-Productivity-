import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/authentication/ProtectedRoutes"; 
import TrackingTable from "./components/TrackingTable/TrackingTable.jsx"
import Timer from "./components/timer/Timer";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    });

    useEffect(() => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        //loc
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };

     return (
       <div>
         <div id="Dark-Mode">
           <button
             onClick={toggleDarkMode}
             style={{
               borderRadius: "1000px",
               backgroundColor: "var(--accent-color)",
               color: "var(--base-color)",
               font: "inherit",
               fontWeight: "600",
               textTransform: "uppercase",
               cursor: "pointer",
               transition: "150ms ease",
               marginLeft: "10px"
             }}
           >
             DARK/LIGHT
           </button>
         </div>
         <Router>
           <Routes>
             {/* Public routes */}
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />

             {/* Protected routes */}
             <Route element={<ProtectedRoute />}>
               <Route path="/timer" element={<Timer />} />
               <Route path="/progress" element={<TrackingTable />} />
               <Route path="/dashboard" element={<Dashboard />} />
               {/* Add other protected routes here */}
             </Route>

             {/* Redirect root to login page */}
             <Route path="/" element={<Navigate to="/login" />} />
           </Routes>
         </Router>
       </div>
     );
}

export default App;