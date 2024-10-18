import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import TelegramInitializer from "./components/TelegramInitializer";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className={inter.className}>
        <TelegramInitializer onAuthStateChange={setIsAuthenticated} />
        <Header isAuthenticated={isAuthenticated} />

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