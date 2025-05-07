import React from "react";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";

export default function FiltersPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [cooking_time, setCooking_time] = useState(0);
  const [dietaryStyle, setDietaryStyle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [allCuisines, setAllCuisines] = useState([]);
  const [allDietary_style, setAlldietary_style] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    service
      .get(`/cuisines`)
      .then((response) => {
        setAllCuisines(response.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  useEffect(() => {
    service
      .get(`/dietary-styles`)
      .then((response) => {
        setAlldietary_style(response.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  const handleCooking_timeChange = (evento) => {
    let value = evento.target.value;
    setCooking_time(value);
  };

  const handleDietaryStyleChange = (evento) => {
    let value = evento.target.value;
    setDietaryStyle(value);
  };
  const handleCuisineChange = (evento) => {
    let value = evento.target.value;
    setCuisine(value);
  };

  const handleApply = () => {
    navigate(
      `/filteredResults?cooking_time=${cooking_time}&dietary_style=${dietaryStyle}&cuisine=${cuisine}`
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-4xl font-bold mb-6">Search filters</h1>

      {/* Cuisine Filter */}
      <div className="mb-8">
        <label className="block text-2xl font-medium mb-2">Cuisine:</label>
        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
            value={cuisine}
            onChange={handleCuisineChange}
          >
            <option value="">Select option</option>
            {allCuisines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dietary Style Filter */}
      <div className="mb-8">
        <label className="block text-2xl font-medium mb-2">
          Dietary style:
        </label>
        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
            value={dietaryStyle}
            onChange={handleDietaryStyleChange}
          >
            <option value="">Select option</option>
            {allDietary_style.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cooking Time Filter */}
      <div className="mb-8">
        <label className="block text-2xl font-medium mb-2">Cooking time:</label>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">{cooking_time}min</span>
            <span className="text-sm text-gray-500">60min</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={cooking_time}
            onChange={handleCooking_timeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-2"></div>

      <div className="border-t border-gray-200 pt-6 mt-4">
        <button
          className="w-full py-3 px-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
