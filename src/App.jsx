import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Filters from "./pages/FiltersPage";
import FilteredResults from "./pages/FilteredResults";
import Favorites from "./pages/Favorites";
import RecipePage from "./pages/RecipePage";
import MealListPage from "./pages/MealListPage";
import Ingredients from "./pages/Ingredients";
import NavigationBar from "./components/NavigationBar";
import AllRecipes from "./pages/AllRecipes";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<AllRecipes />} />

        <Route path="/filters" element={<Filters />} />
        <Route path="/filteredResults" element={<FilteredResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/recipeId" element={<RecipePage />} />
        <Route path="/mealsList" element={<MealListPage />} />
        <Route path="/mealsList/ingredients" element={<Ingredients />} />
      </Routes>

      <NavigationBar />
    </>
  );
}
