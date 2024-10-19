'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const interestOptions = [
  {
    name: "Аниме",
    image: "https://lh5.googleusercontent.com/proxy/LI573Ig7yCMVPu3P2-tYguPx4L2d6QegaTBxaA0LWZAndf0BRS46pIKjuGPG5oEbDuFWBVgbF-kMhFcfxeyuQ69UlAFifTcQ9qo",
    subCategories: [
      { name: "Атака титанов", image: "https://www.kino-teatr.ru/news/23181/205114.jpg" },
      { name: "Наруто", image: "https://desu.shikimori.one/uploads/poster/animes/20/main_2x-f6c8bb835fb175b99d38d2897e7040ee.webp" },
      { name: "ВанПис", image: "https://kinocensor.ru/cache/videos/12947/5c88599ed19994fd3ced481339c2259b-367x550.jpg" },
    ],
  },
  {
    name: "Игры",
    image: "https://resizer.mail.ru/p/a8c5015f-6426-5fe9-abb9-f1f2b917e150/AQAKV4K_BwP8yAXbjpqL4Pmxma1tBlY3Cf79TrwdQS8kv43qQeEQ3DpmZNOFWH4cSuUYYO1UjnHIGO2_3SnTj8zv3Go.jpg",
    subCategories: [
      { name: "The Witcher 3", image: "https://technicalcity.b-cdn.net/en/game_image/4/image?thumbnail=yes&maxwidth=400&maxheight=400&webp=1" },
      { name: "Counter-Strike: Global Offensive", image: "https://img.championat.com/news/big/t/x/anons-counter-strike-2_16795113311562411600.jpg" },
    ],
  },
];

export default function InitialTest({ onComplete }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  useEffect(() => {
    // Проверка, является ли пользователь новым
    const checkNewUser = async () => {
      try {
        const response = await fetch('/api/user/check-user', { method: 'GET', credentials: 'include' });
        const data = await response.json();
        setIsNewUser(data.isNewUser);
      } catch (error) {
        console.error('Ошибка при проверке пользователя:', error);
        setIsNewUser(true);
      }
    };
    checkNewUser();
  }, []);

  const handleSelectInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSelectSubCategory = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((sc) => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleSubmit = async () => {
    const selectedAnswers = { interests: selectedInterests, subCategories: selectedSubCategories };
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAnswers),
      });
      if (!response.ok) throw new Error('Ошибка при регистрации пользователя');
      onComplete(selectedAnswers);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (!isNewUser) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-[#171819] rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Выберите ваши интересы</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {interestOptions.map((interest, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelectInterest(interest.name)}
            className={`p-3 rounded-lg transition-all ${
              selectedInterests.includes(interest.name) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <img src={interest.image} alt={interest.name} className="w-full h-24 object-cover rounded-lg mb-2" />
            <span className="text-center block">{interest.name}</span>
          </motion.button>
        ))}
      </div>

      {selectedInterests.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Выберите подкатегории:</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {interestOptions
              .filter((interest) => selectedInterests.includes(interest.name))
              .flatMap((interest) => interest.subCategories)
              .map((subCategory, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectSubCategory(subCategory.name)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedSubCategories.includes(subCategory.name) ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <img src={subCategory.image} alt={subCategory.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <span className="text-center block">{subCategory.name}</span>
                </motion.button>
              ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
      >
        Завершить тест
      </button>
    </div>
  );
}
