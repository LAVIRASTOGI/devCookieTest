import { memo, useCallback, useMemo } from "react";
import LoadingQuiz from "@/app/(home)/quizzes/loadingQuiz";
import { quizDetails } from "@/constants/quizDetails";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
import ClockIcon from "../Icons/ClockIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import CheckIcon from "../Icons/CheckIcon";

// Memoized SVG components

function QuizTypeSelection({
  quizTopicsDetails,
  currentLevel,
  topicId,
  isLoading,
}) {
  const router = useRouter();
  const currentTopic = useMemo(
    () => quizTopicsDetails[currentLevel]?.topics.find((ele) => ele.active),
    [quizTopicsDetails, currentLevel]
  );

  const handleStartQuiz = useCallback(() => {
    router.push(`/quizzes/${topicId}/${currentTopic?.toppicId}`);
  }, [router, topicId, currentTopic?.toppicId]);

  const handleEvaluateQuiz = useCallback(() => {
    router.push(`/quizzes//${topicId}/evaluate/${currentTopic?.toppicId}`);
  }, [router, topicId, currentTopic?.toppicId]);

  if (!currentTopic) {
    return <LoadingQuiz />;
  }

  return (
    <>
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-4 items-center mb-10">
          <h1 className="text-2xl underline font-bold text-primary">
            {quizDetails[topicId]?.[currentLevel]?.description}
          </h1>
        </div>

        <div className="px-4">
          <div className="bg-white rounded-2xl border-2 border-primary/20 hover:border-primary/30 transition-all duration-300 p-6 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircleIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {currentTopic?.quizName || `${currentLevel} Assessment`}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentTopic?.description ||
                    "Test your knowledge and skills in this comprehensive assessment"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Quiz Information</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <ClockIcon />
                    Duration: {currentTopic?.duration || "30"} minutes
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CalendarIcon />
                    Questions: {currentTopic?.totalQuestions || 0} total
                  </li>
                  {currentTopic?.completedQuestions > 0 && (
                    <li className="flex items-center text-sm text-green-600">
                      <CheckIcon />
                      Progress: {currentTopic?.completedQuestions}/
                      {currentTopic?.quizQuestions} completed
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Features</h4>
                <ul className="space-y-2">
                  {currentTopic?.features?.map((feature, index) => (
                    <li
                      key={`feature-${index}`}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  )) || (
                    <>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon />
                        Comprehensive evaluation
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon />
                        Detailed results analysis
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Instructions</h4>
              <ul className="space-y-1">
                {currentTopic?.instructions?.map((instruction, index) => (
                  <li
                    key={`instruction-${index}`}
                    className="text-sm text-gray-600"
                  >
                    • {instruction}
                  </li>
                )) || (
                  <>
                    <li className="text-sm text-gray-600">
                      • Read each question carefully before answering
                    </li>
                    <li className="text-sm text-gray-600">
                      • You cannot pause the quiz once started
                    </li>
                    <li className="text-sm text-gray-600">
                      • Ensure stable internet connection
                    </li>
                    <li className="text-sm text-gray-600">
                      • Submit before the timer ends
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Keeping original action buttons and conditions */}
            {currentTopic?.isCompleted ? (
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleEvaluateQuiz}
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full 
                  hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2
                  font-medium text-sm"
                >
                  {isLoading ? "Evaluating Quiz" : "Evaluate Quiz"}
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full 
                  hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2
                  font-medium text-sm"
                >
                  {isLoading ? "Starting Quiz" : "Retake Quiz"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full 
                hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2
                font-medium text-sm"
              >
                {isLoading ? "Starting Quiz" : "Start Quiz"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(QuizTypeSelection);
