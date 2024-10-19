import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadSuccess(false);
  };

  const removeFile = () => setFile(null);

  const handleSubmit = async () => {
    if (!file && !userInput.trim()) {
      alert("Пожалуйста, введите текст или выберите файл");
      return;
    }

    const telegramId = localStorage.getItem("telegramId");
    const response = await axiosInstance.put("/auth/userInfo", { telegramId });
    const user = response.data.data.user;

    const formData = new FormData();
    if (file) formData.append("material", file);
    formData.append("telegramId", telegramId);
    formData.append("user_interest", user.surveyAnswers.join(","));
    formData.append("userInput", userInput);

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/course/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadSuccess(true);
      return data._id;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    userInput,
    loading,
    setUserInput,
    handleFileChange,
    removeFile,
    handleSubmit,
    uploadSuccess,
  };
};
