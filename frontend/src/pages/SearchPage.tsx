import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [cuisineFilter, setCuisineFilter] = useState<string>("all");
  const [mealTypeFilter, setMealTypeFilter] = useState<string>("all");

  const cuisines = ["all", ...Array.from(new Set(recipes.map((r) => r.cuisine)))];
  const mealTypes = ["all", ...Array.from(new Set(recipes.map((r) => r.mealType)))];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = cuisineFilter === "all" || recipe.cuisine === cuisineFilter;
    const matchesMealType = mealTypeFilter === "all" || recipe.mealType === mealTypeFilter;
    return matchesSearch && matchesCuisine && matchesMealType;
  });

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Search Recipes</h1>
          <p className="text-lg mb-6 text-white/95">
            Find your perfect recipe by name, ingredients, or cuisine
          </p>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by recipe name, ingredients, or cuisine..."
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine === "all" ? "All Cuisines" : cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={mealTypeFilter} onValueChange={setMealTypeFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Meal Types" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "All Meal Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <p className="text-muted-foreground">Found {filteredRecipes.length} recipes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No recipes found. Try adjusting your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
