import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center">
        <img
          src="https://i.ibb.co/vkqbnCb/spiral-logo-concept-swirl-modern-logo-design-free-vector-Photoroom.png"
          alt="Spirality Logo"
          className="h-20 w-20 md:h-30 md:w-30 rotate-animation"
        />
        <span className="text-white text-3xl font-thin font-ubuntu -ml-4 md:text-5xl">
          Spirality
        </span>
      </div>
    </div>
  );
};

export default Header;
