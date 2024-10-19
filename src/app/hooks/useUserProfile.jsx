import { useState, useEffect } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import axios from "axios";

export const useUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const telegramId = localStorage.getItem('telegramId'); 
      if (!telegramId) {
        throw new Error('Telegram ID отсутствует в localStorage');
      }
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORIGIN}/auth/userInfo`,
        { telegramId }
      );
    //   const response = await axiosInstance.put('/auth/userInfo', { telegramId });
    //   const response = await axios.create({
    //     baseURL: `${process.env.NEXT_PUBLIC_ORIGIN}/auth/userInfo`,
    //   }, { telegramId });
      const user = response.data.data.user; 

      setUserData({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        level: user.level,
        user_interest: user.surveyAnswers,
        xp: user.xp,
        nextLevelXP: user.nextLevel,
        streak: user.streak,
        userCourses: user.userCourses,
        currency: user.currency,
      });
      setLoading(false);
    } catch (error) {
      setError(`Ошибка при обновлении данных пользователя. ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { userData, loading, error };
};
