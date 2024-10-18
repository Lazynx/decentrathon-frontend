"use client";

import React, { useState, useEffect } from "react";
import { FaCrown, FaLock, FaBook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

const PathNode = ({ topic_id, course_id, isLast, index }) => {
  const router = useRouter();
  const [topicData, setTopicData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const response = await axios.get(
          `https://spirality-backend-production.up.railway.app/api/course/${course_id}`
        );
        const courseData = response.data;
        const topic = courseData.topics.find((t) => t._id === topic_id);

        if (topic) {
          setTopicData(topic);
          const topicIndex = courseData.topics.findIndex(
            (t) => t._id === topic_id
          );
          setIsAvailable(
            topicIndex === 0 || courseData.topics[topicIndex - 1].is_completed
          );
        }
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };

    fetchTopicData();
  }, [course_id, topic_id]);

  const handleClick = () => {
    if (isAvailable) {
      router.push(
        `https://spirality-frontend.vercel.app/pages/lesson/course-${course_id}&lesson-${topic_id}`
      );
    }
  };

  if (!topicData) return null;

  const getButtonColor = () => {
    if (topicData.is_completed) return "bg-[#58CC02] hover:bg-[#4CAF50]";
    if (isAvailable) return "bg-[#FFC300] hover:bg-[#FFD700]";
    return "bg-[#E5E5E5] hover:bg-[#D3D3D3]";
  };

  return (
    <div
      className={`flex items-center ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } mb-12`}
    >
      <div className="flex flex-col items-center w-32">
        <motion.button
          onClick={handleClick}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${getButtonColor()}
          active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed
          border-4 border-b-8 border-r-8 border-black/10`}
          disabled={!isAvailable}
          style={{
            transform: "perspective(1000px) rotateX(10deg)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {topicData.is_completed ? (
            <FaCrown className="text-3xl text-white" />
          ) : isAvailable ? (
            <FaBook className="text-3xl text-white" />
          ) : (
            <FaLock className="text-3xl text-gray-600" />
          )}
        </motion.button>
        <div className="mt-3 text-center text-sm text-white w-full break-words">
          {topicData.topic}
        </div>
      </div>
      {!isLast && (
        <div className="flex-1 h-3 mx-4">
          <motion.div
            className={`h-full ${
              topicData.is_completed ? "bg-[#58CC02]" : "bg-[#E5E5E5]"
            }`}
            style={{
              clipPath:
                index % 2 === 0
                  ? "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
                  : "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>
      )}
    </div>
  );
};

export default PathNode;
