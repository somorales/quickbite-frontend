import React from "react";
import { useEffect, useState } from "react";
import service from "../services/config.js";

export default function Footer() {
  useEffect(() => {
    service
      .get(`/recipes`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <footer className="bottom-[0.2cm]  px-6 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight text-[#47307D]">
        Funciona tailwindcss
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex justify-between items-center">
            <a href="https://sofimorales.com/" target="_blank">
              <img src="" alt="logoSofi" className="w-24 h-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
