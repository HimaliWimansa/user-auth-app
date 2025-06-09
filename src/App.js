// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Charts from "./components/charts";
import Home from "./components/Home";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import ReportGenerator from "./components/ReportGenerator";
import Prediction from "./components/Prediction";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/prediction"
            element={
              <PrivateRoute>
                <Prediction />
              </PrivateRoute>
            }
          />

          {/* Dashboard (default route) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Charts />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;