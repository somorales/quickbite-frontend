import React from "react";

import { useEffect, useState } from "react";

import service from "../services/config.js";

export default function MealListPage() {
  const [allmealList, setAllmealList] = useState([]);
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
        console.log(mealsWithQuantity);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
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
              <div class="flex justify-between items-center bg-gray-800 text-white p-4 rounded-xl shadow">
                <div class="text-lg font-semibold">{recipe.name}</div>
                <div class="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecrement(recipe._id)}
                    class="w-8 h-8 rounded-full bg-black flex items-center justify-center text-yellow-100 text-lg"
                  >
                    −
                  </button>
                  <span class="text-white text-lg font-medium">
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
        <p>No tines comidas </p>
      )}
    </div>
  );
}
