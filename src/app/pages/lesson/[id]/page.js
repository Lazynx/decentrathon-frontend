"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createClient } from 'pexels';
import Skeleton from '@/app/components/skeleton/SkeletonCourse';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const PEXELS_API_KEY = 'nlv3bF8K9X5b1HrEDXsJNM8Iy2aDAPblkPTSWvNNnHawMgD7gnHPfP1k';
const pexelsClient = createClient(PEXELS_API_KEY);

const extractIDs = (inputString) => {
  const courseMatch = inputString.match(/course-([^%&]+)/);
  const lessonMatch = inputString.match(/lesson-([^&]+)/);

  return {
    courseID: courseMatch ? courseMatch[1] : null,
    lessonID: lessonMatch ? lessonMatch[1] : null
  };
};

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const { courseID, lessonID } = extractIDs(id);

  const [course, setCourse] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [page, setPage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isReading, setIsReading] = useState(true);
  const [resultPage, setResultPage] = useState(0);
  const [topicImage, setTopicImage] = useState('');
  const resultsPerPage = 5;

  let correct_answer = 0;
  let incorrect_answer = 0;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`https://spirality-backend-production.up.railway.app/api/course/${courseID}/${lessonID}`);
        setCourse(response.data);
        setUserAnswers(new Array(response.data.tests.length).fill(null));
        
        // Поиск изображения по теме курса с помощью Pexels API
        const pexelsResponse = await pexelsClient.photos.search({ query: response.data.topic, per_page: 1 });
        if (pexelsResponse.photos && pexelsResponse.photos.length > 0) {
          setTopicImage(pexelsResponse.photos[0].src.large);
        }
        else{
          setTopicImage("https://t3.ftcdn.net/jpg/04/41/15/78/360_F_441157874_UDGnaFGo7JY5MX8djN50w55TRlYobtqf.jpg")
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  useEffect(() => {
    if (testCompleted && (correctCount + incorrectCount) * 0.6 <= correctCount) {
      const addXp = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          await axios.put(`https://spirality-backend-production.up.railway.app/api/auth/addXp`, { token: refreshToken });
          await axios.post(`https://spirality-backend-production.up.railway.app/api/course/${courseID}/${lessonID}/complete`, { token: refreshToken });
        } catch (error) {
          console.error('Error adding XP:', error);
        }
      };
      addXp();
    }
  }, [testCompleted, correctCount, incorrectCount]);
  
  if (!course) {
    return <Skeleton />;
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (userAnswers[questionIndex] !== null) return;
  
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  
    if (course.tests[questionIndex].answers[answerIndex] === course.tests[questionIndex].correctAnswer) {
      setModalContent('Правильно!');
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setModalContent('Неправильно! Перечитай весь конспект снова!');
      setIncorrectCount((prevCount) => prevCount + 1);
    }
    setShowModal(true);
  
    setTimeout(() => {
      setShowModal(false);
      if (currentQuestion < course.tests.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmitTest();
      }
    }, 2000);
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
  };

  const splitTextIntoChunks = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    const chunks = [];
    for (let i = 0; i < sentences.length; i += 4) {
      chunks.push(sentences.slice(i, i + 4).join(' '));
    }
    return chunks;
  };

  const textChunks = splitTextIntoChunks(course.conspect);

  const renderConspect = () => (
    <div className="bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-3xl p-8 w-full max-w-[100%] md:max-w-3xl shadow-2xl shadow-[#1E2A38] mb-10 text-white">
      {topicImage && (
        <img src={topicImage} alt={course.topic} className="w-full h-48 object-cover rounded-t-3xl mb-8" />
      )}
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">{course.topic}</h2>
      <div className="mb-8">
        {textChunks[page].split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-base md:text-xl leading-relaxed mb-4">{paragraph}</p>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button 
          disabled={page === 0} 
          onClick={() => setPage(page - 1)} 
          className={`bg-[#6a4ae2] text-white font-semibold py-3 px-6 rounded-xl transition duration-300 hover:bg-[#8465f1] transform hover:-translate-y-1 active:translate-y-0 ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Назад
        </button>
        <span className="text-white text-base md:text-lg font-medium">{`${page + 1}/${textChunks.length}`}</span>
        {page === textChunks.length - 1 ? (
          <button 
            onClick={() => setIsReading(false)} 
            className="bg-[#6a4ae2] text-white font-semibold py-3 px-6 rounded-xl transition duration-300 hover:bg-[#8465f1] transform hover:-translate-y-1 active:translate-y-0"
          >
            Начать тест
          </button>
        ) : (
          <button 
            onClick={() => setPage(page + 1)} 
            className="bg-[#6a4ae2] text-white font-semibold py-3 px-6 rounded-xl transition duration-300 hover:bg-[#8465f1] transform hover:-translate-y-1 active:translate-y-0"
          >
            Вперед
          </button>
        )}
      </div>
    </div>
  );

  const renderTest = () => (
    <div className="bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-3xl p-8 w-full max-w-[100%] md:max-w-3xl shadow-2xl shadow-[#1E2A38] mb-10">
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">Тест</h2>
      <div className="bg-white/10 rounded-2xl p-6 mb-6">
        <p className="text-sm md:text-lg font-medium text-white mb-2">{`Вопрос ${currentQuestion + 1} из ${course.tests.length}`}</p>
        <p className="text-base md:text-2xl font-bold text-white mb-4">{course.tests[currentQuestion].question}</p>
        <ul className="space-y-3">
          {course.tests[currentQuestion].answers.map((answer, answerIndex) => (
            <li 
              key={answerIndex} 
              className={`text-sm md:text-lg text-white mb-1 cursor-pointer py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105
              ${userAnswers[currentQuestion] === answerIndex ? 'bg-[#6a4ae2] shadow-lg' : 'bg-white/20'} 
              ${userAnswers[currentQuestion] !== null && course.tests[currentQuestion].answers[answerIndex] === course.tests[currentQuestion].correctAnswer ? 'bg-green-500' : ''} 
              ${userAnswers[currentQuestion] === answerIndex && course.tests[currentQuestion].answers[answerIndex] !== course.tests[currentQuestion].correctAnswer ? 'bg-red-500' : ''}`}
              onClick={() => handleAnswerSelect(currentQuestion, answerIndex)}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderResult = () => {
    
    const startIndex = resultPage * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentResults = course.tests.slice(startIndex, endIndex);

    return (
      <div className="bg-gradient-to-br from-[#3a3d40] to-[#34495E] rounded-3xl p-8 w-full max-w-[100%] md:max-w-3xl shadow-2xl shadow-[#1E2A38] mb-10 text-white items-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Результаты теста</h2>
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold text-green-400 mb-2">{correctCount}</p>
            <p className="text-sm md:text-lg">Правильных</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold text-red-400 mb-2">{incorrectCount}</p>
            <p className="text-sm md:text-lg">Неправильных</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.ul
            key={resultPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {currentResults.map((testItem, index) => (
              <li key={startIndex + index} className="bg-white/10 rounded-2xl p-6">
                <p className="text-lg md:text-xl font-bold mb-3">{testItem.question}</p>
                <p className={`text-base md:text-lg ${userAnswers[startIndex + index] === testItem.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                  Ваш ответ: {testItem.answers[userAnswers[startIndex + index]]}
                </p>
                {userAnswers[startIndex + index] !== testItem.correctAnswer && (
                  <p className="text-base md:text-lg text-green-400 mt-2">
                    Правильный ответ: {testItem.answers[testItem.correctAnswer]}
                  </p>
                )}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <div className="flex justify-center mt-6">
          <button 
            className='border border-solid border-blue-300 text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-300 hover:text-[#3a3d40] transition-colors duration-300' 
            onClick={() => {router.push('/')}}
          >
            Обратно
          </button>
        </div>
      </div>
    );
  };

  const renderModal = () => (
    <div className={`fixed bottom-0 left-0 right-0 bg-[#2C3E50] text-white p-4 transition-all duration-300 ${showModal ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
      <p className="text-center text-lg font-bold">{modalContent}</p>
    </div>
  );

  return (
    <div className='min-h-screen flex flex-col items-center font-ubuntu mb-[0.7rem] px-4'>
      {isReading ? renderConspect() : (testCompleted ? renderResult() : renderTest())}
      {renderModal()}
    </div>
  );
};

export default Page;