"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "./utils/axiosInstance";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!token || !refreshToken) {
        router.push(`https://spirality-frontend.vercel.app/pages/register/`);
        return;
      }
      try {
        await axiosInstance.get("/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        try {
          const response = await axiosInstance.put("/auth/updateCurrentTime", {
            token: refreshToken,
          });
        } catch (error) {
          console.error("Ошибка при обновлении времени:", error);
        }
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push(`https://spirality-frontend.vercel.app/pages/register/`);
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
