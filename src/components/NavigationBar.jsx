import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import {
  HomeIcon,
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

export default function NavigationBar() {
  const { isLoggedIn, authenticateUser, loggerUserName } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFFDD0] p-6">
        <div className="flex justify-around">
          <a href="/">
            <HomeIcon
              className={`h-8 ${
                location.pathname === "/"
                  ? "text-[#1C4C0D]"
                  : "text-[#6B8E23] hover:text-[#1C4C0D]"
              }`}
            />
          </a>

          <a href="/filters">
            <UserIcon
              className={`h-8 ${
                location.pathname === "/filters"
                  ? "text-[#1C4C0D]"
                  : "text-[#6B8E23] hover:text-[#1C4C0D]"
              }`}
            />
          </a>

          <a href="/favorites">
            <HeartIcon
              className={`h-8 ${
                location.pathname === "/favorites"
                  ? "text-[#1C4C0D]"
                  : "text-[#6B8E23] hover:text-[#1C4C0D]"
              }`}
            />
          </a>
          <a href="/mealsList">
            <ShoppingCartIcon
              className={`h-8 ${
                location.pathname === "/mealsList"
                  ? "text-[#1C4C0D]"
                  : "text-[#6B8E23] hover:text-[#1C4C0D]"
              }`}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
