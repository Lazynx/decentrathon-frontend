import React from "react";

const BoxDefault = ({ paragraph, text }) => {
  return (
    <div className="bg-gradient-to-r from-[#17181914] to-[#1f2124] rounded-2xl p-6 md:p-8 w-full max-w-full text-center shadow-2xl shadow-[#0000003f] mb-10 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-[#ffffff] font-ubuntu">
        {paragraph}
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-[#b0b3b8] font-light max-w-prose">
        {text}
      </p>
    </div>
  );
};

export default BoxDefault;
