import React from "react";
import Charts from "./charts";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary fs-2">Water Quality Dashboard</h4>
        <button
          className="btn btn-danger d-flex align-items-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Log Out
        </button>
      </div>
      <charts />
    </div>
  );
}
