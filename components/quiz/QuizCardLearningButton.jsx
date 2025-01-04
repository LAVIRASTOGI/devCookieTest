"use client";
import { useRouter } from "next/navigation";
import Button from "../uiComponents/Button";

function QuizCardLearningButton({ topic }) {
  const router = useRouter();
  const handleStartLearning = () => {
    router.push(`/quizzes/${topic?.id}`);
  };
  return (
    <>
      {/* Button */}
      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white"
        onClick={handleStartLearning}
      >
        <div className="flex items-center justify-center gap-2">
          <span>Start Learning</span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Button>
    </>
  );
}

export default QuizCardLearningButton;
