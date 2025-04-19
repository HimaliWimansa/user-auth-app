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
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
        <h2 className="text-center mb-4 text-primary">
          <FaSignInAlt className="me-2" /> Log In
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input type="email" ref={emailRef} required className="form-control" placeholder="Enter Email" />
          </div>
          <div className="form-group mb-4">
            <input type="password" ref={passwordRef} required className="form-control" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Log In</button>
        </form>
        <div className="text-center">
          <Link to="/forgot-password" className="small">Forgot Password?</Link>
        </div>
        <div className="text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
