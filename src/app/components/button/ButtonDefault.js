import React from "react";

const ButtonDefault = ({ button_context }) => {
  return (
    <button className="bg-[#6a4ae2] text-white font-semibold py-2 px-4 rounded-xl md:h-16 md:w-52 transition duration-300 hover:bg-[#8465f1] md:mt-4 md:mb-5 md:text-2xl">
      {button_context}
    </button>
  );
};

export default ButtonDefault;
