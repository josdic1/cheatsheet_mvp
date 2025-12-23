
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CategoryCheatsPage() {
    const { categoryId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

      const category = user?.categories?.find(c => c.id === parseInt(categoryId));

        if (!category) return <div>Category not found</div>;

  return (
    <>
      <h1>{category.name}</h1>
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
          {category.cheats.map(cc => (
            <tr key={cc.id}>
              <td>{cc.title}</td>
              <td>{cc.language?.name}</td>
              <td>{cc.notes}</td>
              <td>
                <div className="item-btn-menu">
                    <button type='button' name='view' onClick={() => navigate(`/categories/${categoryId}/cheats/${cc.id}`)}>
                        View
                    </button>
                     <button type='button' name='edit' onClick={() => navigate(`/categories/${categoryId}/cheats/${cc.id}/edit`)}>
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