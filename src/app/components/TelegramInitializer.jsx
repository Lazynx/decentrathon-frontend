// 'use client';

// import { useEffect, useState } from 'react';

// export default function TelegramInitializer({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const initTelegram = async () => {
//       try {
//         await window.Telegram?.WebApp?.ready();
        
//         const telegram = window.Telegram?.WebApp;

//         if (telegram && telegram.initDataUnsafe?.user) {
//           const userId = telegram.initDataUnsafe.user.id;

//           if (userId) {
//             localStorage.setItem("telegramId", userId.toString());
//             setIsAuthenticated(true);
//           } else {
//             throw new Error("Не удалось получить telegramId пользователя.");
//           }
//         } else {
//           throw new Error("Telegram Web App не инициализирован или данные пользователя отсутствуют.");
//         }
//       } catch (err) {
//         setError(`Ошибка: ${err.message}`);
//       }
//     };

//     initTelegram();
//   }, []);

//   if (error) {
//     return (
//       <div style={{ 
//         position: 'fixed', 
//         top: 0, 
//         left: 0, 
//         right: 0, 
//         backgroundColor: 'red', 
//         color: 'white', 
//         padding: '10px', 
//         textAlign: 'center', 
//         zIndex: 1000 
//       }}>
//         {error}
//       </div>
//     );
//   }

//   return children({ isAuthenticated });
// }
// 'use client';

// import { useEffect, useState } from 'react';
// import InitialTest from './InitialTest';

// export default function TelegramInitializer({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showTest, setShowTest] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const initTelegram = async () => {
//       try {
//         await window.Telegram?.WebApp?.ready();
        
//         const telegram = window.Telegram?.WebApp;

//         if (telegram && telegram.initDataUnsafe?.user) {
//           const userId = telegram.initDataUnsafe.user.id;

//           if (userId) {
//             // Проверяем, существует ли пользователь в базе данных
//             const userExists = await checkUserExists(userId);
//             if (userExists) {
//               // Пользователь существует
//               setIsAuthenticated(true);
//             } else {
//               // Пользователь не существует, показываем тест
//               setShowTest(true);
//             }
//           } else {
//             throw new Error("Не удалось получить telegramId пользователя.");
//           }
//         } else {
//           throw new Error("Telegram Web App не инициализирован или данные пользователя отсутствуют.");
//         }
//       } catch (err) {
//         setError(`Ошибка: ${err.message}`);
//       }
//     };

//     initTelegram();
//   }, []);

//   const checkUserExists = async (telegramId) => {
//     try {
//       const response = await fetch(`/api/user/check-user?telegramId=${telegramId}`);
//       return response.ok;
//     } catch (error) {
//       console.error('Error checking user existence:', error);
//       return false;
//     }
//   };

//   const handleTestComplete = async (answers) => {
//     try {
//       const telegram = window.Telegram?.WebApp;
//       const { id, username, first_name, last_name } = telegram.initDataUnsafe.user;
      
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           telegramId: id,
//           username,
//           firstName: first_name,
//           lastName: last_name,
//           surveyAnswers: answers,
//         }),
//       });

//       if (response.ok) {
//         setIsAuthenticated(true);
//         setShowTest(false);
//       } else {
//         throw new Error("Ошибка при регистрации пользователя");
//       }
//     } catch (err) {
//       setError(`Ошибка: ${err.message}`);
//     }
//   };

//   if (error) {
//     return (
//       <div style={{ 
//         position: 'fixed', 
//         top: 0, 
//         left: 0, 
//         right: 0, 
//         backgroundColor: 'red', 
//         color: 'white', 
//         padding: '10px', 
//         textAlign: 'center', 
//         zIndex: 1000 
//       }}>
//         {error}
//       </div>
//     );
//   }

//   if (showTest) {
//     return <InitialTest onComplete={handleTestComplete} />;
//   }

//   return children({ isAuthenticated });
// }
'use client';

import { useEffect, useState } from 'react';

export default function TelegramInitializer({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        await window.Telegram?.WebApp?.ready();
        
        const telegram = window.Telegram?.WebApp;

        if (telegram && telegram.initDataUnsafe?.user) {
          const userId = telegram.initDataUnsafe.user.id;

          if (userId) {
            // Проверяем, существует ли пользователь в базе данных
            const userExists = await checkUserExists(userId);
            if (userExists) {
              // Пользователь существует
              setIsAuthenticated(true);
              setIsNewUser(false);
            } else {
              // Пользователь не существует, показываем тест
              setIsAuthenticated(true);
              setIsNewUser(true);
            }
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

  const checkUserExists = async (telegramId) => {
    try {
    const response = await axiosInstance.post('/user/check-user', {
        telegramId: telegramId,
        });
      return response.ok;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  return (
    <>
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
      {children({ isAuthenticated, isNewUser })}
    </>
  );
}