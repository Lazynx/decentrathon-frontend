"use client"

import React, { useState } from 'react';
import PathNode from "../layout/PathNode";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const ChevronIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Course = ({ name_of_course, course_id, topics_id, isOpen }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

    useEffect(() => {
        setIsAccordionOpen(isOpen);
    }, [isOpen]);

    return (
        <div className="mb-12 w-full max-w-4xl mx-auto" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
            <motion.button
                className="w-full bg-[#2D2D2D] text-white font-bold py-5 px-8 rounded-xl text-xl md:text-2xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#34495E] focus:ring-opacity-50 flex justify-between items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>{name_of_course}</span>
                <motion.div
                    animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronIcon className="w-6 h-6" />
                </motion.div>
            </motion.button>
            
            <AnimatePresence>
                {isAccordionOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 bg-[#242424] rounded-2xl p-8 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col items-center space-y-6">
                            {topics_id.map((topicId, index) => (
                                <PathNode
                                    key={index}
                                    index={index}
                                    topic_id={topicId}
                                    course_id={course_id}
                                    isLast={index === topics_id.length - 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Course;