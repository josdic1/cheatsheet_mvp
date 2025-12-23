import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function HomePage2() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div className="container">Loading database...</div>;

  const onButtonClick = (e) => {
    const { name, id } = e.target;
    navigate(`/${name}/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="btn-menu">
          {user.categories.map((c) => (
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
        <div className="btn-menu">
          {user.languages.map((l) => (
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
