import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand text-primary fs-3 fw-bold" to="/">
          Water Quality Dashboard
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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <FaChartBar className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FaSignInAlt className="me-2" /> Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                <FaUserPlus className="me-2" /> Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
