"use client";
import Image from "next/image";
import QuizCardLearningButton from "./QuizCardLearningButton";
import { quizTopicsDetails } from "@/constants/quizTopicsDetails";
import { createQuizLevelDescription } from "@/utils/commonFunction";
import { memo, useMemo } from "react";

// Memoized SVG components
const ProgressBar = memo(({ completionPercentage }) => (
  <div className="relative h-1.5 w-full bg-gray-200 rounded-full mb-2">
    <div
      className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
      style={{ width: `${completionPercentage || 0}%` }}
    />
  </div>
));

const DifficultyIndicator = memo(() => (
  <div className="flex items-center gap-1 mb-2">
    <div className="h-1.5 w-4 rounded bg-green-500" />
    <div className="h-1.5 w-3 rounded bg-yellow-500" />
    <div className="h-1.5 w-3 rounded bg-red-500" />
  </div>
));

const QuizTopicCard = memo(({ topic }) => {
  // Memoize completion percentage calculation
  const completionPercentage = useMemo(() => {
    const completedQuizzes = topic.completedQuizzes || 0;
    const totalQuizzes = topic.quizCount || 0;
    if (totalQuizzes === 0) return 0;
    return Math.round((completedQuizzes / totalQuizzes) * 1000) / 10;
  }, [topic.completedQuizzes, topic.quizCount]);

  // Memoize topic details
  const topicDetails = useMemo(
    () => quizTopicsDetails[topic?.skill] || {},
    [topic?.skill]
  );

  // Memoize level descriptions
  const levelDescriptions = useMemo(
    () => ({
      beginner: topic?.beginner?.length
        ? createQuizLevelDescription(topic.beginner, 0)
        : null,
      intermediate: topic?.intermediate?.length
        ? createQuizLevelDescription(
            topic.intermediate,
            topic?.beginner?.length || 0
          )
        : null,
      expert: topic?.expert?.length
        ? createQuizLevelDescription(
            topic.expert,
            (topic?.beginner?.length || 0) + (topic?.intermediate?.length || 0)
          )
        : null,
    }),
    [topic?.beginner, topic?.intermediate, topic?.expert]
  );

  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary transform transition-transform group-hover:scale-110 w-fit">
            {topicDetails?.icon && (
              <Image
                src={topicDetails.icon}
                alt={topicDetails.title}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {topicDetails.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {topic.quizCount} {topic.quizCount === 1 ? "quiz" : "quizzes"}
              </span>
              <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-xs sm:text-sm text-gray-500">
                Interactive Lessons
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          {topicDetails.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Quiz Progression</p>
              <DifficultyIndicator />
              <p className="text-xs text-gray-600">
                {levelDescriptions.beginner && (
                  <span className="hidden sm:inline">
                    Beginner ({levelDescriptions.beginner})
                  </span>
                )}
                {levelDescriptions.intermediate && (
                  <>
                    <span className="hidden sm:inline"> → </span>
                    <span className="hidden sm:inline">
                      Intermediate ({levelDescriptions.intermediate})
                    </span>
                  </>
                )}
                {levelDescriptions.expert && (
                  <>
                    <span className="hidden sm:inline"> → </span>
                    <span className="hidden sm:inline">
                      Expert ({levelDescriptions.expert})
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

          {/* Completion Progress */}
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Completion Progress</p>
            <ProgressBar completionPercentage={completionPercentage} />
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
        <div className="h-full bg-primary transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500" />
      </div>
    </div>
  );
});

QuizTopicCard.displayName = "QuizTopicCard";

export default QuizTopicCard;
