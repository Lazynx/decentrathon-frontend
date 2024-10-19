// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import axiosInstance from "./utils/axiosInstance";
// import Course from "./components/course/Course";
// import Footer from "./components/layout/Footer";
// import Profile from "./components/profile/Profile";
// import Market from "./components/market/Market"; // Импортируем компонент Market
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import Image from "next/image";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [courseLoading, setCourseLoading] = useState(true);
//   const [activeSection, setActiveSection] = useState("home");
//   const [userInput, setUserInput] = useState("");

//   const router = useRouter();

//   const suggestions = [
//     "📓 Курс по тригонометрии",
//     "🏹 Монгольское нашествие",
//     "👨‍💻 Основы программирования на Python",
//     "🏯 История Древнего Рима",
//     "🔄 Экология и устойчивое развитие",
//     "🌌 Астрономия для начинающих",
//     "💼 Введение в бизнес-аналитику",
//     "📊 Статистика и вероятности",
//     "🧬 Основы генетики",
//     "🌍 География и картография",
//     "🎨 История искусства",
//     "📝 Научное письмо и публикации",
//   ];

//   const suggestions_2 = [
//     "📓 Введение в алгебру",
//     "🏹 История Великой Отечественной войны",
//     "👨‍💻 Разработка веб-приложений на JavaScript",
//     "🏯 Культура и традиции Древнего Египта",
//     "🔄 Возобновляемые источники энергии",
//     "🌌 Космология и космические явления",
//     "💼 Маркетинговые исследования",
//     "📊 Анализ данных с использованием Python",
//     "🧬 Биохимия для начинающих",
//     "🌍 Мировая экономика",
//     "🎨 Современное искусство",
//     "📝 Техники эффективного письма",
//   ];

//   const suggestions_3 = [
//     "📓 Дифференциальные уравнения",
//     "🏹 Средневековая Европа",
//     "👨‍💻 Мобильная разработка на Kotlin",
//     "🏯 Архитектура Древней Греции",
//     "🔄 Глобальное потепление и климатические изменения",
//     "🌌 Физика черных дыр",
//     "💼 Управление проектами",
//     "📊 Прогнозирование и моделирование",
//     "🧬 Микробиология",
//     "🌍 Политическая география",
//     "🎨 Искусство эпохи Возрождения",
//     "📝 Публицистика и журналистика",
//   ];

//   const fetchCourses = async () => {
//     try {
//       const telegramId = localStorage.getItem("telegramId");
//       const response = await axiosInstance.post("/course/user_courses", {
//         telegramId, 
//       });
//       const courseIds = response.data.user_courses;

//       const courseDetailsPromises = courseIds.map(async (id) => {
//         try {
//           const courseResponse = await axiosInstance.get(
//             `/course/${id}/get_topic_id`
//           );
//           if (courseResponse.status === 200) {
//             return {
//               id: courseResponse.data.name_of_course._id,
//               name: courseResponse.data.name_of_course.headName,
//               topics: courseResponse.data.id_collection,
//             };
//           }
//         } catch (courseError) {
//           if (
//             courseError.response &&
//             courseError.response.data.message === "Course not found"
//           ) {
//             console.warn(`Course with id ${id} not found. Skipping.`);
//             return null; 
//           } else {
//             throw courseError;
//           }
//         }
//       });

//       const courseDetails = await Promise.all(courseDetailsPromises);
//       const validCourseDetails = courseDetails.filter(
//         (course) => course !== null
//       );
//       setCourses(validCourseDetails);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setCourseLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   console.log(courses);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setUploadSuccess(false);
//   };

//   const removeFile = () => {
//     setFile(null);
//   };

//   const handleSubmit = async () => {
//     if (!file && !userInput.trim()) {
//       alert("Пожалуйста, введите текст или выберите файл");
//       return;
//     }
//     const telegramId = localStorage.getItem("telegramId");
//     const response = await axiosInstance.put("/auth/userInfo", {
//       telegramId, 
//     });
//     const user = response.data.data.user;

//     const formData = new FormData();
//     if (file) {
//       formData.append("material", file);
//     }
//     formData.append("telegramId", telegramId);
//     formData.append("user_interest", user.surveyAnswers.join(","));
//     formData.append("userInput", userInput);

//     try {
//       setLoading(true);

//       const response = await axiosInstance.post("/course/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { data } = response;

//       const newTestId = data._id;
//       setUploadSuccess(true);
//       router.push(`pages/course/course-${newTestId}`);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setUserInput(suggestion);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
//         <div className="relative mb-72 -z-10 h-full w-full min-w-[29rem] max-w-[96rem] sm:mb-0">
//           <Image
//             alt=""
//             className="pointer-events-none mix-blend-color-burn opacity-20 absolute scale-[300%] inset-0 -z-10 -translate-x-2 select-none sm:translate-x-0"
//             src="/v0-bg.svg"
//             fill
//           />
//         </div>
//       </div>

//       <main className="flex-grow">
//         {loading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <img
//               src="https://i.ibb.co/vkqbnCb/spiral-logo-concept-swirl-modern-logo-design-free-vector-Photoroom.png"
//               alt="Spirality Logo"
//               className="h-32 w-32 md:h-30 md:w-30 rotate-animation-loader"
//             />
//           </div>
//         )}

//         {activeSection === "home" && (
//           <section className="flex flex-col h-screen text-white font-ubuntu mt-[-50%] md:mt-[-15%]">
//             <div className="flex-grow flex flex-col items-center justify-center px-4 mt-44">
//               <h1 className="text-4xl md:text-6xl font-bold mb-8 text-s max-sm:p-4">
//                 Создай персональный курс в пару кликов
//               </h1>
//               <div className="w-[110%] max-w-2xl overflow-hidden">
//                 <div className="suggestion-container mb-8 whitespace-nowrap overflow-hidden">
//                   <div className="suggestions-scroll flex animate-scroll gap-10">
//                     {suggestions
//                       .concat(suggestions)
//                       .map((suggestion, index) => (
//                         <button
//                           key={index}
//                           className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                           {suggestion}
//                         </button>
//                       ))}
//                   </div>

//                   <div className="suggestions-scroll flex animate-scroll gap-4">
//                     {suggestions_2
//                       .concat(suggestions_2)
//                       .map((suggestion, index) => (
//                         <button
//                           key={index}
//                           className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                           {suggestion}
//                         </button>
//                       ))}
//                   </div>

//                   <div className="suggestions-scroll flex animate-scroll gap-4">
//                     {suggestions_3
//                       .concat(suggestions_3)
//                       .map((suggestion, index) => (
//                         <button
//                           key={index}
//                           className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                           {suggestion}
//                         </button>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="pb-8">
//               <div className="w-[95%] max-w-2xl mx-auto relative">
//                 <input
//                   type="text"
//                   className="w-full bg-[#2D2D2D] text-white rounded-full py-3 px-6 pr-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder=" Создай мне курс по..."
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer"
//                 >
//                   <FaPaperclip className="text-gray-400 hover:text-white transition-colors text-xl" />
//                 </label>
//                 <input
//                   id="file-upload"
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                 />
//                 <button
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
//                   onClick={handleSubmit}
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </div>
//           </section>
//         )}

//         {activeSection === "profile" && <Profile />}

//         {activeSection === "courses" && (
//           <div className="rounded-2xl p-6 w-full max-w-[90%] md:max-w-3xl mx-auto text-center mb-4">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-8 text-start mt-4 md:py-6">
//               Твои курсы
//             </h1>
//             {courseLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="loader"></div>
//               </div>
//             ) : (
//               courses.map((course) => (
//                 <Course
//                   key={course.id}
//                   course_id={course.id}
//                   name_of_course={course.name}
//                   topics_id={course.topics}
//                   isOpen={false}
//                 />
//               ))
//             )}
//           </div>
//         )}

//         {activeSection === "market" && <Market />}
//       </main>

//       <Footer
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import TelegramInitializer from './components/TelegramInitializer';
// import { motion } from 'framer-motion';

// export default function Page() {
//   const [showSurvey, setShowSurvey] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [surveyStep, setSurveyStep] = useState(0);
//   const [surveyAnswers, setSurveyAnswers] = useState([]);
//   const router = useRouter();

//   const surveyQuestions = [
//     {
//       question: "🕒 Какое количество времени вы тратите на подготовку к экзаменам или изучение новых тем?",
//       options: ["Меньше 30 минут ⏳", "30-60 минут ⏰", "1-2 часа ⌛", "Больше 2 часов 🕰️"],
//       key: "studyTime"
//     },
//     {
//       question: "📚 Сколько времени уходит на поиск материалов и составление конспектов?",
//       options: ["Менее 10 минут ⏳", "10-30 минут ⏰", "30-60 минут ⌛", "Более часа 🕰️"],
//       key: "materialPreparationTime"
//     },
//     {
//       question: "❓ Как часто вы сталкиваетесь с нехваткой качественных учебных материалов?",
//       options: ["Постоянно 🔄", "Часто 🌀", "Иногда 🔄", "Редко 🌀"],
//       key: "materialAvailability"
//     },
//     {
//       question: "📅 Насколько сложно вам дается организация учебного процесса и составление плана занятий?",
//       options: ["Очень сложно 😖", "Сложно 😕", "Умеренно 🙂", "Легко 😎"],
//       key: "studyOrganization"
//     },
//     {
//       question: "💡 Представьте, что вы можете сократить время на обучение на 60% и получать конспекты по вашим интересам. Вы бы попробовали наш продукт?",
//       options: ["Да, конечно! 🎉", "Скорее всего", "Возможно", "Вряд ли"],
//       key: "readyToTry"
//     },
//     {
//       question: "Какие темы вас интересуют? Вы можете выбрать несколько вариантов.",
//       options: [
//         { 
//           name: "Аниме", 
//           image: "https://lh5.googleusercontent.com/proxy/LI573Ig7yCMVPu3P2-tYguPx4L2d6QegaTBxaA0LWZAndf0BRS46pIKjuGPG5oEbDuFWBVgbF-kMhFcfxeyuQ69UlAFifTcQ9qo",
//           subCategories: [
//             { name: "Атака титанов", image: "https://www.kino-teatr.ru/news/23181/205114.jpg" },
//             { name: "Наруто", image: "https://desu.shikimori.one/uploads/poster/animes/20/main_2x-f6c8bb835fb175b99d38d2897e7040ee.webp" },
//             { name: "ВанПис", image: "https://kinocensor.ru/cache/videos/12947/5c88599ed19994fd3ced481339c2259b-367x550.jpg" },
//             { name: "Стальной алхимик", image: "https://lh6.googleusercontent.com/proxy/BjJUKL2Akn8ooj2vnmLqM-2NBochvuS3C5ktCbXPjPRE-Y-EPs2mHArja6Ey9JRZxlMZ-kt9d_f3-t4_XtuVIWhiKx58cHL9" },
//             { name: "Тетрадь смерти", image: "https://media.myshows.me/shows/760/a/96/a96160e13c22678bac4bd99c37842c1b.jpg" },
//           ]
//         },
//         { 
//           name: "Игры", 
//           image: "https://resizer.mail.ru/p/a8c5015f-6426-5fe9-abb9-f1f2b917e150/AQAKV4K_BwP8yAXbjpqL4Pmxma1tBlY3Cf79TrwdQS8kv43qQeEQ3DpmZNOFWH4cSuUYYO1UjnHIGO2_3SnTj8zv3Go.jpg",
//           subCategories: [
//             { name: "The Witcher 3", image: "https://technicalcity.b-cdn.net/en/game_image/4/image?thumbnail=yes&maxwidth=400&maxheight=400&webp=1" },
//             { name: "Counter-Strike: Global Offensive", image: "https://img.championat.com/news/big/t/x/anons-counter-strike-2_16795113311562411600.jpg" },
//             { name: "Brawl Stars", image: "https://www.iphones.ru/wp-content/uploads/2022/03/2D4F4F53-D36C-4213-BB42-CAC30A9DD06D.jpeg" },
//             { name: "Roblox", image: "https://images.immediate.co.uk/production/volatile/sites/3/2021/03/unnamed-881a107.jpg?quality=90&resize=640,427" },
//             { name: "Assassin's creed", image: "https://img.asmedia.epimg.net/resizer/v2/NQSSVO3KOFCYRJY63WIWRFWFBU.jpg?auth=2a89197070a4e57d1cd23a611d76bf469e01b476aba89f7724d540f49cfca68b&width=1472&height=1104&smart=true" },
//           ]
//         },
//         { 
//           name: "Музыка", 
//           image: "https://34mag.net/piarshak/content/editor_images/2018content/september/15sovetov_koncert/125.jpg",
//           subCategories: [
//             { name: "Queen", image: "https://i.scdn.co/image/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42" },
//             { name: "Taylor Swift", image: "https://people.com/thmb/pXCJVY3QPmmcywd3f_pI3vl-9LI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(945x393:947x395)/Taylor-Swift-Zurich-070924-1-a49aaa8211c64d5b99d1247b8ea060e2.jpg" },
//             { name: "Kendrick Lamar", image: "https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s900-c-k-c0x00ffffff-no-rj" },
//             { name: "Daft Punk", image: "https://concord.com/wp-content/uploads/2018/02/daft-punk-banner-new.jpg" },
//             { name: "Eminem", image: "https://i.guim.co.uk/img/media/9340fecc0db09bc13b483168446ad0e2e05c3e23/852_3364_7108_4264/master/7108.jpg?width=465&dpr=1&s=none" },
//           ]
//         },
//         { 
//           name: "Спорт", 
//           image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/ngdjbafv3twathukjbq2",
//           subCategories: [
//             { name: "Футбол", image: "https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg" },
//             { name: "Баскетбол", image: "https://sportyakutia.ru/images/1fotoposel/1posel2022/okt22/pari1.jpg" },
//             { name: "Волейбол", image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg/f_auto/primary/ts0pb12hj1xleueuhh22" },
//             { name: "Теннис", image: "https://srednyadm.ru/media/resized/tCZ-RTXNq5cZ28qJuQytkN63rwqKPD77kkvelBVzUUI/rs:fit:1024:768/aHR0cHM6Ly9zcmVk/bnlhZG0ucnUvbWVk/aWEvcHJvamVjdF9t/b18zOTEvOWEvMWIv/ZTcvN2MvNTMvNWYv/aW1hZ2UwMDEuanBn.jpg" },
//             { name: "Шахматы", image: "https://chessbuy.ru/wa-data/public/shop/products/36/06/636/images/4639/4639.970.jpg" },
//           ]
//         },
//         { 
//           name: "Комиксы", 
//           image: "https://images.ast.ru/upload/iblock/b95/Comics_W.jpg",
//           subCategories: [
//             { name: "Человек-паук", image: "https://www.mirf.ru/wp-content/uploads/2016/08/Spider-2-scaled.jpg" },
//             { name: "Бэтмен", image: "https://www.mirf.ru/wp-content/uploads/2016/07/batman-reading-comics1.jpg" },
//             { name: "Железный-человек", image: "https://cdn.shazoo.ru/240398_uFCjOXNfWk_iron_man.jpg" },
//             { name: "Астерикс и Обеликс", image: "https://geekach.com.ua/content/uploads/images/85.jpg" },
//             { name: "Дэдпул", image: "https://disima.ru/wp-content/uploads/2021/02/dedpul-1.jpg" },
//           ]
//         },
//         { 
//           name: "Мультфильмы", 
//           image: "https://avatars.dzeninfra.ru/get-zen_doc/1714257/pub_64d7eda2c92c747c9237d8a5_64dbc775a9216a3544a6eeaa/scale_1200",
//           subCategories: [
//             { name: "Головоломка", image: "https://www.soyuz.ru/public/uploads/files/2/7635896/202406241224521c7d19b9b3.jpg" },
//             { name: "Время приключений", image: "https://tlum.ru/uploads/bbca0a8e64d9e7d9da2264370f2a92707795984dc3972407152e6d0ef9ab3b14.jpeg" },
//             { name: "Гравити Фолз", image: "https://www.soyuz.ru/public/uploads/files/2/7635448/202406061514129c1e31909d.jpg" },
//             { name: "Гриффины", image: "https://thumbs.dfs.ivi.ru/storage5/contents/0/2/97e9a9e47f73cd84040f4b1456ddae.jpg" },
//             { name: "Рик и Морти", image: "https://s0.rbk.ru/v6_top_pics/media/img/1/64/756744922016641.jpg" },
//           ]
//         }
//       ],
//       key: "interests",
//       multiple: true
//     },
//     {
//       question: "Как часто вы планируете заниматься?",
//       options: ["Ежедневно", "Несколько раз в неделю", "Раз в неделю", "Несколько раз в месяц"],
//       key: "studyFrequency"
//     }
//   ];

//   const handleSurveyNext = () => {
//     if (surveyStep < surveyQuestions.length - 1) {
//       setSurveyStep(surveyStep + 1);
//     } else {
//       handleSurveyComplete();
//     }
//   };

//   const handleSurveyComplete = async () => {
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
//           surveyAnswers,
//         }),
//       });

//       if (response.ok) {
//         setIsAuthenticated(true);
//         setShowSurvey(false);
//       } else {
//         throw new Error("Ошибка при регистрации пользователя");
//       }
//     } catch (err) {
//       console.error("Ошибка:", err.message);
//       alert(err.message);
//       // Здесь можно добавить обработку ошибки, например, показать пользователю сообщение
//     }
//   };

//   const renderSurvey = () => {
//     const currentQuestion = surveyQuestions[surveyStep];
//     return (
//       <motion.section
//         key={surveyStep}
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#171819] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 w-full max-w-4xl xl:max-w-6xl mx-auto text-center shadow-2xl shadow-[#2A1E4D] mb-10"
//       >
//         <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">{currentQuestion.question}</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//           {currentQuestion.options.map((option, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => {
//                 const answer = option.name || option;
//                 if (currentQuestion.multiple) {
//                   setSurveyAnswers(prev => 
//                     prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
//                   );
//                 } else {
//                   setSurveyAnswers(prev => [...prev, answer]);
//                   handleSurveyNext();
//                 }
//               }}
//               className={`p-6 sm:p-4 rounded-lg text-left transition-all duration-200 ${
//                 currentQuestion.multiple && surveyAnswers.includes(option.name || option)
//                   ? 'bg-[#6a4ae2] text-white'
//                   : 'bg-[#2A2D2E] text-white hover:bg-[#3A3D3E]'
//               }`}
//             >
//               {option.name ? (
//                 <div className="flex flex-col items-center">
//                   <img src={option.image} alt={option.name} className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2" />
//                   <span className="text-center text-sm sm:text-lg xl:text-lg font-bold">{option.name}</span>
//                 </div>
//               ) : (
//                 <span className="text-center w-full block text-lg font-semibold sm:text-base xl:text-lg">{option}</span>
//               )}
//             </motion.button>
//           ))}
//         </div>
//         {currentQuestion.multiple && surveyAnswers.some(answer => currentQuestion.options.map(o => o.name).includes(answer)) && currentQuestion.options[0].subCategories && (
//           <div className="mt-4 sm:mt-6 xl:mt-8">
//             <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-white mb-3 sm:mb-4 xl:mb-5">Выберите подкатегории:</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {currentQuestion.options
//                 .filter(option => surveyAnswers.includes(option.name))
//                 .flatMap(option => option.subCategories)
//                 .map((subCategory, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => {
//                       setSurveyAnswers(prev => 
//                         prev.includes(subCategory.name) 
//                           ? prev.filter(a => a !== subCategory.name) 
//                           : [...prev, subCategory.name]
//                       );
//                     }}
//                     className={`p-3 sm:p-4 rounded-lg text-left transition-all duration-200 ${
//                       surveyAnswers.includes(subCategory.name)
//                         ? 'bg-[#6a4ae2] text-white'
//                         : 'bg-[#2A2D2E] text-white hover:bg-[#3A3D3E]'
//                     }`}
//                   >
//                     <div className="flex flex-col items-center">
//                       <img src={subCategory.image} alt={subCategory.name} className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2" />
//                       <span className="text-center text-sm sm:text-base xl:text-lg">{subCategory.name}</span>
//                     </div>
//                   </motion.button>
//                 ))}
//             </div>
//           </div>
//         )}
//         {currentQuestion.multiple && (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSurveyNext}
//             className="mt-4 sm:mt-6 xl:mt-8 bg-[#6a4ae2] text-white py-2 px-4 rounded-lg transition-all duration-200 font-bold text-sm sm:text-base xl:text-lg"
//           >
//             Далее
//           </motion.button>
//         )}
//       </motion.section>
//     );
//   };

//   return (
//     <TelegramInitializer>
//       {({ isAuthenticated: telegramAuth, isNewUser }) => {
//         useEffect(() => {
//           setIsAuthenticated(telegramAuth);
//           setShowSurvey(isNewUser);
//         }, [telegramAuth, isNewUser]);

//         if (showSurvey) {
//           return renderSurvey();
//         }

//         if (!isAuthenticated) {
//           return (
//             <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
//               Для продолжения, пожалуйста, авторизуйтесь в Telegram.
//             </div>
//           );
//         }

//         // Здесь размещается основной контент страницы для аутентифицированных пользователей
//         return (
//           <div>
//             <h1>Добро пожаловать в приложение!</h1>
//             {/* Добавьте здесь основной контент вашего приложения */}
//           </div>
//         );
//       }}
//     </TelegramInitializer>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TelegramInitializer from './components/TelegramInitializer';
import { motion } from 'framer-motion';
import axiosInstance from "./utils/axiosInstance";

export default function Page() {
  return (
    <TelegramInitializer>
      {({ isAuthenticated: telegramAuth, isNewUser }) => (
        <PageContent telegramAuth={telegramAuth} isNewUser={isNewUser} />
      )}
    </TelegramInitializer>
  );
}

function PageContent({ telegramAuth, isNewUser }) {
  const [showSurvey, setShowSurvey] = useState(isNewUser);
  const [isAuthenticated, setIsAuthenticated] = useState(telegramAuth);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(telegramAuth);
    setShowSurvey(isNewUser);
  }, [telegramAuth, isNewUser]);

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
      options: ["Да, конечно! 🎉", "Скорее всего", "Возможно", "Вряд ли"],
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
    }
  ];

  const handleSurveyNext = () => {
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      handleSurveyComplete();
    }
  };

  const handleSurveyComplete = async () => {
    try {
      const telegram = window.Telegram?.WebApp;
      const { id, username, first_name, last_name } = telegram.initDataUnsafe.user;

      const response = await axiosInstance.post('/auth/register', {
        telegramId: id,
        username,
        firstName: first_name,
        lastName: last_name,
        surveyAnswers,
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setShowSurvey(false);
      } else {
        throw new Error("Ошибка при регистрации пользователя");
      }
    } catch (err) {
      console.error("Ошибка:", err.message);
      alert(err.message);
      // Здесь можно добавить обработку ошибки
    }
  };

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
        <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const answer = option.name || option;
                if (currentQuestion.multiple) {
                  setSurveyAnswers((prev) =>
                    prev.includes(answer)
                      ? prev.filter((a) => a !== answer)
                      : [...prev, answer]
                  );
                } else {
                  setSurveyAnswers((prev) => [...prev, answer]);
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
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2"
                  />
                  <span className="text-center text-sm sm:text-lg xl:text-lg font-bold">
                    {option.name}
                  </span>
                </div>
              ) : (
                <span className="text-center w-full block text-lg font-semibold sm:text-base xl:text-lg">
                  {option}
                </span>
              )}
            </motion.button>
          ))}
        </div>
        {currentQuestion.multiple &&
          surveyAnswers.some((answer) => currentQuestion.options.map((o) => o.name).includes(answer)) &&
          currentQuestion.options[0].subCategories && (
            <div className="mt-4 sm:mt-6 xl:mt-8">
              <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-white mb-3 sm:mb-4 xl:mb-5">
                Выберите подкатегории:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQuestion.options
                  .filter((option) => surveyAnswers.includes(option.name))
                  .flatMap((option) => option.subCategories)
                  .map((subCategory, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSurveyAnswers((prev) =>
                          prev.includes(subCategory.name)
                            ? prev.filter((a) => a !== subCategory.name)
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
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className="w-full h-24 sm:h-32 xl:h-40 object-cover rounded-lg mb-2"
                        />
                        <span className="text-center text-sm sm:text-base xl:text-lg">
                          {subCategory.name}
                        </span>
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

  if (showSurvey) {
    return renderSurvey();
  }

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
        Для продолжения, пожалуйста, авторизуйтесь в Telegram.
      </div>
    );
  }

  // Здесь размещается основной контент страницы для аутентифицированных пользователей
  return (
    <div>
      <h1>Добро пожаловать в приложение!</h1>
      {/* Добавьте здесь основной контент вашего приложения */}
    </div>
  );
}
