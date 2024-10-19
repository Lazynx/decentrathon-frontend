import React from 'react';
import StreakCalendar from '../ui/StreakCalendar';
import { getDayLabel } from './utils/getDayLabel';
import { useUserProfile } from './hooks/useUserProfile';

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
    <div className="flex justify-center space-x-2 mb-4">
      <div className="h-6 bg-gray-300 rounded w-20"></div>
      <div className="h-6 bg-gray-300 rounded w-20"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
    <div className="h-32 bg-gray-300 rounded w-full mb-6"></div>
    <div className="h-32 bg-gray-300 rounded w-full"></div>
  </div>
);

const Profile = () => {
  const { userData, loading, error } = useUserProfile();

  if (loading) {
    return (
      <div className="bg-[#2D2D2D] rounded-3xl p-6 w-full max-w-[90%] md:max-w-3xl mx-auto text-center mb-20 font-ubuntu">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-[#2D2D2D] rounded-3xl p-6 w-full max-w-[90%] md:max-w-3xl mx-auto text-center mb-20 font-ubuntu">
      <ProfileHeader username={userData.username} />
      <ProfileStats userData={userData} />
      <UserInterests interests={userData.user_interest} />
      <Achievements />
      <StreakCalendar streak={userData.streak} />
    </div>
  );
};

const ProfileHeader = ({ username }) => (
  <div className="relative">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full p-2 shadow-lg">
      <img
        src={`https://ui-avatars.com/api/?name=${username}`}
        alt="Profile Picture"
        className="rounded-full border-4 border-white w-24 h-24 md:w-32 md:h-32"
      />
    </div>
  </div>
);

const ProfileStats = ({ userData }) => (
  <div className="mt-16 text-white">
    <h2 className="text-2xl md:text-4xl font-bold mb-2">{userData.username}</h2>
    <div className="flex items-center justify-center space-x-2 mb-4">
      <span className="bg-yellow-400 text-black font-bold rounded-full px-3 py-1 text-sm">Уровень {userData.level}</span>
      <span className="bg-green-400 text-black font-bold rounded-full px-3 py-1 text-sm">
        Стрик: {userData.streak} {getDayLabel(userData.streak)}
      </span>
    </div>

    <div className="bg-white/20 rounded-full h-4 mb-4">
      <div
        className="bg-green-400 rounded-full h-4"
        style={{ width: `${(userData.xp / userData.nextLevelXP) * 100}%` }}
      ></div>
    </div>
    <p className="text-sm mb-6">{userData.xp} / {userData.nextLevelXP} XP до следующего уровня</p>
  </div>
);

const UserInterests = ({ interests }) => (
  <div className="bg-white/10 rounded-2xl p-4 mb-6">
    <h3 className="text-xl font-semibold mb-2">Интересы</h3>
    <div className="flex flex-wrap justify-center gap-2">
      {interests.map((interest, index) => (
        <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
          {interest}
        </span>
      ))}
    </div>
  </div>
);

const Achievements = () => (
  <div className="bg-white/10 rounded-2xl p-4">
    <h3 className="text-xl font-semibold mb-2">Достижения</h3>
    <div className="flex justify-center space-x-4">
      {['🏆', '🥇', '🎯', '🚀'].map((emoji, index) => (
        <div key={index} className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
          {emoji}
        </div>
      ))}
    </div>
  </div>
);

export default Profile;
