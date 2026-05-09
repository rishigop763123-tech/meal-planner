import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.png";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover Your Next Favorite Recipe
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md text-white/95">
            Search thousands of delicious recipes and plan your meals effortlessly
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center" onKeyPress={handleKeyPress}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Button size="lg" className="shadow-lg" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Popular Recipes</h2>
          <p className="text-muted-foreground">Showing {recipes.length} delicious recipes</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
