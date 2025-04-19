// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaHome, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          💧 Water Quality App
        </Link>

        <button
          className="navbar-toggler"
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
            {/* Only show Dashboard link if logged in */}
            {currentUser && (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <FaTachometerAlt className="me-1" /> Dashboard
                </Link>
              </li>
            )}
            {/* Show Home link only if NOT logged in */}
            {!currentUser && (
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
            )}
            {/* Show Login and Signup if NOT logged in */}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <FaUserPlus className="me-1" /> Sign Up
                  </Link>
                </li>
              </>
            )}
            {/* Logout button if logged in */}
            {currentUser && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link"
                  style={{ color: "white", textDecoration: "none" }}
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
