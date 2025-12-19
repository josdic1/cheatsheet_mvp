import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cheatsOnly, setCheatsOnly] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  const API_URL = "http://localhost:5555/api";

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const r = await fetch(`${API_URL}/check_session`, {
        credentials: "include",
      });
      if (!r.ok) {
        throw new Error("💥 Error");
      }
      const data = await r.json();
      if (data.logged_in) {
        setLoggedIn(true);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.categories) {
      const cheats = user.categories.flatMap((cat) => cat.cheats || []);
      setCheatsOnly(cheats);
    }
  }, [user]);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch(`${API_URL}/languages`, {
          credentials: "include",
        });
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    }

    fetchLanguages();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`, {
          credentials: "include",
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  async function signup(credentials) {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        await checkSession();
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  }

  async function login(credentials) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        await checkSession();
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setLoggedIn(false);
    }
  };

  const createCheat = async (cheatData) => {
    try {
      const res = await fetch(`${API_URL}/cheats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(cheatData),
      });

      if (res.ok) {
        const newCheat = await res.json();
        setCheatsOnly((prev) => [...prev, newCheat]);
        return { success: true, cheat: newCheat };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  };

  const updateCheat = async (id, cheatData) => {
    try {
      const res = await fetch(`${API_URL}/cheats/${parseInt(id, 10)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(cheatData),
      });

      if (res.ok) {
        const updatedCheat = await res.json();
        setCheatsOnly((prev) => {
          return prev.map((c) => (c.id == id ? updatedCheat : c)); // == instead of ===
        });
        return { success: true, cheat: updatedCheat };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  };

  const deleteCheat = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cheats/${parseInt(id, 10)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setCheatsOnly((prev) => prev.filter((c) => c.id !== parseInt(id)));
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  };

  const value = {
    loading,
    loggedIn,
    user,
    login,
    logout,
    signup,
    cheatsOnly,
    createCheat,
    updateCheat,
    deleteCheat,
    languages,
    categories,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
