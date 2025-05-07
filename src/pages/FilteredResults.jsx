import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import service from "../services/config";

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Dietary style: {recipe.dietary_style}</p>
              <p>Cooking time: {recipe.cooking_time} min</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
