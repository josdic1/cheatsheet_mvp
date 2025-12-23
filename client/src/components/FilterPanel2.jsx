import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheatList } from "./CheatList";

export function FilterPanel2({ user, languages, categories }) {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

console.log(user.languages[1].cheats)

    return (
        <>
        <div>
            <CheatList cheats={user.languages[1].cheats} />
        </div>
        </>
    );
}