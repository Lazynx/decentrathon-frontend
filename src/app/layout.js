"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    try {
      // Проверка на наличие Telegram Web App и получение telegramId
      if (telegram && telegram.initDataUnsafe?.user) {
        const user = telegram.initDataUnsafe.user;

        if (user.id) {
          localStorage.setItem("telegramId", user.id.toString());
          setIsAuthenticated(true);
        } else {
          throw new Error("Не удалось получить telegramId пользователя.");
        }
      } else {
        throw new Error("Telegram Web App не инициализирован.");
      }
    } catch (err) {
      setError(err.message); // Устанавливаем сообщение об ошибке
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter}>
        <Header isAuthenticated={isAuthenticated} />
        
        {/* Отображение ошибки на странице */}
        {error && (
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
            Ошибка: {error}
          </div>
        )}

        {/* Отображение контента, даже если telegramId не найден */}
        {!isAuthenticated ? (
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
            Для продолжения, пожалуйста, авторизуйтесь в Telegram.
          </div>
        ) : (
          children
        )}

        <Analytics />
      </body>
    </html>
  );
}
