"use client";
import QuizSidebar from "./QuizSideBar";
import { useEffect, useState } from "react";
import { createQuizStepsSkill } from "@/utils/commonFunction";
const stepsArray = ["freeQuiz", "beginner", "intermediate", "expert"];

function TopicsDashboard({ topicId, quizDetailsTopic }) {
  const [quizTopicsDetails, setQuizTopicsDetails] = useState({});
  const [currentLevel, setCurrentLevel] = useState("freeQuiz");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    let quizDetailsTopicNew = { ...quizDetailsTopic };
    if (quizDetailsTopicNew["freeQuiz"]) {
      quizDetailsTopicNew["freeQuiz"].topics[0].active = true;
    }
    setQuizTopicsDetails(createQuizStepsSkill(quizDetailsTopicNew, stepsArray));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <header className="lg:hidden fixed top-[80px] left-0 right-0 z-50 bg-white shadow-md h-[28px]">
        <div className="flex items-center h-full px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
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
          <h1 className="text-sm font-semibold ml-2 text-gray-700">
            Quiz Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex min-h-screen pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[108px] lg:top-0 left-0 h-[calc(100vh-108px)] lg:h-screen md:w-[450px] bg-white shadow-lg transform 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 pb-12 lg:pb-0`}
        >
          {/* Close button for mobile */}
          <div className="lg:hidden p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">Quiz Topics</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
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
          </div>

          {/* Sidebar Content */}
          <div className="overflow-y-auto h-full">
            {topicId && (
              <QuizSidebar
                quizTopicsDetails={quizTopicsDetails}
                setQuizTopicsDetails={setQuizTopicsDetails}
                setCurrentLevel={setCurrentLevel}
                setIsSidebarOpen={setIsSidebarOpen}
                topicId={topicId}
              />
            )}
          </div>
        </aside>

        {/* Main Content
        <main className="flex-1 px-4 lg:px-8 lg:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <QuizTypeSelection
                quizTopicsDetails={quizTopicsDetails}
                currentLevel={currentLevel}
                topicId={topicId}
              />
            </div>
          </div>
        </main> */}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden top-[108px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default TopicsDashboard;
