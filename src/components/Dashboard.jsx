// src/components/Dashboard.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Charts from "./charts";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="p-4 bg-white rounded shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="text-success fw-bold">📊 Water Quality Dashboard</h2>
            {currentUser && (
              <p className="lead">
                Welcome, <strong>{currentUser.email}</strong>!
              </p>
            )}
          </div>
          <button
            className="btn btn-danger d-flex align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <Charts />
    </div>
  );
}
