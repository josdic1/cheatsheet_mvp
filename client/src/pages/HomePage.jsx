import { useAuth } from "../hooks/useAuth";
import { FilterPanel } from "../components/FilterPanel";

export function HomePage() {
    const { user, allLanguages, allCategories } = useAuth();

    // Derive cheats from user data
    const cheatsOnly = user?.categories?.flatMap(cat => cat.cheats || []) || [];

    if (!user) return <div className="container">Loading database...</div>;

    return (
        <div className="container">
            <FilterPanel
                allCheats={cheatsOnly}
                languages={allLanguages}
                categories={allCategories}
            />
        </div>
    );
}