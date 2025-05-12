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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductFavoriteDelete = (recipeId) => {
    service
      .delete(`/favorites/recipes/${recipeId}`)
      .then(() => {
        setAllFavorites((prev) => prev.filter((item) => item._id !== recipeId));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      {allFavorites.length > 0 ? (
        <ul>
          {allFavorites.map((recipe) => (
            <li key={recipe._id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Dietary style: {recipe.dietary_style}</p>
              <p>Cooking time: {recipe.cooking_time} min</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleProductFavoriteDelete(recipe._id)}
                  className=" mt-8 w-full bg-[#4D3E7F] text-white py-2 rounded-full text-base font-medium hover:bg-[#47307D] transition"
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tines favoritos </p>
      )}
    </div>
  );
}
