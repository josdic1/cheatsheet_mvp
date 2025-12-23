import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar container">
      <Link to="/" className="nav-brand">GOTO</Link>

      <div className="nav-links">
        {user ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}