import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LanguageCheatsPage() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const { user, deleteCheat } = useAuth();

  const language = user?.languages?.find((l) => l.id === parseInt(languageId));

  if (!language) return <div>Language not found</div>;

async function handleDelete(id) {
  const result = await deleteCheat(Number(id));
  if (!result.success) {
    console.error("Failed:", result.error);
    return;
  }
}
  return (
    <>
      <h1>{`Languages > ${language.name}`}</h1>
      <Link to={`/languages/${languageId}/cheats/new`}>New</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {language.cheats.map((lc) => (
            <tr key={lc.id}>
              <td>{lc.title}</td>
              <td>{lc.category?.name}</td>
              <td>{lc.notes}</td>
              <td>
                <div className="item-btn-menu">
                  <button
                    type="button"
                    name="view"
                    onClick={() =>
                      navigate(`/languages/${languageId}/cheats/${lc.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    type="button"
                    name="edit"
                    onClick={() =>
                      navigate(`/languages/${languageId}/cheats/${lc.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    name="delete"
                    onClick={() => handleDelete(lc.id)}
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