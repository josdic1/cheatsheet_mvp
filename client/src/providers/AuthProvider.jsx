import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userCategories, setUserCategories] = useState([])
  const [userLanguages, setUserLanguages] = useState([])
  const [allLanguages, setAllLanguages] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const loggedIn = Boolean(user);
  // const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";
  const API_URL = "http://localhost:5555/api";

  useEffect(() => {
    checkSession();
    fetchAllLanguages();
    fetchAllCategories();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/check_session`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setUser(data);
          setUserCategories(data.categories)
          setUserLanguages(data.languages)
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setLoading(false);
    }
  };




  const fetchAllLanguages = async () => {
    try {
      const res = await fetch(`${API_URL}/languages`);
      const data = await res.json();
      setAllLanguages(data);
    } catch (err) {}
  };

  const fetchAllCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setAllCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

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
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ✅ THE "IOU" PATTERN - Just update the flat list
async function createCheat(newCheatData) {
  try {
    const res = await fetch(`${API_URL}/cheats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newCheatData),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const newCheat = await res.json();

    // Update categories
    setUserCategories(prev => {
      const exists = prev.some(c => c.id === newCheat.category_id);
      if (exists) {
        return prev.map(c => 
          c.id === newCheat.category_id
            ? { ...c, cheats: [...c.cheats, newCheat] }
            : c
        );
      }
      return [...prev, { id: newCheat.category_id, name: newCheat.category, cheats: [newCheat] }];
    });

    // Update languages
    setUserLanguages(prev => {
      const exists = prev.some(l => l.id === newCheat.language_id);
      if (exists) {
        return prev.map(l => 
          l.id === newCheat.language_id
            ? { ...l, cheats: [...l.cheats, newCheat] }
            : l
        );
      }
      return [...prev, { id: newCheat.language_id, name: newCheat.language, cheats: [newCheat] }];
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

async function updateCheat(cheatId, updatedData) {
  try {
    const res = await fetch(`${API_URL}/cheats/${cheatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const updatedCheat = await res.json();
    const id = parseInt(cheatId);

    // Update categories
    setUserCategories(prev => {
      const cleaned = prev.map(c => ({
        ...c,
        cheats: c.cheats.filter(ch => ch.id !== id)
      }));
      
      const exists = cleaned.find(c => c.id === updatedCheat.category_id);
      
      const updated = exists
        ? cleaned.map(c => c.id === updatedCheat.category_id
            ? { ...c, cheats: [...c.cheats, updatedCheat] }
            : c)
        : [...cleaned, { id: updatedCheat.category_id, name: updatedCheat.category, cheats: [updatedCheat] }];
      
      return updated.filter(c => c.cheats.length > 0);
    });

    // Update languages
    setUserLanguages(prev => {
      const cleaned = prev.map(l => ({
        ...l,
        cheats: l.cheats.filter(ch => ch.id !== id)
      }));
      
      const exists = cleaned.find(l => l.id === updatedCheat.language_id);
      
      const updated = exists
        ? cleaned.map(l => l.id === updatedCheat.language_id
            ? { ...l, cheats: [...l.cheats, updatedCheat] }
            : l)
        : [...cleaned, { id: updatedCheat.language_id, name: updatedCheat.language, cheats: [updatedCheat] }];
      
      return updated.filter(l => l.cheats.length > 0);
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

async function deleteCheat(cheatId) {
  try {
    const res = await fetch(`${API_URL}/cheats/${cheatId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message };
    }

    const id = parseInt(cheatId);

    setUserCategories(prev => 
      prev
        .map(c => ({ ...c, cheats: c.cheats.filter(ch => ch.id !== id) }))
        .filter(c => c.cheats.length > 0)
    );

    setUserLanguages(prev => 
      prev
        .map(l => ({ ...l, cheats: l.cheats.filter(ch => ch.id !== id) }))
        .filter(l => l.cheats.length > 0)
    );

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

  const value = {
    loading,
    loggedIn,
    user,
    userCategories,
    userLanguages,
    allLanguages,
    allCategories,
    signup,
    login,
    logout,
    checkSession,
    createCheat,
    updateCheat,
    deleteCheat,
  };

  if (loading) {
    return <div>LOADING...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
