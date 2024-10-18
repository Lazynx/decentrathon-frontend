"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "./utils/axiosInstance";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
// test
export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => { 
    const checkAuth = async () => {
      const telegramId = localStorage.getItem("telegramId");
      
      if (!telegramId) {
        router.push("/pages/register");
        return;
      }
      try {
        await axiosInstance.get("/auth/protected", {
          headers: {
            "X-Telegram-ID": telegramId,
          },
        });

        try {
          const response = await axiosInstance.put("/auth/updateCurrentTime", {
            telegramId,
          });
        } catch (error) {
          console.error("Ошибка при обновлении времени:", error);
        }
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("telegramId");
        router.push("/pages/register");
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <html lang="en">
      <body className={inter}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
