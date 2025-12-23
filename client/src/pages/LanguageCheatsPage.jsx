
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LanguageCheatsPage() {
    const { languageId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

      const language = user?.languages?.find(c => c.id === parseInt(languageId));

        if (!language) return <div>Language not found</div>;

  return (
    <>
      <h1>{language.name}</h1>
      <Link to={`/languages/${languageId}/cheats/new`}>New</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {language.cheats.map(lc => (
            <tr key={lc.id}>
              <td>{lc.title}</td>
              <td>{lc.category?.name}</td>
              <td>{lc.notes}</td>
              <td>
                <div className="item-btn-menu">
                    <button type='button' name='view' onClick={() => navigate(`/languages/${languageId}/cheats/${lc.id}`)}>
                        View
                    </button>
                    <button type='button' name='edit' onClick={() => navigate(`/languages/${languageId}/cheats/${lc.id}/edit`)}>
                        Edit
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