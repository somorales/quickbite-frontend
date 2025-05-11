import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Loading from "../components/Loading.jsx";

export default function RecipePage() {
  const navigate = useNavigate();

  const params = useParams();

  const [recipe, setrecipe] = useState({});

  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    service
      .get(`/recipes/${params.recipeId}`)
      .then((response) => {
        console.log(response.data);
        setrecipe(response.data);
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>

      <li key={recipe.id} className="mb-4 p-4 border rounded">
        <h2 className="text-xl font-semibold"></h2>
        <p>Cuisine: {recipe.cuisine}</p>
        <p>Dietary style: {recipe.dietary_style}</p>
        <p>Cooking time: {recipe.cooking_time} min</p>
        <p>Ingredients: {recipe.ingredients} </p>
        <ul>preparation: {recipe.preparation}</ul>
      </li>

      <div className="space-y-3">
        <button
          onClick={handleAddFavorites}
          className=" mt-8 w-full bg-[#4D3E7F] text-white py-2 rounded-full text-base font-medium hover:bg-[#47307D] transition"
        >
          Favorito
        </button>
      </div>
    </div>
  );
}
