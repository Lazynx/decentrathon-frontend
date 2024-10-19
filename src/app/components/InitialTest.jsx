'use client';

import React, { useState } from 'react';

const questions = [
  { id: 1, text: "Какой ваш уровень образования?", options: ["Школьник", "Студент", "Выпускник", "Специалист"] },
  { id: 2, text: "Какие предметы вас больше всего интересуют?", options: ["Математика", "История", "Естественные науки", "Языки", "Программирование"] },
  { id: 3, text: "Сколько времени вы готовы уделять обучению ежедневно?", options: ["Менее 30 минут", "30-60 минут", "1-2 часа", "Более 2 часов"] }
];

export default function InitialTest({ onComplete }) {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      onComplete(answers);
    } else {
      alert("Пожалуйста, ответьте на все вопросы.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Начальный тест</h2>
      {questions.map(question => (
        <div key={question.id} className="mb-6">
          <p className="text-white mb-2">{question.text}</p>
          {question.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(question.id, option)}
              className={`block w-full text-left p-2 mb-2 rounded ${
                answers[question.id] === option ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
      >
        Завершить тест
      </button>
    </div>
  );
}