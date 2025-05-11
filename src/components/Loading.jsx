import React, { Component } from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#4D3E7F]">
      <div className=" py-80flex  justify-center w-80 h-80 rounded-lg"></div>

      <div className="absolute bottom-10 flex items-center text-white text-lg">
        <a href="https://sofimorales.com/" target="_blank"></a>
      </div>
    </div>
  );
}
