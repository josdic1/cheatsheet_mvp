import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { DateTimeInline } from "../components/DateTimeInline";

export function CheatPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, deleteCheat } = useAuth();

    // Derive cheats from user data
    const cheats = user?.categories?.flatMap(cat => cat.cheats || []) || [];
    
    // Try to find cheat in state or derived list
    const cheat = location.state?.cheat || cheats.find(c => c.id === parseInt(id));

    if (!cheat) return <div className="container">Entry not found.</div>;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this?")) {
            await deleteCheat(cheat.id);
            navigate("/");
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <button onClick={() => navigate(-1)} className="btn" style={{ marginLeft: 0, marginBottom: 20 }}>
                &larr; Back
            </button>

            <div style={{ borderBottom: "1px solid #eee", paddingBottom: 20 }}>
                <h1 style={{ margin: "0 0 10px 0" }}>{cheat.title}</h1>
                <div className="text-muted">
                    Created <DateTimeInline value={cheat.created_at} />
                </div>
            </div>

            <pre className="code-view">
        <code>{cheat.code}</code>
      </pre>

            {cheat.notes && (
                <div style={{ marginBottom: 40 }}>
                    <h4>Notes</h4>
                    <p>{cheat.notes}</p>
                </div>
            )}

            <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
                <button
                    onClick={() => navigate(`/cheats/${cheat.id}/edit`, { state: { cheat } })}
                    className="btn btn-primary"
                    style={{ marginLeft: 0 }}
                >
                    Edit Entry
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete Entry
                </button>
            </div>
        </div>
    );
}