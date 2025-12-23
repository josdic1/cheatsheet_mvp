
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LanguageCheatView() {
    const { user } = useAuth()
    const { languageId, cheatId } = useParams()
    const navigate = useNavigate()

      // Find the language (door)
  const language = user?.languages?.find(l => l.id === parseInt(languageId));
  
  // Find the cheat through that door
  const cheat = language?.cheats?.find(ch => ch.id === parseInt(cheatId));

        if (!language) return <div>Language not found</div>;

    return (
        <>
        <button type='button' onClick={() => navigate(-1)}> Go Back </button>
            <h2>{cheat.title}</h2>
            <pre>{cheat.code}</pre>
            <p>{cheat.notes}</p>
           <p>{cheat.category.name}</p>
            <p>{cheat.language.name}</p>
            <p>{cheat.created_at}</p>
            <p>{cheat.updated_at}</p>
        </>
)
}