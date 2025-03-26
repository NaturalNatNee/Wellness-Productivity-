import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/authentication/ProtectedRoutes"; 
import TrackingTable from "./components/TrackingTable/TrackingTable.jsx"
import Timer from "./components/timer/Timer";


function App() {

  return (
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
  );
}

export default App;