import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CategoryCheatsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { userCategories, deleteCheat } = useAuth();

  const category = userCategories.find((c) => c.id === parseInt(categoryId));
  
  if (!category) return <Navigate to="/" />;

async function handleDelete(id) {
  const result = await deleteCheat(Number(id));
  if (!result.success) {
    console.error("Failed:", result.error);
    return;
  }
}
  return (
    <>
      <h1>{`Categories > ${category.name}`}</h1>
      <Link to={`/categories/${categoryId}/cheats/new`}>New</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Language</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.cheats.map((cc) => (
            <tr key={cc.id}>
              <td>{cc.title}</td>
              <td>{cc.language}</td>
              <td>{cc.notes}</td>
              <td>
                <div className="item-btn-menu">
                  <button
                    type="button"
                    name="view"
                    onClick={() =>
                      navigate(`/categories/${categoryId}/cheats/${cc.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    type="button"
                    name="edit"
                    onClick={() =>
                      navigate(`/categories/${categoryId}/cheats/${cc.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    name="delete"
                    onClick={() => handleDelete(cc.id)}
                  >
                    Del
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
