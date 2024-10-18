"use client";

import React, { useEffect, useState } from 'react';
import Course from '@/app/components/course/Course';
import { useParams } from 'next/navigation';
import axios from 'axios';
import dotenv from 'dotenv'

const Page = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Extract the courseId from the URL
  const courseId = id.toString().slice(7, id.toString().length);
  
  let topics_all_id;

  const fetchCourse = async () => {
    try {
      const courseResponse = await axios.get(`https://spirality-backend-production.up.railway.app/api/course/${courseId}/get_topic_id`);
      topics_all_id = courseResponse.data.id_collection;

      setCourse({
        id: courseResponse.data.name_of_course._id,
        name: courseResponse.data.name_of_course.headName,
        topics: courseResponse.data.id_collection,
      });
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <img 
          src="https://i.ibb.co/vkqbnCb/spiral-logo-concept-swirl-modern-logo-design-free-vector-Photoroom.png" 
          alt="Spirality Logo" 
          className="h-32 w-32 md:h-30 md:w-30 rotate-animation-loader" 
        />      
      </div>
    );
  }

  if (!course) {
    return <div>Error loading course</div>;
  }

  return (
    <div>
      <Course 
        key={course.id} 
        course_id={course.id} 
        name_of_course={course.name} 
        topics_id={course.topics} 
        isOpen={true} 
      />
    </div>
  );
}

export default Page;
