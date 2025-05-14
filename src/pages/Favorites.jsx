import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import service from "../services/config.js";

export default function Favorites() {
  const [allFavorites, setAllFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setIsLoading(true);
    service
      .get(`/favorites`)
      .then((response) => {
        setAllFavorites(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };

  /* const handleProductFavoriteDelete = (recipeId) => {
    service
      .delete(`/favorites/recipes/${recipeId}`)
      .then((response) => {
        loadFavorites();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };*/
  return (
    <div className=" mt- 6 flex flex-col h-screen bg-[#1A1A1B]">
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">Your favorites:</h1>
      </div>

      {allFavorites.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6 pb-16">
          {allFavorites.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`}>
              <div
                key={recipe.id}
                className="mb-6 relative rounded-lg overflow-hidden"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute bottom-0 left-0 p-2">
                  <p className="text-xl text-white font-extrabold bg-black bg-opacity-20">
                    {recipe.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Start adding favorites to your list!</p>
      )}
    </div>
  );
}
