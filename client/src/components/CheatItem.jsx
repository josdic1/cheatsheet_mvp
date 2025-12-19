import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheatList } from "./CheatList";

export function FilterPanel({ allCheats, languages, categories }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const displayedCheats = allCheats.filter((cheat) => {
    if (selectedLanguage && cheat.language_id !== parseInt(selectedLanguage))
      return false;
    if (selectedCategory && cheat.category_id !== parseInt(selectedCategory))
      return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        cheat.title?.toLowerCase().includes(term) ||
        cheat.code?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="control-bar">
        {/* 1. Search (Takes 2fr space) */}
        <input
          type="text"
          placeholder="Type to filter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 2. Language Dropdown (Takes 1fr) */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        {/* 3. Category Dropdown (Takes 1fr) */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* 4. New Button (Takes auto space) */}
        <button
          onClick={() => navigate("/cheats/new")}
          className="btn btn-primary"
        >
          + New Entry
        </button>
      </div>

      <CheatList cheats={displayedCheats} />
    </div>
  );
}
