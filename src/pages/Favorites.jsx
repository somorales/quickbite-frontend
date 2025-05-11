import React from "react";
import { useEffect, useState } from "react";

import service from "../services/config.js";

export default function Favorites() {
  const [allFavorites, setAllFavorites] = useState([]);

  useEffect(() => {
    service
      .get(`/favorites`)
      .then((response) => {
        setAllFavorites(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductFavoriteDelete = () => {
    service
      .delete(`/favorites/recipe/${recipesId}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
    </div>
  );
}
