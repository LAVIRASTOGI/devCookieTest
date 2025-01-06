"use client";
import { quizTopics } from "@/constants/quizTopic";
import { extractObjectFromArray } from "@/utils/commonFunction";
import QuizSidebar from "./QuizSideBar";
import { useState } from "react";
import QuizTypeSelection from "./QuizTypeSelection";

function TopicsDashboard({ topic }) {
  const quizDetails = extractObjectFromArray(quizTopics, "id", topic);
  const [quizTopicsDetails, setQuizTopicsDetails] = useState(
    quizDetails?.quizTopicsDetails
  );
  const [currentLevel, setCurrentLevel] = useState("FreeQuiz");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <header className="lg:hidden fixed top-[80px] left-0 right-0 z-50 bg-white shadow-md h-[28px]">
        <div className="flex items-center h-full px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-sm font-semibold ml-2">Quiz Dashboard</h1>
        </div>
      </header>

      {/* Main Content Container - Added mt-[28px] for mobile */}
      <div className="flex flex-col lg:flex-row mt-[108px] lg:mt-0">
        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-0 z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out top-[108px] lg:top-0`}
        >
          <div className="h-[calc(100vh-108px)] lg:h-screen bg-white shadow-lg overflow-y-auto">
            {/* Close button for mobile */}
            <div className="lg:hidden p-2 flex justify-end">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {quizDetails?.id && (
              <QuizSidebar
                quizTopicsDetails={quizTopicsDetails}
                setQuizTopicsDetails={setQuizTopicsDetails}
                setCurrentLevel={setCurrentLevel}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 items-center px-4 md:px-6 lg:px-8 md:py-16 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <QuizTypeSelection
                quizTopicsDetails={quizTopicsDetails}
                currentLevel={currentLevel}
                quizDetails={quizDetails}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden top-[28px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default TopicsDashboard;
