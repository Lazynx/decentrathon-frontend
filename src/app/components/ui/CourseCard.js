import { useState } from "react";

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 ${
        isHovered ? "scale-105 shadow-2xl" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.name}</h2>
        <p className="text-gray-600 mb-4">
          {course.topics.length} тем для изучения
        </p>
        <button
          onClick={() => {
            /* Handle course start */
          }}
          className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          Начать курс
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
