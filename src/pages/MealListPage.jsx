import React from "react";

import { useEffect, useState } from "react";

import service from "../services/config.js";

export default function MealListPage() {
  const [allmealList, setAllmealList] = useState([]);
  const [listaUnificada, setListaUnificada] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBasket();
  }, []);

  const loadBasket = () => {
    setIsLoading(true);
    service
      .get(`/basket`)
      .then((response) => {
        const mealsWithQuantity = response.data.map((meal) => ({
          ...meal,
          quantity: 1,
        }));
        setAllmealList(mealsWithQuantity);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const generarLista = async (e) => {
    if (allmealList.length === 0) {
      alert("Please select some meals!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await service.post(`/ingredients`, {
        meals: allmealList,
      });

      console.log("LLM response", response.data);
      setListaUnificada(response.data.elements);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = (id) => {
    console.log("increment", id);
    setAllmealList((prevMeals) => {
      return prevMeals.map((meal) => {
        if (meal._id === id) {
          const updatedMeal = { ...meal, quantity: meal.quantity + 1 };
          return updatedMeal;
        }
        return meal;
      });
    });
  };

  const handleDecrement = (id) => {
    console.log("increment", id);
    setAllmealList((prevMeals) => {
      return prevMeals.map((meal) => {
        if (meal._id === id && meal.quantity > 1) {
          const updatedMeal = { ...meal, quantity: meal.quantity - 1 };
          return updatedMeal;
        }
        return meal;
      });
    });
  };

  return (
    <div className="mt-6 flex flex-col min-h-screen bg-[#1A1A1B] overflow-y-auto">
      <div className="px-6 pb-6">
        <h1 className="text-4xl font-bold text-[#6B8E23]">Your meals list</h1>
      </div>
      {allmealList.length > 0 ? (
        <ul>
          {allmealList.map((recipe) => (
            <li key={recipe._id} className="mb-4 p-4">
              <div className="flex justify-between items-center bg-[#313131] text-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold">{recipe.name}</div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecrement(recipe._id)}
                    className="w-8 h-8 rounded-full bg-[#6B8E23] flex items-center justify-center text-yellow-100 text-lg"
                  >
                    −
                  </button>
                  <span className="text-white text-lg font-medium">
                    {recipe.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(recipe._id)}
                    className="w-8 h-8 rounded-full bg-[#6B8E23]  flex items-center justify-center text-white text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p> Add meals to your list </p>
      )}

      <div className=" flex justify-center">
        <button
          className=" mt-4 mb-4 w-56 py-3 px-4 bg-[#6B8E23] text-white rounded-md font-medium text-lg hover:bg-[#1C4C0D] transition-colors"
          onClick={generarLista}
        >
          Generate shopping list
        </button>
      </div>

      {listaUnificada && (
        <>
          <div className="px-6 pb-2 pt-2">
            <h1 className="text-2xl font-bold text-[#6B8E23]">Grocery list</h1>
          </div>

          <div className=" px-6 mt-2 mb-24">
            <ul className="bg-[#313131] mb-4 p-4 rounded-xl shadow ">
              {listaUnificada.map((groceryItem) => (
                <li key={groceryItem.ingredient} className="text-white ">
                  {groceryItem.ingredient} : {groceryItem.quantity}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
