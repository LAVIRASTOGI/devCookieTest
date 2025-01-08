import { useRouter } from "next/navigation";

function QuizTypeSelection({ quizTopicsDetails, currentLevel, topicId }) {
  const router = useRouter();
  const currentLevelData = quizTopicsDetails[currentLevel];
  const currentTopic = quizTopicsDetails[currentLevel]?.topics.find(
    (ele) => ele.active
  );

  const handleStartQuiz = () => {
    router.push(`/quizzes/${topicId?.id}/${currentTopic?.id}`);
  };
  const handleEvaluateQuiz = () => {
    router.push(`/quizzes//${topicId?.id}/evaluate/${currentTopic?.id}`);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Headers */}
      <div className="flex flex-col gap-4 items-center mb-10">
        <h1 className="text-2xl underline font-bold text-primary">
          {currentLevelData?.description}
        </h1>
        {/* <h2 className="text-xl font-bold text-gray-600">
          {quizDetails?.description}
        </h2> */}
      </div>

      {/* Single Quiz Card */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border-2 border-primary/20 hover:border-primary/30 transition-all duration-300 p-6 hover:shadow-lg">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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

          {/* Quiz Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Quiz Information</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Duration: {currentTopic?.duration || "30"} minutes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Questions: {currentTopic?.totalQuestions || 0} total
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Passing Score: {currentTopic?.passingScore || 80}%
                </li>
                {currentTopic?.completedQuestions > 0 && (
                  <li className="flex items-center text-sm text-green-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                )) || (
                  <>
                    <li className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Comprehensive evaluation
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Detailed results analysis
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Instructions</h4>
            <ul className="space-y-1">
              {currentTopic?.instructions?.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-600">
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

          {/* Action Button */}
          {currentTopic?.isCompleted ? (
            <div className="flex flex-col md:flex-row gap-4 ">
              <button
                onClick={handleEvaluateQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full 
                hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2
                font-medium text-sm"
              >
                Evaluate Quiz
              </button>
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full 
                hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2
                font-medium text-sm"
              >
                Retake Quiz
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
              Start Quiz
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
  );
}

export default QuizTypeSelection;
