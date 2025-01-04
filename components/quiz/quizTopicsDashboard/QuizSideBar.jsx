function QuizSidebar({ quizTopicsDetails }) {
  // Helper function to check if level should be locked
  const isLevelLocked = (level, quizTopicsDetails) => {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    const currentLevelIndex = levels.indexOf(level);

    if (currentLevelIndex === 0) return false; // Beginner is always unlocked

    // Check if previous level is completed
    const previousLevel = levels[currentLevelIndex - 1];
    const previousLevelData = quizTopicsDetails[previousLevel];
    return !previousLevelData || previousLevelData.overallProgress < 80; // Requires 80% completion
  };

  return (
    <div className="menu bg-base-200 min-h-full lg:w-[450px] p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">HTML Course</h2>
        <div className="h-1 w-20 bg-primary rounded"></div>
      </div>

      {/* Quiz Levels */}
      {Object.entries(quizTopicsDetails).map(([level, levelData]) => {
        const isLocked = isLevelLocked(level, quizTopicsDetails);

        return (
          <div key={level} className={`mb-6 ${isLocked ? "opacity-75" : ""}`}>
            {/* Level Header with Lock Status */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-700">{level}</h3>
                {isLocked && (
                  <svg
                    className="w-5 h-5 text-gray-500"
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
              <span className="text-sm text-gray-500">
                {levelData.completedTopics}/{levelData.totalTopics} Complete
              </span>
            </div>

            {/* Level Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isLocked ? "bg-gray-400" : "bg-primary"
                }`}
                style={{ width: `${levelData.overallProgress || 0}%` }}
              ></div>
            </div>

            {/* Level Description with Lock Message */}
            <div className="text-sm text-gray-600 mb-3">
              <p>{levelData.description}</p>
              {isLocked && (
                <div className="mt-2 space-y-2">
                  {/* Payment requirement */}
                  <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600">₹{levelData.cost}</span>
                      <span className="text-sm text-gray-600">
                        to unlock this level
                      </span>
                    </div>
                    <button
                      className="px-4 py-1.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors text-sm font-medium"
                      onClick={() => handlePayment(level)}
                    >
                      Unlock Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Topics */}
            <div className="space-y-2">
              {levelData.topic.map((quiz, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-3 transition-all 
                      ${
                        isLocked
                          ? "cursor-not-allowed opacity-75"
                          : "hover:shadow-md cursor-pointer"
                      }`}
                >
                  {/* Quiz Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-800">
                      {quiz.quizName}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {quiz.completedQuestions}/{quiz.totalQuestions}
                    </span>
                  </div>

                  {/* Quiz Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isLocked ? "bg-gray-400" : "bg-primary"
                      }`}
                      style={{ width: `${quiz.progress || 0}%` }}
                    ></div>
                  </div>

                  {/* Quiz Status */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {quiz.progress}% Complete
                    </span>
                    {isLocked ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        <svg
                          className="w-3 h-3 mr-1"
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-3 h-3 mr-1"
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Subscription Status */}
            {levelData.subscribed ? (
              <div className="mt-3 text-xs text-green-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
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
                Subscribed
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Cost: ${levelData.cost}
                </span>
                <button
                  className={`px-3 py-1 text-xs font-medium text-white rounded-full transition-colors
                      ${
                        isLocked
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-primary-dark cursor-pointer"
                      }`}
                  disabled={isLocked}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QuizSidebar;
