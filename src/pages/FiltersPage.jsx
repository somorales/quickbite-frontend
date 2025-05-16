import React from "react";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
    <div className=" mt- 6 flex flex-col h-screen bg-[#1A1A1B]">
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">Search filters:</h1>
      </div>

      {/* Cuisine Filter */}
      <div className="px-6 pb-12">
        <div className="relative mb-2 flex-1 mr-2">
          <h2 className="text-2xl font-semibold text-[#6B8E23]">Cuisine</h2>
        </div>
        <div className="relative">
          <select
            className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 appearance-none hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
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
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDownIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Dietary Style Filter */}
      <div className="px-6 pb-12">
        <div className="relative mb-2 flex-1 mr-2">
          <h2 className="text-2xl font-bold text-[#6B8E23]">Dietary style</h2>
        </div>
        <div className="relative">
          <select
            className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 appearance-none  hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
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
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDownIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Cooking Time Filter */}
      <div className="px-6 pb-6">
        <div className="relative mb-2 flex-1 mr-2">
          <h2 className="text-2xl font-bold text-[#6B8E23]">Cooking time</h2>
        </div>
        <div className="mt-6 pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white">{cooking_time}min</span>
            <span className="text-sm text-white">60min</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={cooking_time}
            onChange={handleCooking_timeChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#6B8E23] "
            style={{ accentColor: "#1C4C0D" }}
          />
        </div>
        <div className="border-t border-[#6B8E23]  pt-4 mt-2"></div>
      </div>
      <div className=" flex justify-center">
        <button
          className=" mt-48 w-56 py-3 px-4 bg-[#6B8E23] text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
