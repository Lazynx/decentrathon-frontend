"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTelegramIdFromURL = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const initData = urlParams.get("initData");

        // Если initData существует, попробуем извлечь telegramId
        if (initData) {
          const initDataObj = JSON.parse(atob(initData));
          const userId = initDataObj?.user?.id;

          if (userId) {
            localStorage.setItem("telegramId", userId.toString());
            setIsAuthenticated(true);
            return;
          } else {
            throw new Error("Не удалось получить telegramId из initData.");
          }
        } else {
          throw new Error("initData отсутствует в URL.");
        }
      } catch (err) {
        setError(`Ошибка: ${err.message}`);
      }
    };

    getTelegramIdFromURL();
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
            {error}
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
