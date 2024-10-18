import React from "react";

const BoxLesson = ({ topic, main_text }) => {
  return (
    <div className="bg-[#171819] rounded-2xl p-6 w-full max-w-[100%] md:max-w-3xl text-center shadow-2xl shadow-[#2A1E4D] mb-10">
      <h1 className="text-xl md:text-5xl font-bold text-white mb-4 text-center mt-3 md:py-6 mb-9 md:mb-5">
        {topic}
      </h1>
      <p className="text-lg md:text-3xl font-bold text-white mb-4 text-center mt-3 md:py-6 mb-9 md:mb-5">
        {main_text}
      </p>
    </div>
  );
};

export default BoxLesson;
