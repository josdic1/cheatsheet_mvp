import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // ONE state for everything
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
        if (data.logged_in) {
          setUser(data.user);
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

    setUser((prev) => {
  const catExists = prev.categories.some(c => c.id === newCheat.category_id);
  const langExists = prev.languages.some(l => l.id === newCheat.language_id);

  let newCategories;
  let newLanguages;

  // Handle categories
  if (catExists) {
    newCategories = prev.categories.map(c => 
      c.id === newCheat.category_id
        ? { ...c, cheats: [...c.cheats, newCheat] }
        : c
    );
  } else {
    newCategories = [...prev.categories, { 
      id: newCheat.category_id, 
      name: newCheat.category, 
      cheats: [newCheat] 
    }];
  }

  // Handle languages
  if (langExists) {
    newLanguages = prev.languages.map(l => 
      l.id === newCheat.language_id
        ? { ...l, cheats: [...l.cheats, newCheat] }
        : l
    );
  } else {
    newLanguages = [...prev.languages, { 
      id: newCheat.language_id, 
      name: newCheat.language, 
      cheats: [newCheat] 
    }];
  }

  return {
    ...prev,
    categories: newCategories,
    languages: newLanguages,
  };
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

    setUser((prev) => {
      // Remove from all categories and languages first
      const cleanedCats = prev.categories.map(c => ({
        ...c,
        cheats: c.cheats.filter(ch => ch.id !== parseInt(cheatId))
      }));
      
      const cleanedLangs = prev.languages.map(l => ({
        ...l,
        cheats: l.cheats.filter(ch => ch.id !== parseInt(cheatId))
      }));

      // Check if target category/language exists
      const catExists = cleanedCats.find(c => c.id === updatedCheat.category_id);
      const langExists = cleanedLangs.find(l => l.id === updatedCheat.language_id);

      return {
        ...prev,
        categories: (catExists
          ? cleanedCats.map(c => c.id === updatedCheat.category_id
              ? { ...c, cheats: [...c.cheats, updatedCheat] }
              : c)
          : [...cleanedCats, { id: updatedCheat.category_id, name: updatedCheat.category, cheats: [updatedCheat] }]
        ).filter(c => c.cheats.length > 0),
        languages: (langExists
          ? cleanedLangs.map(l => l.id === updatedCheat.language_id
              ? { ...l, cheats: [...l.cheats, updatedCheat] }
              : l)
          : [...cleanedLangs, { id: updatedCheat.language_id, name: updatedCheat.language, cheats: [updatedCheat] }]
        ).filter(l => l.cheats.length > 0),
      };
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

      setUser((prev) => {
  const updated = {
    ...prev,
    categories: prev.categories
      .map(c => ({ ...c, cheats: c.cheats.filter(ch => ch.id !== parseInt(cheatId)) }))
      .filter(c => c.cheats.length > 0),
    languages: prev.languages
      .map(l => ({ ...l, cheats: l.cheats.filter(ch => ch.id !== parseInt(cheatId)) }))
      .filter(l => l.cheats.length > 0),
  };
  // console.log('categories after delete:', updated.categories.map(c => c.name));
  return updated;
});

      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  }

  const value = {
    loading,
    loggedIn,
    user, // ✅ Everything is here: user.languages, user.categories
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
