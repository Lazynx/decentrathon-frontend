import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const telegramId = localStorage.getItem("telegramId");
        const response = await axiosInstance.post("/course/user_courses", { telegramId });
        const courseIds = response.data.user_courses;

        const courseDetails = await Promise.all(
          courseIds.map(async (id) => {
            try {
              const courseResponse = await axiosInstance.get(`/course/${id}/get_topic_id`);
              if (courseResponse.status === 200) {
                return {
                  id: courseResponse.data.name_of_course._id,
                  name: courseResponse.data.name_of_course.headName,
                  topics: courseResponse.data.id_collection,
                };
              }
            } catch (err) {
              if (err.response?.data.message === "Course not found") {
                console.warn(`Course with id ${id} not found. Skipping.`);
                return null;
              } else {
                throw err;
              }
            }
          })
        );

        setCourses(courseDetails.filter(course => course !== null));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
