// components/market/Market.jsx
import React from "react";

const Market = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Market Section</h1>
      <p className="text-lg md:text-2xl">
        Добро пожаловать в раздел Market! Здесь вы можете найти различные курсы и материалы для изучения.
      </p>
      {/* Добавьте здесь дополнительный контент по необходимости */}
    </section>
  );
};

export default Market;
