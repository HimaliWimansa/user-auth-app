// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-background">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "80px" }}
      >
        <div
          className="text-center p-5"
          style={{
            maxWidth: "800px",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(1px)",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            color: "rgb(8, 8, 7)",
          }}
        >
          <h1 className="display-5 fw-bold mb-3" style={{ color: "rgb(30, 29, 25)" }}>
            Welcome to the Water Quality Monitoring System!
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
    </div>
  );
}
