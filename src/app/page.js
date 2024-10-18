"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";
import Course from "./components/course/Course";
import Footer from "./components/layout/Footer";
import Profile from "./components/profile/Profile";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [userInput, setUserInput] = useState("");

  const router = useRouter();

  const suggestions = [
    "📓 Курс по тригонометрии",
    "🏹 Монгольское нашествие",
    "👨‍💻 Основы программирования на Python",
    "🏯 История Древнего Рима",
    "🔄 Экология и устойчивое развитие",
    "🌌 Астрономия для начинающих",
    "💼 Введение в бизнес-аналитику",
    "📊 Статистика и вероятности",
    "🧬 Основы генетики",
    "🌍 География и картография",
    "🎨 История искусства",
    "📝 Научное письмо и публикации",
  ];

  const suggestions_2 = [
    "📓 Введение в алгебру",
    "🏹 История Великой Отечественной войны",
    "👨‍💻 Разработка веб-приложений на JavaScript",
    "🏯 Культура и традиции Древнего Египта",
    "🔄 Возобновляемые источники энергии",
    "🌌 Космология и космические явления",
    "💼 Маркетинговые исследования",
    "📊 Анализ данных с использованием Python",
    "🧬 Биохимия для начинающих",
    "🌍 Мировая экономика",
    "🎨 Современное искусство",
    "📝 Техники эффективного письма",
  ];

  const suggestions_3 = [
    "📓 Дифференциальные уравнения",
    "🏹 Средневековая Европа",
    "👨‍💻 Мобильная разработка на Kotlin",
    "🏯 Архитектура Древней Греции",
    "🔄 Глобальное потепление и климатические изменения",
    "🌌 Физика черных дыр",
    "💼 Управление проектами",
    "📊 Прогнозирование и моделирование",
    "🧬 Микробиология",
    "🌍 Политическая география",
    "🎨 Искусство эпохи Возрождения",
    "📝 Публицистика и журналистика",
  ];

  const fetchCourses = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosInstance.post("/course/user_courses", {
        token: refreshToken,
      });
      const courseIds = response.data.user_courses;
  
      const courseDetailsPromises = courseIds.map(async (id) => {
        try {
          const courseResponse = await axiosInstance.get(
            `/course/${id}/get_topic_id`
          );
          if (courseResponse.status === 200) {
            return {
              id: courseResponse.data.name_of_course._id,
              name: courseResponse.data.name_of_course.headName,
              topics: courseResponse.data.id_collection,
            };
          }
        } catch (courseError) {
          if (courseError.response && courseError.response.data.message === "Course not found") {
            console.warn(`Course with id ${id} not found. Skipping.`);
            return null; // Return null or any other value to signify that this course is to be skipped
          } else {
            throw courseError; // Re-throw if it's a different error
          }
        }
      });
  
      const courseDetails = await Promise.all(courseDetailsPromises);
      // Filter out any null values from the results
      const validCourseDetails = courseDetails.filter(course => course !== null);
      setCourses(validCourseDetails);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setCourseLoading(false);
    }
  };
    useEffect(() => {
    fetchCourses();
  }, []);

  console.log(courses);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadSuccess(false);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file && !userInput.trim()) {
      alert("Пожалуйста, введите текст или выберите файл");
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axiosInstance.put("/auth/userInfo", {
      token: refreshToken,
    });
    const user = response.data.user;

    const formData = new FormData();
    if (file) {
      formData.append("material", file);
    }
    formData.append("token", refreshToken);
    formData.append("user_interest", user.surveyAnswers.join(","));
    formData.append("userInput", userInput);

    try {
      setLoading(true);

      const response = await axiosInstance.post("/course/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = response;

      const newTestId = data._id;
      setUploadSuccess(true);
      router.push(`pages/course/course-${newTestId}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
        <div className="relative mb-72 -z-10 h-full w-full min-w-[29rem] max-w-[96rem] sm:mb-0">
          <Image
            alt=""
            className="pointer-events-none mix-blend-color-burn opacity-20 absolute scale-[300%] inset-0 -z-10 -translate-x-2 select-none sm:translate-x-0"
            src="/v0-bg.svg"
            fill
          />
        </div>
      </div>

      <main className="flex-grow">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <img
              src="https://i.ibb.co/vkqbnCb/spiral-logo-concept-swirl-modern-logo-design-free-vector-Photoroom.png"
              alt="Spirality Logo"
              className="h-32 w-32 md:h-30 md:w-30 rotate-animation-loader"
            />
          </div>
        )}

        {activeSection === "home" && (
          <section className="flex flex-col h-screen text-white font-ubuntu mt-[-50%] md:mt-[-15%]">
            <div className="flex-grow flex flex-col items-center justify-center px-4 mt-44">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-s max-sm:p-4">
                Создай персональный курс в пару кликов
              </h1>
              <div className="w-[110%] max-w-2xl overflow-hidden">
                <div className="suggestion-container mb-8 whitespace-nowrap overflow-hidden">
                  <div className="suggestions-scroll flex animate-scroll gap-10">
                    {suggestions
                      .concat(suggestions)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                  </div>

                  <div className="suggestions-scroll flex animate-scroll gap-4">
                    {suggestions_2
                      .concat(suggestions_2)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                  </div>

                  <div className="suggestions-scroll flex animate-scroll gap-4">
                    {suggestions_3
                      .concat(suggestions_3)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-8">
              <div className="w-[95%] max-w-2xl mx-auto relative positio">
                <input
                  type="text"
                  className="w-full bg-[#2D2D2D] text-white rounded-full py-3 px-6 pr-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder=" Создай мне курс по..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <label
                  htmlFor="file-upload"
                  className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <FaPaperclip className="text-gray-400 hover:text-white transition-colors text-xl" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                  onClick={handleSubmit}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === "profile" && <Profile />}

        {activeSection === "courses" && (
          <div className="rounded-2xl p-6 w-full max-w-[90%] md:max-w-3xl mx-auto text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-8 text-start mt-4 md:py-6">
              Твои курсы
            </h1>
            {courseLoading ? (
              <div className="flex items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              courses.map((course) => (
                <Course
                  key={course.id}
                  course_id={course.id}
                  name_of_course={course.name}
                  topics_id={course.topics}
                  isOpen={false}
                />
              ))
            )}
          </div>
        )}
      </main>

      <Footer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
