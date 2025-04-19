// src/components/Signup.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("❌ Failed to create an account. Please try again.");
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
        <h2 className="text-center mb-4 text-primary">
          <FaUserPlus className="me-2" /> Sign Up
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input type="email" ref={emailRef} required className="form-control" placeholder="Enter Email" />
          </div>
          <div className="form-group mb-4">
            <input type="password" ref={passwordRef} required className="form-control" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
