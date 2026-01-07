import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { userCategories, userLanguages } = useAuth();
  const navigate = useNavigate();

  if (!userCategories || !userLanguages) return <div className="container">Loading database...</div>;

  const onButtonClick = (e) => {
    const { name, id } = e.target.closest('button');
    navigate(`/${name}/${id}`);
  };

  return (
    <div className="container">
      <div>Choose a Category</div>
      <div className="btn-menu">
        {userCategories
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((c) => (
          <button
            key={c.id}
            name="categories"
            id={c.id}
            onClick={onButtonClick}
          >
            {c.name}
            <span className="badge">{c.cheats.length}</span>
          </button>
        ))}
      </div>
      <div>Choose a Language</div>
      <div className="btn-menu">
        {userLanguages
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((l) => (
          <button
            key={l.id}
            name="languages"
            id={l.id}
            onClick={onButtonClick}
          >
            {l.name}
            <span className="badge">{l.cheats.length}</span>
          </button>
        ))}
      </div>
    </div>
  );
}