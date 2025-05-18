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
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
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

          <Menu as="div" className="relative ml-3">
            <div className="group">
              <MenuButton className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-4">
                <UserIcon
                  className={`h-8 text-[#6B8E23] hover:text-[#1C4C0D]`}
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute left-0 bottom-12 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {isLoggedIn ? (
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-[#000000] data-[focus]:bg-[#6B8E23]"
                  >
                    Sign out
                  </button>
                </MenuItem>
              ) : (
                <MenuItem>
                  <button
                    onClick={handleLogin}
                    className="block w-full px-4 py-2 text-left text-sm text-[#000000] data-[focus]:bg-[#6B8E23]"
                  >
                    Sign in
                  </button>
                </MenuItem>
              )}
            </MenuItems>
          </Menu>

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
