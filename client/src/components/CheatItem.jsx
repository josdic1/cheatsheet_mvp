import { Edit, Trash2, Check, View, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function CheatItem({ cheat, language, category }) {
  const navigate = useNavigate();
  const { deleteCheat } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleEdit = () => {
    navigate(`/cheats/${cheat.id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${cheat.title}"?`)) {
      await deleteCheat(cheat.id);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cheat.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <tr>
      <td className="cheat-id">#{cheat.id.toString().padStart(4, "0")}</td>
      <td className="cheat-title">{cheat.title}</td>
      <td className="cheat-lang">{language?.name || "UNKNOWN"}</td>
      <td className="cheat-cat">{category?.name || "UNKNOWN"}</td>
      <td className="cheat-notes">{cheat.notes || "—"}</td>
      <td className="cheat-actions">
        <button onClick={handleCopy} title="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <button onClick={() => navigate(`/cheats/${cheat.id}`)} title="View">
          <View size={14} />
        </button>
        <button onClick={handleEdit} title="Edit">
          <Edit size={14} />
        </button>
        <button onClick={handleDelete} title="Delete" className="delete">
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}