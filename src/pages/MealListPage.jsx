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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your meals</h1>
      {allmealList.length > 0 ? (
        <ul>
          {allmealList.map((recipe) => (
            <li key={recipe._id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold">{recipe.name}</div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecrement(recipe._id)}
                    className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-yellow-100 text-lg"
                  >
                    −
                  </button>
                  <span className="text-white text-lg font-medium">
                    {recipe.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(recipe._id)}
                    className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes comidas </p>
      )}
      <button
        onClick={generarLista}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Generate shopping list
      </button>

      {listaUnificada && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Lista Unificada de Supermercado:
          </h3>
          <ul>
            {listaUnificada.map((groceryItem) => (
              <li>
                {groceryItem.ingredient} : {groceryItem.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
