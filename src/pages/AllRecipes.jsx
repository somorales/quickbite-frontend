import React from "react";
import { Link } from "react-router-dom";
import {
  AdjustmentsHorizontalIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import SearchForm from "../components/SearchForm.jsx";

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

  return (
    <div className=" mt- 6 flex flex-col h-screen bg-[#1A1A1B]">
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
      <div className="px-6 mb-2">
        <h2 className="text-2xl font-bold text-[#6B8E23]">All recipes:</h2>
      </div>
      <div className="px-4 overflow-y-auto flex-1">
        <div className="grid grid-cols-2 gap-4 pb-20">
          {allRecipes.map((recipe) => (
            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              <div key={recipe._id} className="relative p-2">
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
    </div>
  );
}
