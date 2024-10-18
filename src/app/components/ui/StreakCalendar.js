import React from "react";

const StreakCalendar = ({ streak }) => {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  return (
    <div className="mt-6 bg-[#20232676] rounded-2xl p-4">
      <h3 className="text-xl font-semibold mb-2">Ваш стрик: {streak} дней</h3>
      <div className="flex justify-between">
        {days.map((day, index) => {
          const isPast = index < currentDay;
          const isToday = index === currentDay;
          const isFuture = index > currentDay;

          let bgColor = isPast ? "bg-green-500" : "bg-gray-300";
          if (isToday) bgColor = "bg-blue-500";
          if (isFuture) bgColor = "bg-gray-200";

          return (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center mb-1`}
              >
                <span className="text-xs font-bold text-white">{day}</span>
              </div>
              <span className="text-xs">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
