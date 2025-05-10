// src/components/ForgotPassword.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaUnlockAlt } from "react-icons/fa";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("✅ Check your inbox for password reset instructions.");
    } catch {
      setError("❌ Failed to reset password. Please try again.");
    }

    setLoading(false);
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
          <FaUnlockAlt className="me-2" /> Reset Password
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
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
          <button disabled={loading} type="submit" className="btn btn-primary w-100 mb-3">
            Reset Password
          </button>
        </form>
        <div className="text-center">
          <Link to="/login" style={{ color: "rgb(162, 65, 38)" }}>Back to Log In</Link>
        </div>
      </div>
    </div>
  );
}
