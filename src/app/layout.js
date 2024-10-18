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
    if (typeof window !== 'undefined') {
      const initTelegram = async () => {
        try {
          // Ждем полной инициализации Telegram Web App
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
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isAuthenticated={isAuthenticated} />

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