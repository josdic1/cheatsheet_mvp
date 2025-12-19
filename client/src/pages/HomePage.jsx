import { useAuth } from "../hooks/useAuth";
import { FilterPanel } from "../components/FilterPanel";

export function HomePage() {
    const { cheatsOnly, languages, categories } = useAuth();

    if (!cheatsOnly) return <div className="container">Loading database...</div>;

    return (
        <div className="container">
            <FilterPanel
                allCheats={cheatsOnly}
                languages={languages}
                categories={categories}
            />
        </div>
    );
}