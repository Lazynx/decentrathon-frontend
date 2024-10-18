import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mt-6">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-2 h-[3rem] w-[9rem] md:h-[5rem] md:w-[15rem] md:text-2xl font-semibold mb-4 md:mb-8 mt-[-2rem] font-ubuntu rounded-full ${activeTab === index ? 'bg-[#2A1E4D] text-white' : 'bg-[#171819] text-gray-400'}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
