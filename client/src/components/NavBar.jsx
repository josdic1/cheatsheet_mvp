import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { X, BookOpen, HelpCircle } from "lucide-react";

export function NavBar() {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">CHEATSHEET</Link>

        <div className="nav-links">
          <button onClick={() => setShowHelp(true)}>
            <HelpCircle size={16} />
            Help
          </button>
          {loggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHelp(false)}>
              <X size={20} />
            </button>

            <div className="modal-icon">
              <BookOpen size={28} />
            </div>

            <h2>Welcome to CHEATSHEET</h2>
            <p className="subtitle">Your personal code snippet library</p>

            <div className="modal-steps">
              <div className="modal-step">
                <span className="step-number">1</span>
                <p className="step-text">
                  <strong>Organize by Language or Category</strong> — Browse your snippets grouped by programming language (Python, JS) or by topic (Auth, API calls).
                </p>
              </div>

              <div className="modal-step">
                <span className="step-number">2</span>
                <p className="step-text">
                  <strong>Save Code Snippets</strong> — Store reusable code with titles, notes, and syntax highlighting. Never lose that useful snippet again.
                </p>
              </div>

              <div className="modal-step">
                <span className="step-number">3</span>
                <p className="step-text">
                  <strong>Quick Access</strong> — Click any language or category from the home screen to instantly view all related cheats.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowHelp(false)}>Got it!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}