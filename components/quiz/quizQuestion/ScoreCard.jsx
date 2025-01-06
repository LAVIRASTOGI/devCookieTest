import Button from "@/components/uiComponents/Button";

function ScoreCard({ score, total, onRestart, timeExpired }) {
  const percentage = (score / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      {timeExpired && (
        <div className="mb-4 text-red-500 font-medium">
          Time's up! Quiz automatically submitted.
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Complete!
        </h2>
        <div className="w-32 h-32 mx-auto relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {Math.round(percentage)}%
            </span>
          </div>
          <svg className="transform-rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={376.8}
              strokeDashoffset={376.8 - (376.8 * percentage) / 100}
              className="text-primary transition-all duration-1000"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xl text-gray-600">
          You scored <span className="font-bold text-primary">{score}</span> out
          of <span className="font-bold text-primary">{total}</span>
        </p>
        <p className="text-gray-500">
          {percentage === 100
            ? "Perfect! You're a genius! 🎉"
            : percentage >= 80
            ? "Excellent work! 🌟"
            : percentage >= 60
            ? "Good job! Keep it up! 👍"
            : "Keep practicing, you'll get better! 💪"}
        </p>
      </div>

      <div className="flex items-center gap-4 justify-center">
        <Button
          variant="primary"
          mobileSize="xl"
          laptopSize="xl"
          className="text-white mt-8 "
          onClick={onRestart}
        >
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Try Again
          </div>
        </Button>
        <Button
          variant="primary"
          mobileSize="xl"
          laptopSize="xl"
          className="text-white mt-8 "
          onClick={onRestart}
        >
          <div className="flex gap-2 items-center">Evaluate Quiz</div>
        </Button>
      </div>
    </div>
  );
}

export default ScoreCard;
