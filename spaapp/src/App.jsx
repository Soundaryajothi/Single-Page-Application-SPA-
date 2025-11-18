import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// ---------------------- INLINE PAGES -------------------------

const CenterPage = ({ title, children }) => (
  <div className="center-container">
    <div className="center-card">
      <h1>{title}</h1>
      {children}
    </div>
  </div>
);

// Home Page
const Home = () => (
  <CenterPage title="🏡 Home Page">
    <p>Welcome to the colorful Single Page Application!</p>
  </CenterPage>
);

// Login Page
const Login = ({ setLoggedIn }) => {
  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  return (
    <CenterPage title="🔐 Login Page">
      <button className="btn" onClick={handleLogin}>Login</button>
    </CenterPage>
  );
};

// Dashboard Wrapper
const Dashboard = () => (
  <CenterPage title="📊 Dashboard">
    <div className="dash-links">
      <NavLink to="profile" className="dash-item">Profile</NavLink>
      <NavLink to="settings" className="dash-item">Settings</NavLink>
      <NavLink to="notifications" className="dash-item">Notifications</NavLink>
    </div>

    <div className="nested-card">
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="" element={<Navigate to="profile" />} />
      </Routes>
    </div>
  </CenterPage>
);

// Nested Pages
const Profile = () => <h2>👤 Profile Information</h2>;
const Settings = () => <h2>⚙️ App Settings</h2>;
const Notifications = () => <h2>🔔 Notifications Panel</h2>;

// Protected Route Logic
const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="/login" />;
};

// -------------------------- MAIN APP -------------------------
export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  return (
    <BrowserRouter>
      <nav className="top-nav">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/login" className="nav-item">Login</NavLink>
        <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}