
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CategoryCheatView() {
    const { user } = useAuth()
    const { categoryId, cheatId } = useParams()
    const navigate = useNavigate()

      // Find the category (door)
  const category = user?.categories?.find(c => c.id === parseInt(categoryId));
  
  // Find the cheat through that door
  const cheat = category?.cheats?.find(ch => ch.id === parseInt(cheatId));

        if (!cheat) return <div>Category not found</div>;

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