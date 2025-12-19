import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CheatFormSemantic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addCheat, updateCheat, languages, categories } = useAuth();

  const initialData = location.state?.cheat || {
    title: "", code: "", notes: "",
    language_id: languages?.[0]?.id || "",
    category_id: categories?.[0]?.id || ""
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCheat(id, formData);
    } else {
      await addCheat(formData);
    }
    navigate("/");
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1>{id ? "Edit Entry" : "New Entry"}</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Title</label>
          <input
            type="text" required value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Docker Container Reset"
          />
        </div>

        <div className="form-row form-group">
          <div>
            <label style={{ fontWeight: 'bold' }}>Language</label>
            <select
              value={formData.language_id}
              onChange={(e) => setFormData({ ...formData, language_id: parseInt(e.target.value) })}
            >
              {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>Category</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Code</label>
          <textarea
            required rows="12" value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            style={{ fontFamily: 'monospace' }}
          />
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Notes (Optional)</label>
          <textarea
            rows="4" value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <button type="submit" className="btn btn-primary" style={{ marginLeft: 0 }}>
            {id ? "Save Changes" : "Create Entry"}
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}