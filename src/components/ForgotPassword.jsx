import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("✅ Check your inbox for further instructions");
    } catch {
      setError("❌ Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Forgot Password</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter your email"
          ref={emailRef}
          required
        />
        <button disabled={loading} type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
