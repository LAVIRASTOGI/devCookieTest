function QuizSidebar({
  quizTopicsDetails,
  setQuizTopicsDetails,
  setCurrentLevel,
}) {
  // Helper function to check if level should be locked
  const isLevelLocked = (level, quizTopicsDetails) => {
    const levels = ["FreeQuiz", "Beginner", "Intermediate", "Advanced"];
    const currentLevelIndex = levels.indexOf(level);

    if (currentLevelIndex === 0) return false; // Free is always unlocked

    return !quizTopicsDetails["subscribed"];
  };

  const activeCurrentQuizHandler = (quizId) => {
    let newQuizTopicDetails = { ...quizTopicsDetails };
    Object.keys(newQuizTopicDetails).forEach((level) => {
      newQuizTopicDetails[level].topics.forEach((quiz) => {
        if (quiz.id === quizId) {
          setCurrentLevel(level);
        }
        quiz.active = quiz.id === quizId;
      });
    });
    setQuizTopicsDetails(newQuizTopicDetails);
  };
  return (
    <div className="menu bg-base-200 min-h-full w-full  p-3 lg:p-4">
      {/* Header with Subscription Status */}
      <div className="mb-4 lg:mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
            HTML Course
          </h2>
          {quizTopicsDetails.subscribed ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-800">
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Subscribed
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs lg:text-sm font-medium bg-amber-100 text-amber-800">
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Free Trial
            </span>
          )}
        </div>
        <div className="h-1 w-16 lg:w-20 bg-primary rounded"></div>
      </div>

      {/* Quiz Levels */}
      {Object.entries(quizTopicsDetails).map(([level, levelData]) => {
        const isLocked = isLevelLocked(level, levelData);

        return (
          <div
            key={level}
            className={`mb-4 lg:mb-6 ${isLocked ? "opacity-75" : ""}`}
          >
            {/* Level Header with Lock Status */}
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base lg:text-lg font-semibold text-gray-700">
                  {level}
                </h3>
                {level !== "FreeQuiz" && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium ${
                      isLocked
                        ? "bg-gray-100 text-gray-600"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {isLocked ? "Premium" : "Unlocked"}
                  </span>
                )}
                {isLocked && (
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xs lg:text-sm text-gray-500">
                {levelData.completedTopics}/{levelData.totalTopics} Complete
              </span>
            </div>

            {/* Level Progress Bar */}
            <div className="w-full h-1.5 lg:h-2 bg-gray-200 rounded-full mb-3 lg:mb-4">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isLocked ? "bg-gray-400" : "bg-primary"
                }`}
                style={{
                  width: `${
                    (Number(levelData.completedTopics) * 100) /
                    Number(levelData.totalTopics)
                  }%`,
                }}
              ></div>
            </div>

            {/* Level Description */}
            <div className="text-xs lg:text-sm text-gray-600 mb-3">
              <p>{levelData.description}</p>
            </div>

            {/* Quiz Topics */}
            <div className="space-y-2">
              {levelData.topics.map((quiz, index) => (
                <div
                  key={index}
                  onClick={
                    !isLocked ? () => activeCurrentQuizHandler(quiz?.id) : null
                  }
                  className={`bg-white rounded-lg p-2 lg:p-3 transition-all 
                      ${quiz?.active ? "bg-blue-200" : ""}
                      ${
                        isLocked
                          ? "cursor-not-allowed opacity-75"
                          : "hover:shadow-md cursor-pointer hover:bg-gray-300"
                      }`}
                >
                  {/* Quiz Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs lg:text-sm font-medium text-gray-800">
                      {quiz.quizName}
                    </h4>
                    <span className="text-[10px] lg:text-xs text-gray-500">
                      {quiz.completedQuestions}/{quiz.totalQuestions}
                    </span>
                  </div>

                  {/* Quiz Progress Bar */}
                  <div className="w-full h-1 lg:h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isLocked ? "bg-gray-400" : "bg-primary"
                      }`}
                      style={{
                        width: `${
                          (Number(quiz.completedQuestions) * 100) /
                          Number(quiz.totalQuestions)
                        }%`,
                      }}
                    ></div>
                  </div>

                  {/* Quiz Status */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] lg:text-xs text-gray-500">
                      {(
                        (Number(quiz.completedQuestions) * 100) /
                        Number(quiz.totalQuestions)
                      ).toFixed(2)}
                      % Complete
                    </span>
                    {isLocked ? (
                      <span className="inline-flex items-center px-1.5 lg:px-2 py-0.5 rounded text-[10px] lg:text-xs font-medium bg-gray-100 text-gray-800">
                        <svg
                          className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Locked
                      </span>
                    ) : quiz.isCompleted ? (
                      <span className="inline-flex items-center px-1.5 lg:px-2 py-0.5 rounded text-[10px] lg:text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-1.5 lg:px-2 py-0.5 rounded text-[10px] lg:text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Section for Locked Levels */}
            {isLocked && level !== "FreeQuiz" && (
              <div className="mt-2 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-amber-50 p-2 lg:p-3 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 text-sm lg:text-base font-medium">
                        ₹{levelData.cost}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-600">
                        for lifetime access
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Unlock all premium features and quizzes
                    </p>
                  </div>
                  <button
                    className="w-full sm:w-auto px-3 py-1.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors text-xs lg:text-sm font-medium flex items-center justify-center gap-1"
                    onClick={() => handlePayment(level)}
                  >
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Unlock Now
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QuizSidebar;
