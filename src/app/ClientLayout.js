'use client';

import Header from "../components/layout/Header";
import TelegramInitializer from "../components/TelegramInitializer";

export default function ClientLayout({ children }) {
  return (
    <TelegramInitializer>
      {({ isAuthenticated }) => (
        <>
          <Header isAuthenticated={isAuthenticated} />
          {!isAuthenticated ? (
            <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
              Для продолжения, пожалуйста, авторизуйтесь в Telegram.
            </div>
          ) : (
            children
          )}
        </>
      )}
    </TelegramInitializer>
  );
}