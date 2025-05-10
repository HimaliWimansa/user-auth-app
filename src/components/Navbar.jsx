// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
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
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        backgroundColor: "rgb(30, 29, 25)",
        color: "white",
        padding: "12px 0",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/" style={{ fontSize: "1.25rem" }}>
          Water Quality Monitoring System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            borderColor: "white",
          }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {currentUser && (
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  <FaTachometerAlt className="me-1" /> Dashboard
                </Link>
              </li>
            )}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link text-white">
                    <FaHome className="me-1" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link text-white">
                    <FaUserPlus className="me-1" /> Sign Up
                  </Link>
                </li>
              </>
            )}
            {currentUser && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link text-white"
                  style={{
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
