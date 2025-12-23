

export function CheatList({ user }) {
  if (!catCheatObj?.length) {
    return <p>No cheats</p>;
  }

  return (
    <table className="cheat-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Language</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {catCheatObj.map((category) =>
          category.cheats.map((cheat) => (
            <tr key={cheat.id}>
              <td>{cheat.title}</td>
              <td>{cheat.language}</td>
              <td>{cheat.category}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}