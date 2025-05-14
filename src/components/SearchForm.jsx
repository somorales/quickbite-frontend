import React from "react";
import { useState } from "react";

export default function SearchForm(props) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] py-3 px-4 pl-10 hover-white  focus:outline-none "
          placeholder="Write a dish"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-[4.5rem] flex items-center text-[#737373] rounded-r-full hover-white focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
