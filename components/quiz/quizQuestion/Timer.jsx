// components/quiz/Timer.jsx
import { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed right-1/2 transform translate-x-1/2 top-24 md:top-28 md:right-6 md:transform-none bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${
              timeLeft <= 60 ? "text-red-500" : "text-blue-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            className={`font-mono text-2xl font-bold ml-2 ${
              timeLeft <= 60 ? "text-red-500" : "text-blue-500"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
        <div className="hidden lg:block text-sm text-gray-500">
          Time Remaining
        </div>
      </div>
    </div>
  );
};

export default Timer;
