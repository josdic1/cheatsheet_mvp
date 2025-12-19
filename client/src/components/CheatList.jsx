import { CheatItem } from './CheatItem';

export function CheatList({ cheats }) {
  if (cheats.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">∅</div>
        <div className="no-results-text">NO CHEATS FOUND</div>
        <div className="no-results-hint">TRY A DIFFERENT FILTER</div>
      </div>
    );
  }

  return (
    <table className="cheat-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Language</th>
          <th>Category</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cheats.map(cheat => (
          <CheatItem
            key={cheat.id}
            cheat={cheat}
            language={cheat.language}
            category={cheat.category}
          />
        ))}
      </tbody>
    </table>
  );
}