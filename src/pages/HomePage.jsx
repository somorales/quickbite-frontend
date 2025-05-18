import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import service from "../services/config.js";
import SearchForm from "../components/SearchForm.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);

  const navigate = useNavigate();

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
      .get(`/recipes?name=${name}`)
      .then((response) => {
        setAllRecipes(response.data);

        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSeeAll = () => {
    navigate(`/recipes`);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1A1A1B]">
      <div class="flex justify-center items-center w-full py-8">
        <h1 class="text-lg font-semibold tracking-widest text-[#FFFDD0]">
          Q U I C K B I T E
        </h1>
      </div>
      <div className="px-6 pb-6">
        <h1 className="text-4xl  text-[#6B8E23]">Search recipes</h1>
      </div>
      <div className="flex gap-2 mb-6 px-6 ">
        <div className="relative flex-1 mr-2">
          <SearchForm
            placeholder="search recipe"
            onSearch={handleSearchRecipe}
          />
        </div>
        <Link to="/filters">
          <AdjustmentsHorizontalIcon className="h-12 w-12 text-[#737373] border border-white rounded-[12px]  " />
        </Link>
      </div>
      <div className="flex gap-2 mb-6 px-6">
        <div className="relative flex-1 mr-2">
          <h2 className="text-2xl font-bold text-[#6B8E23]">Recipes:</h2>
        </div>

        <button className="text-[#6B8E23]" onClick={handleSeeAll}>
          See All
        </button>
      </div>

      <div className="grid px-6 gap-4 pb-6 ">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide mt- 6">
          {allRecipes.slice(0, 5).map((recipe) => (
            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              <div
                key={recipe._id}
                className="relative p-2 flex-shrink-0 w-60 overflow-hidden "
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-[12px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-sm font-medium bg-black text-white bg-opacity-20">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="w-4 h-4 text-white mr-1" />
                    <span className="text-xs text-white">
                      {recipe.cooking_time_minutes} <span>min</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className=" mt- 6 flex flex-col h-screen bg-[#1A1A1B]">
        <div className="px-6 pb-6">
          <h1 className="text-2xl font-bold text-[#6B8E23]">Most Popular</h1>
        </div>
        <div className="flex-1 px-6 pb-16 bg-[#1A1A1B] ">
          {mostPopular.slice(0, 5).map((recipe) => (
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
                  <p className="text-l text-white font-extrabold bg-black bg-opacity-20">
                    {recipe.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
