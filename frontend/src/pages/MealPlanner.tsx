import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { recipes } from "@/data/recipes";
import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface MealPlan {
  [key: string]: string | null; // recipeId or null
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if (saved) {
      setMealPlan(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    toast.success("Meal plan saved successfully!");
  };

  const handleAddRecipe = (day: string, recipeId: string) => {
    setMealPlan((prev) => ({ ...prev, [day]: recipeId }));
    setSelectedDay(null);
  };

  const handleRemoveRecipe = (day: string) => {
    setMealPlan((prev) => {
      const newPlan = { ...prev };
      delete newPlan[day];
      return newPlan;
    });
  };

  const getRecipe = (recipeId: string | null) => {
    if (!recipeId) return null;
    return recipes.find((r) => r.id === recipeId);
  };

  const totalCalories = Object.values(mealPlan).reduce((sum, recipeId) => {
    const recipe = getRecipe(recipeId);
    return sum + (recipe?.nutrition.calories || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Weekly Meal Planner</h1>
          <p className="text-lg text-white/95">Plan your meals for the entire week</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Your Weekly Plan</h2>
            <p className="text-muted-foreground">Total weekly calories: {totalCalories}</p>
          </div>
          <Button onClick={handleSave} size="lg" className="shadow-custom">
            <Save className="h-5 w-5 mr-2" />
            Save Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DAYS.map((day) => {
            const recipe = getRecipe(mealPlan[day] || null);

            return (
              <Card key={day} className="shadow-custom">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3">{day}</h3>

                  {recipe ? (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{recipe.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {recipe.nutrition.calories} cal
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleRemoveRecipe(day)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Dialog open={selectedDay === day} onOpenChange={(open) => setSelectedDay(open ? day : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full h-32 border-dashed" onClick={() => setSelectedDay(day)}>
                          <div className="text-center">
                            <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to add</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select Recipe for {day}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {recipes.map((r) => (
                            <Card
                              key={r.id}
                              className="cursor-pointer hover:shadow-lg transition-shadow"
                              onClick={() => handleAddRecipe(day, r.id)}
                            >
                              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                              </div>
                              <CardContent className="p-3">
                                <p className="font-medium line-clamp-1">{r.name}</p>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {r.nutrition.calories} cal
                                </Badge>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MealPlanner;
