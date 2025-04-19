// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="p-5 bg-light rounded shadow-sm">
        <h1 className="display-5 fw-bold text-primary mb-3">
          🌊 Welcome to the Water Quality Monitoring System!
        </h1>
        <p className="lead mb-4">
          Monitor real-time water parameters like pH, Turbidity, TDS, and Temperature.
          <br />
          Ensure safe, clean water anytime, anywhere.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            Log In
          </Link>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2907/2907965.png"
          alt="Water Monitoring"
          className="img-fluid mt-4"
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
}
