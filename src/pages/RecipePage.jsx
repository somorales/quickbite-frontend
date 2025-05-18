import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Loading from "../components/Loading.jsx";
import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function RecipePage() {
  const navigate = useNavigate();

  const params = useParams();

  const [recipe, setRecipe] = useState({});

  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    service
      .get(`/recipes/${params.recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddFavorites = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
    }

    const recipeFavorite = {
      recipeId: params.recipeId,
    };

    try {
      await service.post(`/favorites`, recipeFavorite);

      navigate(`/favorites`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMealList = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
    }

    const recipeMealList = {
      recipeId: params.recipeId,
    };

    try {
      await service.post(`/basket`, recipeMealList);

      navigate(`/mealsList`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1A1A1B]">
      <div class="flex justify-center items-center w-full py-8">
        <h1 class="text-lg font-semibold tracking-widest text-[#FFFDD0]">
          R E C I P E
        </h1>
      </div>
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">{recipe.name}</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-16">
        <div key={recipe.id} className="mb-6 relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-44  rounded-lg object-cover"
          />
          <div className="flex gap-2 py-4 ">
            <div className="relative text-white text-xl flex-1 mr-2">
              {recipe.cuisine} cusine
            </div>
            <div className="flex items-center mt-1">
              <ClockIcon className="w-6 h-6 text-white mr-2" />
              <span className="text-xl text-white">
                {recipe.cooking_time_minutes} <span>min</span>
              </span>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-[#6B8E23]">Preparation:</h2>
          </div>
          <div className="mb-2">
            <h2 className="text-lg font-mediun text-white">
              {recipe.preparation}
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-[#6B8E23]">Ingredients:</h2>
          </div>
          <div className="mb-2">
            <h2 className="text-lg font-mediun text-white">
              <ul className="flex flex-col space-y-2">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-white">
                      {ingredient}
                    </li>
                  ))}
              </ul>
            </h2>
          </div>
        </div>

        <div className=" flex justify-center">
          <button
            className=" mt-8 mb-6 w-56 py-3 px-4 bg-[#6B8E23] text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
            onClick={handleAddMealList}
          >
            Add meal to cart +
          </button>
        </div>
        <div className=" flex justify-center">
          <button
            className=" mb-12 w-56 py-3 px-4  flex w-full items-center justify-center  text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
            onClick={handleAddFavorites}
          >
            Add to
            <HeartIcon
              aria-hidden="true"
              className="h-6 w-6 flex-shrink-0 text-[#efe8db] group-hover:text-gray-500"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
