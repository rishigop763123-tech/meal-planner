export interface Recipe {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  mealType: string;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}
