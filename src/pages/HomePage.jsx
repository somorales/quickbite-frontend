import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import SearchForm from "../components/SearchForm.jsx";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);

  useEffect(() => {
    service
      .get(`/recipes`)
      .then((response) => {
        setAllRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  useEffect(() => {
    service
      .get(`/recipes?sort_by=popularity`)
      .then((response) => {
        setMostPopular(response.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  const handleSearchRecipe = (name) => {
    service
      .get(`/recipes?name=${name}`) // get(`/recipes?cooking_time=${cookingTime}&dietary_style $cuisine`)
      .then((response) => {
        setAllRecipes(response.data);

        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <div className="relative flex-grow">
          <SearchForm
            placeholder="search recipe"
            onSearch={handleSearchRecipe}
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
          />
        </div>
        <Link
          to="/filters"
          className="bg-[#47307D] text-white px-4 py-2 rounded-full text-base font-medium whitespace-nowrap"
        >
          filtros
        </Link>
      </div>
      <div class="bottom-4 left-4 text-white">
        <h1 className="text-[#47307D] font-sans text-2xl font-bold py-2">
          Recipes
        </h1>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ver más
        </button>
        {allRecipes.slice(0, 5).map((recipe) => (
          <div key={recipe._id} className="relative p-2">
            <h3 class="text-lg font-semibold text-black">{recipe.name}</h3>
            <div class="text-lg font-semibold text-black">
              {recipe.cooking_time_minutes}
            </div>
            <div class="flex items-center mt-2 text-sm opacity-80">
              <img alt={recipe.name} src={recipe.image} />
            </div>
          </div>
        ))}

        <h1 className="text-[#47307D] font-sans text-2xl font-bold py-2">
          Most Popular
        </h1>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ver más
        </button>
        {mostPopular.slice(0, 5).map((recipe) => (
          <div key={recipe._id} className="relative p-2">
            <h3 class="text-lg font-semibold text-black">{recipe.name}</h3>
            <div class="text-lg font-semibold text-black">
              {recipe.cooking_time_minutes}
            </div>
            <div class="flex items-center mt-2 text-sm opacity-80">
              <img alt={recipe.name} src={recipe.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
