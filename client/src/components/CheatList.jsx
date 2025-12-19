import { CheatItem } from "./CheatItem";

export function CheatList({ cheats }) {
    if (!cheats || cheats.length === 0) {
        return (
            <div style={{ padding: "40px 0", color: "#888", fontStyle: "italic" }}>
                No entries found matching your criteria.
            </div>
        );
    }

    return (
        <table className="cheat-table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Language & Category</th>
                <th>Notes</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cheats.map((cheat) => (
                <CheatItem key={cheat.id} cheat={cheat} />
            ))}
            </tbody>
        </table>
    );
}