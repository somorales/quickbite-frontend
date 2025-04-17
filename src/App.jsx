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

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/filteredResults" element={<FilteredResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/recipeId" element={<RecipePage />} />
        <Route path="/mealsList" element={<MealListPage />} />
        <Route path="/mealsList/ingredients" element={<Ingredients />} />
      </Routes>
      <Footer />
    </>
  );
}
