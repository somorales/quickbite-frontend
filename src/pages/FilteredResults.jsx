import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import service from "../services/config";
import { ClockIcon } from "@heroicons/react/24/outline";

function useQuery() {
  const location = useLocation();
  console.log(location);
  return new URLSearchParams(location.search);
}

export default function filteredResults() {
  const [recipes, setRecipes] = useState([]);
  const query = useQuery();

  const cooking_time = query.get("cooking_time");
  const dietary_style = query.get("dietary_style");
  const cuisine = query.get("cuisine");

  useEffect(() => {
    service
      .get(
        `/recipes?cooking_time=${cooking_time}&dietary_style=${dietary_style}&cuisine=${cuisine}`
      )
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cooking_time, dietary_style, cuisine]);

  return (
    <div className="flex flex-col h-screen bg-[#1A1A1B]">
      <div class="flex justify-center items-center w-full py-8">
        <h1 class="text-lg font-semibold tracking-widest text-[#FFFDD0]">
          R E S U L T S
        </h1>
      </div>
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">For You:</h1>
      </div>
      {recipes.length > 0 ? (
        <div className="px-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-4 pb-20">
            {recipes.map((recipe) => (
              <Link
                to={`/recipes/${recipe._id}`}
                key={recipe._id}
                className="relative p-2"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-[12px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-sm font-medium bg-black bg-opacity-20 text-white">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="w-4 h-4 text-white mr-1" />
                    <span className="text-xs text-white">
                      {recipe.cooking_time_minutes} <span>min</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="px-6  text-xl text-white"> Ups, no results found.</p>
      )}
    </div>
  );
}
