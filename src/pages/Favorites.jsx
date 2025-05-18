import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

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

  const handleProductFavoriteDelete = (recipeId) => {
    service
      .delete(`/favorites/recipes/${recipeId}`)
      .then((response) => {
        loadFavorites();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };
  return (
    <div className=" mt- 6 flex flex-col h-screen bg-[#1A1A1B]">
      <div class="flex justify-center items-center w-full py-8">
        <h1 class="text-lg font-semibold tracking-widest text-[#FFFDD0]">
          F A V O R I T E S
        </h1>
      </div>
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">Your favorites</h1>
      </div>

      {allFavorites.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6 pb-16">
          {allFavorites.map((recipe) => (
            <div
              key={recipe.id}
              className="mb-6 relative rounded-lg overflow-hidden"
            >
              <div className="flex justify-end">
                <button className=" group absolute w-9 h-9 right rounded-md z-50 lg:absolute lg:right-2 lg:top-2">
                  <HeartIcon
                    onClick={() => handleProductFavoriteDelete(recipe._id)}
                    aria-hidden="true"
                    className="h-7 w-7 text-[#FFFDD0]  group-hover:rounded-md"
                  />
                </button>
              </div>
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
          ))}
        </div>
      ) : (
        <p className="px-6  text-xl text-white">
          Start adding favorites to your list!
        </p>
      )}
    </div>
  );
}
