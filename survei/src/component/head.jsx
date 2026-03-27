import React from 'react';
import '../index.css';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Head({ setViewQ, setViewR, autoView }) {

  const quizclick = async () => {
    setViewR(false);
    setViewQ(false); 
    await sleep(400);
    autoView();
  };

  const respondenclick = async () => {
    setViewQ(false); 
    await sleep(400);
    setViewR(true);
  };

  return (
    <div className="w-screen h-[9vh] flex flex-col bg-slate-900 relative shadow-md">
      <div className="flex flex-row w-full h-[36px] absolute bottom-0 text-center text-sm font-medium">
        
        <div
          className="
            w-1/2 h-full
            bg-slate-800
            text-slate-200
            border-r border-slate-700
            cursor-pointer
            flex items-center justify-center
            hover:bg-slate-700
            transition
          "
          onClick={quizclick}
        >
          Load Quiz
        </div>

        <div
          className="
            w-1/2 h-full
            bg-slate-800
            text-slate-200
            border-l border-slate-700
            cursor-pointer
            flex items-center justify-center
            hover:bg-slate-700
            transition
          "
          onClick={respondenclick}
        >
          Responden
        </div>

      </div>
    </div>
  );
}
