"use client"; 

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const saleEndTime = new Date().getTime() + 10 * 60 * 1000; 

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative countdown rounded-[1rem] border-white border-[1px] flex flex-wrap justify-center items-center bg-[#BC2345] bg-opacity-80 py-4">
      <div className="text-center mx-2 sm:mx-4">
        <div className="text-white text-[1.5rem] sm:text-[2rem] font-bold">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-white text-xs sm:text-sm">Days</div>
      </div>
      <span className="text-white text-[1.5rem] sm:text-[2rem] mx-1 sm:mx-2">:</span>
      <div className="text-center mx-2 sm:mx-4">
        <div className="text-white text-[1.5rem] sm:text-[2rem] font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-white text-xs sm:text-sm">Hours</div>
      </div>
      <span className="text-white text-[1.5rem] sm:text-[2rem] mx-1 sm:mx-2">:</span>
      <div className="text-center mx-2 sm:mx-4">
        <div className="text-white text-[1.5rem] sm:text-[2rem] font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-white text-xs sm:text-sm">Minutes</div>
      </div>
      <span className="text-white text-[1.5rem] sm:text-[2rem] mx-1 sm:mx-2">:</span>
      <div className="text-center mx-2 sm:mx-4">
        <div className="text-white text-[1.5rem] sm:text-[2rem] font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-white text-xs sm:text-sm">Seconds</div>
      </div>
    </div>
  );
}
