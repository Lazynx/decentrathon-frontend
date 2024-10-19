import React from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

const FileUpload = ({ userInput, setUserInput, handleFileChange, handleSubmit }) => (
  <div className="pb-8">
    <div className="w-[95%] max-w-2xl mx-auto relative">
      <input
        type="text"
        className="w-full bg-[#2D2D2D] text-white rounded-full py-3 px-6 pr-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder=" Создай мне курс по..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <label htmlFor="file-upload" className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer">
        <FaPaperclip className="text-gray-400 hover:text-white transition-colors text-xl" />
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
        onClick={handleSubmit}
      >
        <FaPaperPlane />
      </button>
    </div>
  </div>
);

export default FileUpload;
