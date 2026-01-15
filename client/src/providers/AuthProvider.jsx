import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { initialData } from "../data/data";

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userCategories, setUserCategories] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cheats, setCheats] = useState([]);

  // Always logged in
  const loggedIn = true;

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Set user to Josh
    setUser(initialData.user);
    
    // Set all languages and categories
    setAllLanguages(initialData.languages);
    setAllCategories(initialData.categories);
    
    // Store raw cheats
    setCheats(initialData.cheats);
    
    // Build userLanguages with nested cheats
    const languagesWithCheats = initialData.languages
      .map(lang => ({
        ...lang,
        cheats: initialData.cheats
          .filter(c => c.language_id === lang.id)
          .map(c => ({
            ...c,
            language: lang.name,
            category: initialData.categories.find(cat => cat.id === c.category_id)?.name
          }))
      }))
      .filter(lang => lang.cheats.length > 0);
    
    // Build userCategories with nested cheats
    const categoriesWithCheats = initialData.categories
      .map(cat => ({
        ...cat,
        cheats: initialData.cheats
          .filter(c => c.category_id === cat.id)
          .map(c => ({
            ...c,
            category: cat.name,
            language: initialData.languages.find(lang => lang.id === c.language_id)?.name
          }))
      }))
      .filter(cat => cat.cheats.length > 0);
    
    setUserLanguages(languagesWithCheats);
    setUserCategories(categoriesWithCheats);
    setLoading(false);
  };

  // Helper to rebuild nested structures after mutations
  const rebuildNestedData = (updatedCheats) => {
    const languagesWithCheats = allLanguages
      .map(lang => ({
        ...lang,
        cheats: updatedCheats
          .filter(c => c.language_id === lang.id)
          .map(c => ({
            ...c,
            language: lang.name,
            category: allCategories.find(cat => cat.id === c.category_id)?.name
          }))
      }))
      .filter(lang => lang.cheats.length > 0);

    const categoriesWithCheats = allCategories
      .map(cat => ({
        ...cat,
        cheats: updatedCheats
          .filter(c => c.category_id === cat.id)
          .map(c => ({
            ...c,
            category: cat.name,
            language: allLanguages.find(lang => lang.id === c.language_id)?.name
          }))
      }))
      .filter(cat => cat.cheats.length > 0);

    setUserLanguages(languagesWithCheats);
    setUserCategories(categoriesWithCheats);
  };

  // Generate next ID
  const getNextId = () => {
    const maxId = cheats.reduce((max, c) => Math.max(max, c.id), 0);
    return maxId + 1;
  };

  // CRUD Operations (local state only)
  function createCheat(newCheatData) {
    const newCheat = {
      ...newCheatData,
      id: getNextId(),
      user_id: 1
    };

    const updatedCheats = [...cheats, newCheat];
    setCheats(updatedCheats);
    rebuildNestedData(updatedCheats);
    
    return { success: true, cheat: newCheat };
  }

  function updateCheat(cheatId, updatedData) {
    const id = parseInt(cheatId);
    const updatedCheats = cheats.map(c => 
      c.id === id ? { ...c, ...updatedData } : c
    );
    
    setCheats(updatedCheats);
    rebuildNestedData(updatedCheats);
    
    return { success: true };
  }

  function deleteCheat(cheatId) {
    const id = parseInt(cheatId);
    const updatedCheats = cheats.filter(c => c.id !== id);
    
    setCheats(updatedCheats);
    rebuildNestedData(updatedCheats);
    
    return { success: true };
  }

  // No-op functions for compatibility
  const login = () => ({ success: true });
  const logout = () => {};
  const signup = () => ({ success: true });
  const checkSession = () => {};

  const value = {
    loading,
    loggedIn,
    user,
    userCategories,
    userLanguages,
    allLanguages,
    allCategories,
    cheats,
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