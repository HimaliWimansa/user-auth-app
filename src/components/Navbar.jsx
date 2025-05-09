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
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "rgb(30, 29, 25)", color: "white" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
           Water Quality Monitoring System
        </Link>

        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  <FaTachometerAlt className="me-1" /> Dashboard
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
            )}
            {!currentUser && (
              <>
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
                  style={{ textDecoration: "none" }}
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
