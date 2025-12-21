import React, { useEffect, useState } from 'react'

function Timer({timeRef,stopTime}) {
  const [seconds, setseconds] = useState(0);
  console.log(stopTime);
  useEffect(() => {
    if(stopTime){
      return ;
    }
    const update = setInterval(() => {
      setseconds(prev => prev + 1);
      timeRef.current += 1;
    }, 1000);
    console.log(stopTime);
    return () => {
      clearInterval(update);
    }

  }, [seconds]);

  function formatTime(curr_seconds) {
    const hrs = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const format = `${hrs} : ${minutes} :  ${secs}`;
    return format;
  }
  return (
    <div className="flex items-center justify-center 
                bg-black text-green-400 
                font-mono text-4xl 
                px-6 py-4 
                rounded-xl shadow-lg">
      {formatTime(seconds)}
    </div>

  )
}

export default Timer
