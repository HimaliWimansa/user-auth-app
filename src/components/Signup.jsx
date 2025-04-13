import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter your email"
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Enter your password"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 btn-lg">
          Sign Up
        </button>
      </form>
      <div className="mt-3 text-center">
        Already have an account? <Link to="/login" className="text-decoration-none">Log In</Link>
      </div>
    </div>
  );
}
