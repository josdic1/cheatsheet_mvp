import { useState } from "react";
import { Copy, Check, Terminal, X } from "lucide-react"; // Assuming you use lucide-react icons
import { DateTimeInline } from "../components/DateTimeInline";
import { useNavigate } from "react-router-dom";

export function CheatItem({ cheat, onDelete, langName, catName }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cheat.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
        // Trigger the delete passed from parent
        onDelete(cheat.id); 
    }
  };

  return (
    <tr>
      <td>
        <strong>{cheat.title}</strong>
      </td>

      <td>
        {/* Simple text display of Language and Category */}
        <span>[{langName.toUpperCase()}] </span>
        <span>{catName.toUpperCase()}</span>
      </td>

      <td>
        <button onClick={handleCopy} title="Copy Code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? " Copied" : " Copy"}
        </button>

        <button onClick={() => setShowCode(true)} title="View Code">
          <Terminal size={14} /> Code
        </button>
      </td>

      <td>{cheat.notes}</td>
      <td>
        <DateTimeInline value={cheat.created_at} />
      </td>
      <td>
        <DateTimeInline value={cheat.updated_at} />
      </td>

      <td>
        <button
          onClick={() => navigate(`/cheats/${cheat.id}`, { state: { cheat } })}
        >
          View
        </button>
        <button
          onClick={() =>
            navigate(`/cheats/${cheat.id}/edit`, { state: { cheat } })
          }
        >
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>

        {showCode && (
          <CodeModal
            code={cheat.code}
            title={cheat.title}
            onClose={() => setShowCode(false)}
          />
        )}
      </td>
    </tr>
  );
}

function CodeModal({ code, title, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Note: Without styles, this will render inline at the bottom of the table cell.
  // You may need minimal inline styles (like position: fixed) if you want it to pop up.
  return (
    <div style={{ border: "1px solid black", padding: "1rem", background: "white" }}>
      <div>
        <h3>Source: {title}</h3>
        <div>
          <button onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? " Copied" : " Copy"}
          </button>
          <button onClick={onClose}>
            <X size={20} /> Close
          </button>
        </div>
      </div>
      <div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}