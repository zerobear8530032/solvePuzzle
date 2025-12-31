import React, { useEffect, useImperativeHandle, useState } from 'react'

const Timer = React.forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [stopTimer, setStopTimer] = useState(0);
  useImperativeHandle(ref, () => {
    // this call back will execute when i call ref but here i am sending its a object of child components
    return {
      getCurrentTime: () => {
        console.log(seconds);
        return seconds
      },
      resetTimer: () => { setSeconds(0) },
      stopTimer: () => { setStopTimer(true) },
      startTimer: () => { setStopTimer(false) }
    }
  }, [seconds,stopTimer])



  useEffect(() => {
    if (stopTimer) {
      return;
    }
    const update = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(update);
    }

  }, [seconds,stopTimer]);

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
});

export default Timer;
