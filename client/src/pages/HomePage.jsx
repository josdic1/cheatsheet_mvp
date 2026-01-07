import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { userCategories, userLanguages } = useAuth();
  const navigate = useNavigate();

  if (!userCategories || !userLanguages) return <div className="container">Loading database...</div>;

  const onButtonClick = (e) => {
    const { name, id } = e.target;
    navigate(`/${name}/${id}`);
  };

  return (
    <>
      <div className="container">
        <div>Categories</div>
        <div className="btn-menu">
          {userCategories.map((c) => (
            <button
              key={c.id}
              name="categories"
              id={c.id}
              onClick={onButtonClick}
            >
              {c.name}
            </button>
          ))}
        </div>
         <div>Languages</div>
        <div className="btn-menu">
          {userLanguages.map((l) => (
            <button
              key={l.id}
              name="languages"
              id={l.id}
              onClick={onButtonClick}
            >
              {l.name}
            </button>
          ))}
        </div>
        
      </div>
    </>
  );
}
