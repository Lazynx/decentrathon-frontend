"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "./utils/axiosInstance";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Проверка на наличие Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;
      const user = telegram.initDataUnsafe?.user;

      // Извлечение telegramId пользователя
      if (user && user.id) {
        localStorage.setItem("telegramId", user.id);
      }
    }

    const checkAuth = async () => {
      const telegramId = localStorage.getItem("telegramId");

      if (!telegramId) {
        // Если telegramId отсутствует, пользователь неаутентифицирован
        setIsAuthenticated(false);
        return;
      }

      try {
        await axiosInstance.get("/auth/protected", {
          headers: {
            "X-Telegram-ID": telegramId,
          },
        });

        await axiosInstance.put("/auth/updateCurrentTime", { telegramId });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Ошибка при аутентификации:", error);
        localStorage.removeItem("telegramId");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <html lang="en">
      <body className={inter}>
        <Header isAuthenticated={isAuthenticated} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
