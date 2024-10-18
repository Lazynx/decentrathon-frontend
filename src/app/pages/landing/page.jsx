import React from 'react';
import BoxShadow from '@/app/components/box/BoxShadow';
import BoxDefault from '@/app/components/box/BoxDefault';
import PathNode from '@/app/components/layout/PathNode';

const Page = () => {
  return (
    <div className='min-h-screen flex flex-col items-center font-ubuntu mb-[0.7rem] px-4'>
      <BoxShadow main_text={"Пройди наш опрос чтобы мы могли подобрать курс под твои любимые темы!"} button_context={"Пройти опрос"} />
      
    </div>
  );
};

export default Page;
