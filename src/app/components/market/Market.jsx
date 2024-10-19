import React, { useState } from 'react';
import { TonConnectButton } from "@tonconnect/ui-react";
import Layout from "./Layout";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Package, Coins, Star } from 'lucide-react';

const StarField = () => {
  const stars = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const animationDuration = Math.random() * 3 + 2;

        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        );
      })}
    </div>
  );
};

const CoinAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            top: "110%",
            left: `${Math.random() * 100}%`,
            scale: 0
          }}
          animate={{ 
            top: "-10%",
            scale: [0, 1, 0],
            rotateY: [0, 360],
            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        >
          <div className="relative w-8 h-8">
            <Coins className="text-yellow-400 absolute" size={32} />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="text-yellow-200" size={32} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CaseCard = ({ title, price, rarity, onOpen }) => {
  const rarityColors = {
    common: 'from-blue-400 to-blue-600',
    rare: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  const rarityGlows = {
    common: 'shadow-blue-500/50',
    rare: 'shadow-purple-500/50',
    legendary: 'shadow-yellow-500/50'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden cursor-pointer shadow-lg ${rarityGlows[rarity]}`}
    >
      <motion.div
        className={`h-full bg-gradient-to-br ${rarityColors[rarity]} p-4 backdrop-blur-lg bg-opacity-20`} // Уменьшили padding с p-6 на p-4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="absolute text-white opacity-20"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-40px)`,
                }}
              />
            ))}
          </motion.div>
          
          <div className="flex flex-col items-center space-y-3"> {/* Уменьшили gap с space-y-4 на space-y-3 */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Package size={100} className="text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white text-center mt-2">{title}</h3> {/* Уменьшили размер текста с text-2xl на text-xl и margin-top с mt-4 на mt-2 */}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-3 mt-2 flex items-center justify-center space-x-2 hover:bg-opacity-30 transition-all" // Уменьшили padding с p-4 на p-3 и margin-top с mt-4 на mt-2
            >
              <Coins size={24} className="text-yellow-300" />
              <span className="text-lg font-bold text-white">{price}</span> {/* Уменьшили размер текста с text-xl на text-lg */}
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute top-2 right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const TopUserCard = ({ rank, username, amount, isTop3 }) => {
  const getBadgeColor = (rank) => {
    switch(rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-300";
      case 3: return "text-amber-600";
      default: return "text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`relative flex items-center gap-2 p-3 rounded-xl backdrop-blur-md
        ${isTop3 ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : 'bg-white/5'}`} // Уменьшили padding с p-4 на p-3 и gap с gap-3 на gap-2
    >
      <div className={`text-xl font-bold ${getBadgeColor(rank)} flex items-center justify-center w-6`}> {/* Уменьшили размер текста с text-2xl на text-xl и ширину с w-8 на w-6 */}
        {/* Место для иконки или числа */}
        {rank <= 3 ? (
          // Добавьте иконку короны или другой символ для топ-3
          <span>{rank}</span>
        ) : (
          <span>{rank}</span>
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{username}</div>
        <div className="text-sm text-gray-400">Открыто кейсов: {amount}</div>
      </div>
      <div className="flex items-center gap-1"> {/* Уменьшили gap с gap-2 на gap-1 */}
        <Coins size={16} className="text-yellow-400" />
        <span className="font-bold text-sm">{(rank * 1000).toLocaleString()}</span> {/* Добавили text-sm для уменьшения размера текста */}
      </div>
      {isTop3 && (
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl" />
        </motion.div>
      )}
    </motion.div>
  );
};

const CaseOpeningAnimation = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 720],
            }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <Package size={150} className="text-white animate-pulse" />
            <motion.div
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={200} className="text-yellow-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RecentOpening = ({ username, caseName, prize }) => (
  <div className="flex items-center gap-2 whitespace-nowrap">
    <span className="text-yellow-400">{username}</span>
    <span>открыл</span>
    <span className="text-purple-400">{caseName}</span>
    <span>и получил</span>
    <span className="text-green-400">{prize}</span>
  </div>
);

const Market = () => {
  const [balance, setBalance] = useState(1000);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  
  const cases = [
    { id: 1, title: "Начальный курс", price: 100, rarity: "common" },
    { id: 2, title: "Продвинутый курс", price: 250, rarity: "rare" },
    { id: 3, title: "Премиум курс", price: 500, rarity: "legendary" },
  ];

  const topUsers = [
    { id: 1, username: "CryptoKing", amount: 150 },
    { id: 2, username: "BlockchainMaster", amount: 120 },
    { id: 3, username: "TONLegend", amount: 100 },
    { id: 4, username: "Web3Expert", amount: 80 },
    { id: 5, username: "CryptoNinja", amount: 75 },
    { id: 6, username: "TONWarrior", amount: 70 },
    { id: 7, username: "BlockExplorer", amount: 65 },
    { id: 8, username: "ChainMaster", amount: 60 },
    { id: 9, username: "CryptoPro", amount: 55 },
    { id: 10, username: "TONHunter", amount: 50 },
  ];

  return (
    <Layout>
      <div className="min-h-screen text-white font-ubuntu relative overflow-hidden">
        <StarField />
        <CoinAnimation />
        
        {/* Header Section */}
        <div className="sticky top-0 z-30 backdrop-blur-lg">
          <div className="p-4 space-y-4"> {/* Уменьшили padding с p-6 на p-4 и space-y-6 на space-y-4 */}
            {/* Balance and Wallet */}
            <div className="flex flex-wrap items-center justify-between gap-4"> {/* Уменьшили gap с gap-6 на gap-4 */}
              {/* Balance Section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-1 min-w-[200px] max-w-md bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-xl shadow-lg" // Уменьшили padding с p-6 на p-4 и rounded-2xl на rounded-xl, shadow-xl на shadow-lg
              >
                <div className="flex items-center gap-3"> {/* Уменьшили gap с gap-4 на gap-3 */}
                  <div className="relative">
                    <Coins size={24} />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center" 
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Sparkles size={24} className="text-white" />
                    </motion.div>
                  </div>
                  <span className="text-xl font-bold text-white"> {/* Уменьшили размер текста с text-3xl на text-xl */}
                    {balance.toLocaleString()}
                  </span>
                </div>
              </motion.div>
              
              {/* Wallet Connection Section */}
              <div className="flex-1 min-w-[200px] max-w-md"> {/* Уменьшили min-w с min-w-[250px] на min-w-[200px] */}
                <TonConnectButton className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-300" /> {/* Уменьшили padding с px-6 py-4 на px-4 py-2, rounded-2xl на rounded-xl, shadow-lg на shadow-md */}
              </div>
            </div>
            
            {/* Deposit Button */}
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl font-bold shadow-md
                flex items-center justify-center gap-2" // Уменьшили padding с p-4 на p-3 и shadow-lg на shadow-md
            >
              {/* <TrendingUp size={20} /> */}
              {/* Пополнить баланс
            </motion.button> */}
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cases Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Package className="text-purple-400" />
                Доступные кейсы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cases.map((case_) => (
                  <CaseCard 
                    key={case_.id} 
                    {...case_} 
                    onOpen={() => setIsOpeningCase(true)}
                  />
                ))}
              </div>
            </div>

            {/* Top Users Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-48"> {/* Убедитесь, что top достаточно для фиксированного положения */}
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4"> {/* Уменьшили padding с p-6 на p-4 */}
                  <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"> {/* Уменьшили margin-bottom с mb-6 на mb-4 */}
                    {/* <Trophy className="text-yellow-400" /> */}
                    Топ игроков
                  </h2>
                  <div className="space-y-2"> {/* Уменьшили space-y с space-y-3 на space-y-2 */}
                    {topUsers.map((user, index) => (
                      <TopUserCard
                        key={user.id}
                        rank={index + 1}
                        username={user.username}
                        amount={user.amount}
                        isTop3={index < 3}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CaseOpeningAnimation 
          isVisible={isOpeningCase} 
          onClose={() => setIsOpeningCase(false)}
        />
      </div>
    </Layout>
  );
};

export default Market;
