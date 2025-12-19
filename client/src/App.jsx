import { Outlet } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { NavBar } from "./components/Navbar.jsx";

function App() {
  return (
    <>
    <div className="crt">
      <div className="outrun-grid" />
      <AuthProvider>
    <header>
      <NavBar />
    </header>
    <main>
      <Outlet />
    </main>
     </AuthProvider>
     </div>
    </>
  );
}

export default App;