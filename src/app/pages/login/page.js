"use client";

import { useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      router.push('/'); // Redirect to home page on success
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 md:py-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#171819] rounded-2xl p-6 w-full max-w-[95%] md:max-w-md text-center shadow-2xl shadow-[#2A1E4D] mb-10"
      >
        <h1 className="text-3xl font-extrabold text-white mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col text-black text-lg font-ubuntu">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#6a4ae2] text-white py-2 px-4 rounded-lg transition-all duration-200 font-bold"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <p className='font-ubuntu mt-4 underline text-sm' onClick={() => router.push('https://spirality-frontend.vercel.app/pages/register')}>
          Нету аккаунта?
          Зарегистрируйтесь!
        </p>
      </motion.section>
    </main>
  );
}