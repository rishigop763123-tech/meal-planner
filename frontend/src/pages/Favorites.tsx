import { Navbar } from "@/components/Navbar";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(favorites);
  }, []);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(favorites);
  };

  const favoriteRecipes = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-10 w-10" />
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-lg text-white/95">Your saved recipes collection</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {favoriteRecipes.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Saved Recipes</h2>
              <p className="text-muted-foreground">{favoriteRecipes.length} recipe(s) saved</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={handleToggleFavorite} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/30" />
            <h2 className="text-2xl font-semibold mb-3">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding recipes to your favorites by clicking the heart icon
            </p>
            <Button onClick={() => navigate("/search")}>Explore Recipes</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;
