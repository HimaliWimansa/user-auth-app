import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      setError("Failed to log in");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Log In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-2" placeholder="Email" ref={emailRef} required />
        <input type="password" className="form-control mb-3" placeholder="Password" ref={passwordRef} required />
        <button type="submit" className="btn btn-primary w-100">Log In</button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="mt-2 text-center">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
