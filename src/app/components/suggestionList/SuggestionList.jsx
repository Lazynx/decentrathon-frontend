import React from 'react';

const SuggestionList = ({ suggestions, handleSuggestionClick }) => (
  <div className="suggestions-scroll flex animate-scroll gap-4">
    {suggestions.concat(suggestions).map((suggestion, index) => (
      <button
        key={index}
        className="bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#3D3D3D] transition-colors mr-2 whitespace-nowrap mb-6"
        onClick={() => handleSuggestionClick(suggestion)}
      >
        {suggestion}
      </button>
    ))}
  </div>
);

export default SuggestionList;
