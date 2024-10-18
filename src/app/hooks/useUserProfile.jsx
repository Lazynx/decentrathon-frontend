import { useState, useEffect } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';

export const useUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axiosInstance.put('/auth/userInfo', { token: refreshToken });
      const user = response.data.user;

      setUserData({
        username: user.username,
        level: user.level,
        user_interest: user.surveyAnswers,
        xp: user.xp,
        nextLevelXP: user.next_level,
        streak: user.streak,
      });
      setLoading(false);
    } catch (error) {
      setError('Ошибка при обновлении данных пользователя.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { userData, loading, error };
};
