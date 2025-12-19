import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FerrisWheel, FileAxis3D } from "lucide-react";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
        navigate("/");
    };

    return (
        <div className="auth-box">
            <h2 className="text-center" style={{ marginTop: 0 }}>Login </h2>
                <button type='button' onClick={() => {
                    setEmail('josh@josh.com')
                    setPassword('1111')}
                }><FerrisWheel size={16} strokeWidth={1.5} /></button>

            {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required autoFocus
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                    Authenticate
                </button>
            </form>

            <div className="text-center mt-4 text-muted">
                Need an account? <Link to="/signup" style={{ textDecoration: 'underline' }}>Register here</Link>
            </div>
        </div>
    );
}