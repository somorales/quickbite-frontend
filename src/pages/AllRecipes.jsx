import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";

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

  return (
    <div>
      <div className="flex gap-2 mb-6"></div>
      <div class="bottom-4 left-4 text-white">
        <h1 className="text-[#47307D] font-sans text-2xl font-bold py-2">
          Recipes
        </h1>
        {allRecipes.map((recipe) => (
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
