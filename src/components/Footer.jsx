import React from "react";

export default function Footer() {
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
