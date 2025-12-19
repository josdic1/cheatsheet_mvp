import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    await register(email, password);
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2 className="text-center" style={{ marginTop: 0 }}>New Account</h2>

      {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
          Register
        </button>
      </form>

      <div className="text-center mt-4 text-muted">
        Have an account? <Link to="/login" style={{ textDecoration: 'underline' }}>Login here</Link>
      </div>
    </div>
  );
}