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
    const telegram = window.Telegram?.WebApp;

    // Проверка на наличие Telegram Web App и получение telegramId
    if (telegram && telegram.initDataUnsafe?.user) {
      const user = telegram.initDataUnsafe.user;

      if (user.id) {
        localStorage.setItem("telegramId", user.id.toString());
        setIsAuthenticated(true);
        console.log(`Telegram ID сохранен: ${user.id}`);
      } else {
        console.error("Не удалось получить telegramId пользователя.");
      }
    } else {
      console.warn("Telegram Web App не инициализирован.");
    }

    // Если telegramId отсутствует в localStorage, редирект на страницу регистрации
    if (!localStorage.getItem("telegramId")) {
      router.push("/pages/register");
    }
  }, [router]);

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
