import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function NavigationBar() {
  const { isLoggedIn, authenticateUser, loggerUserName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-300 p-4">
        <div className="flex justify-around">
          <Link to="/ " className="flex flex-col items-center text-black">
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-3v-6h-6v6H6a3 3 0 0 1-3-3z" />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-black"
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </button>
          <Link
            to="/favorites "
            className="flex flex-col items-center text-black"
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </Link>
          <Link
            to="/mealsList"
            className="flex flex-col items-center text-gray-400"
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 4h-2l-3 9v2h2a5 5 0 1 0 10 0h3a5 5 0 1 0 10 0h2v-2l-3-9h-2l-2 6h-9l-2-6zm0 9h2a3 3 0 1 1-6 0h4zm12 0h-2a3 3 0 1 1 6 0h-4z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
