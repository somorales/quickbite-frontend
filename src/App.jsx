import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";

import Filters from "./pages/FiltersPage";
import FilteredResults from "./pages/FilteredResults";
import Favorites from "./pages/Favorites";
import RecipePage from "./pages/RecipePage";
import MealListPage from "./pages/MealListPage";
import NavigationBar from "./components/NavigationBar";
import AllRecipes from "./pages/AllRecipes";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/recipes" element={<AllRecipes />} />

        <Route path="/filters" element={<Filters />} />
        <Route path="/filteredResults" element={<FilteredResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
        <Route path="/mealsList" element={<MealListPage />} />
      </Routes>
      {location.pathname !== `/signup` && location.pathname !== `/login` && (
        <NavigationBar />
      )}
    </>
  );
}
