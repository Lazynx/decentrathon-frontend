'use client';

import { useEffect, useState } from 'react';

export default function TelegramInitializer({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        await window.Telegram?.WebApp?.ready();
        
        const telegram = window.Telegram?.WebApp;

        if (telegram && telegram.initDataUnsafe?.user) {
          const userId = telegram.initDataUnsafe.user.id;

          if (userId) {
            localStorage.setItem("telegramId", userId.toString());
            setIsAuthenticated(true);
          } else {
            throw new Error("Не удалось получить telegramId пользователя.");
          }
        } else {
          throw new Error("Telegram Web App не инициализирован или данные пользователя отсутствуют.");
        }
      } catch (err) {
        setError(`Ошибка: ${err.message}`);
      }
    };

    initTelegram();
  }, []);

  if (error) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: 'red', 
        color: 'white', 
        padding: '10px', 
        textAlign: 'center', 
        zIndex: 1000 
      }}>
        {error}
      </div>
    );
  }

  return children({ isAuthenticated });
}