import { NavLink } from "@/components/NavLink";
import { Home, Search, CalendarDays, Heart, ChefHat } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <ChefHat className="h-7 w-7" />
            <span>RecipeFinder</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/search"
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </NavLink>
            <NavLink
              to="/meal-planner"
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              <CalendarDays className="h-5 w-5" />
              <span>Meal Planner</span>
            </NavLink>
            <NavLink
              to="/favorites"
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </NavLink>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <NavLink to="/" end className="text-foreground/70 hover:text-primary" activeClassName="text-primary">
              <Home className="h-6 w-6" />
            </NavLink>
            <NavLink to="/search" className="text-foreground/70 hover:text-primary" activeClassName="text-primary">
              <Search className="h-6 w-6" />
            </NavLink>
            <NavLink to="/meal-planner" className="text-foreground/70 hover:text-primary" activeClassName="text-primary">
              <CalendarDays className="h-6 w-6" />
            </NavLink>
            <NavLink to="/favorites" className="text-foreground/70 hover:text-primary" activeClassName="text-primary">
              <Heart className="h-6 w-6" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
