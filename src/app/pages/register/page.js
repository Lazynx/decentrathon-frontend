"use client";

import { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Page() {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('landing');
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [interest, setInterest] = useState([]);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post('/auth/register', { email, username, password, surveyAnswers: surveyAnswers.slice(5, surveyAnswers.length - 2) });
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      router.push('/');
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyNext = () => {
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      setStep('register');
    }
  };


  const surveyQuestions = [
    {
      question: "🕒 Какое количество времени вы тратите на подготовку к экзаменам или изучение новых тем?",
      options: ["Меньше 30 минут ⏳", "30-60 минут ⏰", "1-2 часа ⌛", "Больше 2 часов 🕰️"],
      key: "studyTime"
    },
    {
      question: "📚 Сколько времени уходит на поиск материалов и составление конспектов?",
      options: ["Менее 10 минут ⏳", "10-30 минут ⏰", "30-60 минут ⌛", "Более часа 🕰️"],
      key: "materialPreparationTime"
    },
    {
      question: "❓ Как часто вы сталкиваетесь с нехваткой качественных учебных материалов?",
      options: ["Постоянно 🔄", "Часто 🌀", "Иногда 🔄", "Редко 🌀"],
      key: "materialAvailability"
    },
    {
      question: "📅 Насколько сложно вам дается организация учебного процесса и составление плана занятий?",
      options: ["Очень сложно 😖", "Сложно 😕", "Умеренно 🙂", "Легко 😎"],
      key: "studyOrganization"
    },
    {
      question: "💡 Представьте, что вы можете сократить время на обучение на 60% и получать конспекты по вашим интересам. Вы бы попробовали наш продукт?",
      options: ["Да, конечно! 🎉"],
      key: "readyToTry"
    },
    {
      question: "Какие темы вас интересуют? Вы можете выбрать несколько вариантов.",
      options: [
        { 
          name: "Аниме", 
          image: "https://lh5.googleusercontent.com/proxy/LI573Ig7yCMVPu3P2-tYguPx4L2d6QegaTBxaA0LWZAndf0BRS46pIKjuGPG5oEbDuFWBVgbF-kMhFcfxeyuQ69UlAFifTcQ9qo",
          subCategories: [
            { name: "Атака титанов", image: "https://www.kino-teatr.ru/news/23181/205114.jpg" },
            { name: "Наруто", image: "https://desu.shikimori.one/uploads/poster/animes/20/main_2x-f6c8bb835fb175b99d38d2897e7040ee.webp" },
            { name: "ВанПис", image: "https://kinocensor.ru/cache/videos/12947/5c88599ed19994fd3ced481339c2259b-367x550.jpg" },
            { name: "Стальной алхимик", image: "https://lh6.googleusercontent.com/proxy/BjJUKL2Akn8ooj2vnmLqM-2NBochvuS3C5ktCbXPjPRE-Y-EPs2mHArja6Ey9JRZxlMZ-kt9d_f3-t4_XtuVIWhiKx58cHL9" },
            { name: "Тетрадь смерти", image: "https://media.myshows.me/shows/760/a/96/a96160e13c22678bac4bd99c37842c1b.jpg" },
          ]
        },
        { 
          name: "Игры", 
          image: "https://resizer.mail.ru/p/a8c5015f-6426-5fe9-abb9-f1f2b917e150/AQAKV4K_BwP8yAXbjpqL4Pmxma1tBlY3Cf79TrwdQS8kv43qQeEQ3DpmZNOFWH4cSuUYYO1UjnHIGO2_3SnTj8zv3Go.jpg",
          subCategories: [
            { name: "The Witcher 3", image: "https://technicalcity.b-cdn.net/en/game_image/4/image?thumbnail=yes&maxwidth=400&maxheight=400&webp=1" },
            { name: "Counter-Strike: Global Offensive", image: "https://img.championat.com/news/big/t/x/anons-counter-strike-2_16795113311562411600.jpg" },
            { name: "Brawl Stars", image: "https://www.iphones.ru/wp-content/uploads/2022/03/2D4F4F53-D36C-4213-BB42-CAC30A9DD06D.jpeg" },
            { name: "Roblox", image: "https://images.immediate.co.uk/production/volatile/sites/3/2021/03/unnamed-881a107.jpg?quality=90&resize=640,427" },
            { name: "Assassin's creed", image: "https://img.asmedia.epimg.net/resizer/v2/NQSSVO3KOFCYRJY63WIWRFWFBU.jpg?auth=2a89197070a4e57d1cd23a611d76bf469e01b476aba89f7724d540f49cfca68b&width=1472&height=1104&smart=true" },
          ]
        },
        { 
          name: "Музыка", 
          image: "https://34mag.net/piarshak/content/editor_images/2018content/september/15sovetov_koncert/125.jpg",
          subCategories: [
            { name: "Queen", image: "https://i.scdn.co/image/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42" },
            { name: "Taylor Swift", image: "https://people.com/thmb/pXCJVY3QPmmcywd3f_pI3vl-9LI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(945x393:947x395)/Taylor-Swift-Zurich-070924-1-a49aaa8211c64d5b99d1247b8ea060e2.jpg" },
            { name: "Kendrick Lamar", image: "https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s900-c-k-c0x00ffffff-no-rj" },
            { name: "Daft Punk", image: "https://concord.com/wp-content/uploads/2018/02/daft-punk-banner-new.jpg" },
            { name: "Eminem", image: "https://i.guim.co.uk/img/media/9340fecc0db09bc13b483168446ad0e2e05c3e23/852_3364_7108_4264/master/7108.jpg?width=465&dpr=1&s=none" },
          ]
        },
        { 
          name: "Спорт", 
          image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/ngdjbafv3twathukjbq2",
          subCategories: [
            { name: "Футбол", image: "https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg" },
            { name: "Баскетбол", image: "https://sportyakutia.ru/images/1fotoposel/1posel2022/okt22/pari1.jpg" },
            { name: "Волейбол", image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg/f_auto/primary/ts0pb12hj1xleueuhh22" },
            { name: "Теннис", image: "https://srednyadm.ru/media/resized/tCZ-RTXNq5cZ28qJuQytkN63rwqKPD77kkvelBVzUUI/rs:fit:1024:768/aHR0cHM6Ly9zcmVk/bnlhZG0ucnUvbWVk/aWEvcHJvamVjdF9t/b18zOTEvOWEvMWIv/ZTcvN2MvNTMvNWYv/aW1hZ2UwMDEuanBn.jpg" },
            { name: "Шахматы", image: "https://chessbuy.ru/wa-data/public/shop/products/36/06/636/images/4639/4639.970.jpg" },
          ]
        },
        { 
          name: "Комиксы", 
          image: "https://images.ast.ru/upload/iblock/b95/Comics_W.jpg",
          subCategories: [
            { name: "Человек-паук", image: "https://www.mirf.ru/wp-content/uploads/2016/08/Spider-2-scaled.jpg" },
            { name: "Бэтмен", image: "https://www.mirf.ru/wp-content/uploads/2016/07/batman-reading-comics1.jpg" },
            { name: "Железный-человек", image: "https://cdn.shazoo.ru/240398_uFCjOXNfWk_iron_man.jpg" },
            { name: "Астерикс и Обеликс", image: "https://geekach.com.ua/content/uploads/images/85.jpg" },
            { name: "Дэдпул", image: "https://disima.ru/wp-content/uploads/2021/02/dedpul-1.jpg" },
          ]
        },
        { 
          name: "Мультфильмы", 
          image: "https://avatars.dzeninfra.ru/get-zen_doc/1714257/pub_64d7eda2c92c747c9237d8a5_64dbc775a9216a3544a6eeaa/scale_1200",
          subCategories: [
            { name: "Головоломка", image: "https://www.soyuz.ru/public/uploads/files/2/7635896/202406241224521c7d19b9b3.jpg" },
            { name: "Время приключений", image: "https://tlum.ru/uploads/bbca0a8e64d9e7d9da2264370f2a92707795984dc3972407152e6d0ef9ab3b14.jpeg" },
            { name: "Гравити Фолз", image: "https://www.soyuz.ru/public/uploads/files/2/7635448/202406061514129c1e31909d.jpg" },
            { name: "Гриффины", image: "https://thumbs.dfs.ivi.ru/storage5/contents/0/2/97e9a9e47f73cd84040f4b1456ddae.jpg" },
            { name: "Рик и Морти", image: "https://s0.rbk.ru/v6_top_pics/media/img/1/64/756744922016641.jpg" },
          ]
        }
      ],
      key: "interests",
      multiple: true
    },
    {
      question: "Как часто вы планируете заниматься?",
      options: ["Ежедневно", "Несколько раз в неделю", "Раз в неделю", "Несколько раз в месяц"],
      key: "studyFrequency"
    },
    {
      question: "🎉 Давай мы создадим твой профиль чтобы обучение было еще интереснее!",
      options: ["Конечно :)"],
      key: "studyFrequency"
    }
  ];
  const renderLanding = () => (
    <div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#171819] rounded-2xl p-4 md:p-6 w-full max-w-md text-center shadow-2xl shadow-[#2A1E4D] mb-10"
      >
        <div className='mb-6'>
          {/* Замените на актуальные изображения персонажей Duolingo */}
          <img src="https://media.licdn.com/dms/image/D5612AQHELgp8f8iw4g/article-cover_image-shrink_600_2000/0/1705554155336?e=2147483647&v=beta&t=XpPFhMOg9V4OGpJdRl_-GLFRrEyYO4pM6-ryTG-IzWc" alt="Duolingo characters" className="w-full" />
        </div>
        
        <div className='text-start mb-8'>
          <h1 className="text-2xl font-bold text-white mb-2">Создание индивидуальных курсов</h1>
          <p className="text-lg text-gray-300">
          бесплатно, весело и эффективно!
          </p>
        </div>
        
        <div className='space-y-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep('survey')}
            className="w-full bg-[#6a4ae2] text-white py-3 rounded-xl font-bold text-lg"
          >
            НАЧАТЬ
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/pages/login')}
            className="w-full bg-[#171819] text-[#6a4ae2] py-3 rounded-xl font-bold text-lg border border-[#6a4ae2]"
          >
            У МЕНЯ УЖЕ ЕСТЬ АККАУНТ
          </motion.button>
        </div>
      </motion.section>
      
      {/* <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#171819] rounded-2xl p-4 md:p-6 w-full max-w-md text-center shadow-2xl shadow-[#2A1E4D] mb-10"
      >
        <div className='text-center mb-8 mt-5'>
          <h1 className="text-3xl font-bold text-white mb-2">Мы ускорим твое обучение с часу до 20 минут</h1>
          <p className="text-lg text-gray-300 mt-4">
          Построим удобный путь чтобы ты точно понял тему от А до Я
          </p>
        </div>
      </motion.section> */}

  
    </div>
  );

  const renderSurvey = () => {
    const currentQuestion = surveyQuestions[surveyStep];
    return (
      <motion.section
        key={surveyStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-[#171819] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 w-full max-w-4xl xl:max-w-6xl mx-auto text-center shadow-2xl shadow-[#2A1E4D] mb-10"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">{currentQuestion.question}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const answer = option.name || option;
                if (currentQuestion.multiple) {
                  setSurveyAnswers(prev => 
                    prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
                  );
                } else {
                  setSurveyAnswers(prev => [...prev, answer]);
                  handleSurveyNext();
                }
              }}
              className={`p-6 sm:p-4 rounded-lg text-left transition-all duration-200 ${
                currentQuestion.multiple && surveyAnswers.includes(option.name || option)
                  ? 'bg-[#6a4ae2] text-white'
                  : 'bg-[#2A2D2E] text-white hover:bg-[#3A3D3E]'
              }`}
            >
              {option.name ? (
                <div className="flex flex-col items-center">
                  <img src={option.image} alt={option.name} className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2" />
                  <span className="text-center text-sm sm:text-lg xl:text-lg font-bold">{option.name}</span>
                </div>
              ) : (
                <span className="text-center w-full block text-lg font-semibold sm:text-base xl:text-lg">{option}</span>
              )}
            </motion.button>
          ))}
        </div>
        {currentQuestion.multiple && surveyAnswers.some(answer => currentQuestion.options.map(o => o.name).includes(answer)) && currentQuestion.options[0].subCategories && (
          <div className="mt-4 sm:mt-6 xl:mt-8">
            <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-white mb-3 sm:mb-4 xl:mb-5">Выберите подкатегории:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currentQuestion.options
                .filter(option => surveyAnswers.includes(option.name))
                .flatMap(option => option.subCategories)
                .map((subCategory, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSurveyAnswers(prev => 
                        prev.includes(subCategory.name) 
                          ? prev.filter(a => a !== subCategory.name) 
                          : [...prev, subCategory.name]
                      );
                    }}
                    className={`p-3 sm:p-4 rounded-lg text-left transition-all duration-200 ${
                      surveyAnswers.includes(subCategory.name)
                        ? 'bg-[#6a4ae2] text-white'
                        : 'bg-[#2A2D2E] text-white hover:bg-[#3A3D3E]'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <img src={subCategory.image} alt={subCategory.name} className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2" />
                      <span className="text-center text-sm sm:text-base xl:text-lg">{subCategory.name}</span>
                    </div>
                  </motion.button>
                ))}
            </div>
          </div>
        )}
        {currentQuestion.multiple && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSurveyNext}
            className="mt-4 sm:mt-6 xl:mt-8 bg-[#6a4ae2] text-white py-2 px-4 rounded-lg transition-all duration-200 font-bold text-sm sm:text-base xl:text-lg"
          >
            Далее
          </motion.button>
        )}
      </motion.section>
    );
};

  const renderRegisterForm = () => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#171819] rounded-2xl p-6 w-full max-w-md text-center shadow-2xl shadow-[#2A1E4D] mb-10"
    >
      <h2 className="text-3xl font-extrabold text-white mb-6">Регистрация</h2>
      <form onSubmit={handleRegister} className="flex flex-col text-black text-lg font-ubuntu">
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a4ae2] transition-all duration-200"
          required
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a4ae2] transition-all duration-200"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a4ae2] transition-all duration-200"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#6a4ae2] text-white py-2 px-4 rounded-lg transition-all duration-200 font-bold"
          disabled={loading}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </motion.button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className='font-ubuntu mt-4 underline text-sm text-white cursor-pointer' onClick={() => router.push('https://spirality-frontend.vercel.app/pages/login')}>
        Уже есть аккаунт? Войдите!
      </p>
    </motion.section>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 md:py-20">
      {step === 'landing' && renderLanding()}
      {step === 'survey' && renderSurvey()}
      {step === 'register' && renderRegisterForm()}
    </main>
  );
}