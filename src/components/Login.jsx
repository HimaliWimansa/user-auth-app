// src/components/Login.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("❌ Failed to log in. Please check your credentials.");
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/water.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-4 shadow rounded"
        style={{
          minWidth: "350px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          color: "rgb(8, 8, 7)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "rgb(30, 29, 25)" }}>
          <FaSignInAlt className="me-2" /> Log In
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              ref={emailRef}
              required
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              ref={passwordRef}
              required
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Log In
          </button>
        </form>
        <div className="text-center">
          <Link to="/forgot-password" className="text-dark small">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          Need an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
