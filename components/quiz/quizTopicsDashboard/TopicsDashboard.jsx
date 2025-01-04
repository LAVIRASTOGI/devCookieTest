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
  return (
    <>
      <div className="flex  ">
        <div className="drawer lg:drawer-open w-auto ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center md:hidden ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open QuizDeatils
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {/* Sidebar content here */}

            {quizDetails?.id && (
              <QuizSidebar
                quizTopicsDetails={quizTopicsDetails}
                setQuizTopicsDetails={setQuizTopicsDetails}
                setCurrentLevel={setCurrentLevel}
              />
            )}
          </div>
        </div>
        <div className="flex-1 pt-10 ">
          <div className="flex flex-col gap-4 items-center">
            <QuizTypeSelection
              quizTopicsDetails={quizTopicsDetails}
              currentLevel={currentLevel}
              quizDetails={quizDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopicsDashboard;
