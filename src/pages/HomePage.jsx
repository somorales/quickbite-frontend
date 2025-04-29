import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);

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
      <div class="bottom-4 left-4 text-white">
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
