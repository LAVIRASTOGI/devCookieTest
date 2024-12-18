import React from "react";
import Button from "../uiComponents/Button";
import Image from "next/image";

function QuizTopicCard({ topic }) {
  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary transform transition-transform group-hover:scale-110 w-fit">
            <Image
              src={topic?.icon}
              alt={topic.title}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              priority
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {topic.title}
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
          {topic.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Quiz Progression</p>
            <div className="flex items-center gap-1 mb-2">
              <div className="h-1.5 w-4 rounded bg-green-500"></div>
              <div className="h-1.5 w-3 rounded bg-yellow-500"></div>
              <div className="h-1.5 w-3 rounded bg-red-500"></div>
            </div>
            <p className="text-xs text-gray-600">
              <span className="block sm:inline">
                Beginner ({topic?.beginner})
              </span>
              <span className="hidden sm:inline"> → </span>
              <span className="block sm:inline">
                Intermediate ({topic?.intermediate})
              </span>
              <span className="hidden sm:inline"> → </span>
              <span className="block sm:inline">
                Advanced ({topic?.advanced})
              </span>
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
                <p className="text-sm font-semibold text-gray-800">3-4 Hours</p>
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

        {/* Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 text-sm sm:text-base">
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
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gray-100">
        <div className="h-full bg-primary transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></div>
      </div>
    </div>
  );
}

export default QuizTopicCard;
