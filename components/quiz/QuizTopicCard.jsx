"use client";
import Image from "next/image";
import QuizCardLearningButton from "./QuizCardLearningButton";
import { quizTopicsDetails } from "@/constants/quizTopicsDetails";
import { createQuizLevelDescription } from "@/utils/commonFunction";

function QuizTopicCard({ topic }) {
  const calculateCompletionPercentage = () => {
    // Get total completed quizzes (sum of completed quizzes from all difficulty levels)
    const completedQuizzes = topic.completedQuizzes || 0;

    // Get total quizzes
    const totalQuizzes = topic.quizCount || 0;

    // Calculate percentage
    if (totalQuizzes === 0) return 0;
    const percentage = (completedQuizzes / totalQuizzes) * 100;

    // Round to 1 decimal place
    return Math.round(percentage * 10) / 10;
  };

  // Calculate the completion percentage
  const completionPercentage = calculateCompletionPercentage();
  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary transform transition-transform group-hover:scale-110 w-fit">
            <Image
              src={quizTopicsDetails[topic?.skill]?.icon}
              alt={quizTopicsDetails[topic?.skill]?.title}
              width={40}
              height={40}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              priority
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {quizTopicsDetails[topic?.skill]?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {topic.quizCount} {topic.quizCount === 1 ? "quiz" : "quizzes"}
              </span>
              <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-xs sm:text-sm text-gray-500">
                Interactive Lessons
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          {quizTopicsDetails[topic?.skill]?.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Quiz Progression</p>
              <div className="flex items-center gap-1 mb-2">
                <div className="h-1.5 w-4 rounded bg-green-500"></div>
                <div className="h-1.5 w-3 rounded bg-yellow-500"></div>
                <div className="h-1.5 w-3 rounded bg-red-500"></div>
              </div>
              <p className="text-xs text-gray-600">
                <span className="block sm:inline">
                  {topic?.beginner?.length && (
                    <span className="hidden sm:inline">
                      Beginner ({createQuizLevelDescription(topic?.beginner, 0)}
                      )
                    </span>
                  )}
                </span>

                {topic?.intermediate?.length && (
                  <>
                    <span className="hidden sm:inline"> → </span>
                    <span className="hidden sm:inline">
                      Intermediate (
                      {createQuizLevelDescription(
                        topic?.intermediate,
                        topic?.beginner?.length
                      )}
                      )
                    </span>
                  </>
                )}
                {topic?.expert?.length && (
                  <>
                    <span className="hidden sm:inline"> → </span>
                    <span className="hidden sm:inline">
                      Expert (
                      {createQuizLevelDescription(
                        topic?.expert,
                        topic?.beginner?.length + topic?.intermediate?.length
                      )}
                      )
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Course Details</p>
              <div className="flex flex-row sm:flex-col gap-3 sm:gap-1">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
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
                  <p className="text-sm font-semibold text-gray-800">
                    {topic.totalduration} Minutes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {topic.quizCount} Progressive Quizzes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Completion Progress div */}
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Completion Progress</p>
            <div className="relative h-2 w-full bg-gray-200 rounded-full mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage || 0}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800">
                {completionPercentage}% Complete
              </p>
              <p className="text-xs text-gray-600">
                {topic.completedQuizzes || 0}/{topic.quizCount} Quizzes
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <QuizCardLearningButton topic={topic} />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gray-100">
        <div className="h-full bg-primary transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></div>
      </div>
    </div>
  );
}

export default QuizTopicCard;
