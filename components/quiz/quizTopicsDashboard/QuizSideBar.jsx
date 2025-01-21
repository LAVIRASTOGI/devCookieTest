import { useMemo, useCallback, memo } from "react";
import PaymentRazorPay from "@/components/payment/PaymentRazorPay";

import { useUser } from "@/contexts/userContext";
import QuizTopic from "./QuizTopic";
import { quizDetails } from "@/constants/quizDetails";

const LockIcon = memo(() => (
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
));

function QuizSidebar({
  quizTopicsDetails,
  setQuizTopicsDetails,
  setCurrentLevel,
  setIsSidebarOpen,
  topicId,
}) {
  const { user } = useUser();

  const isLevelLocked = useMemo(
    () => (level, quizTopicsDetails) => {
      const levels = ["freeQuiz", "beginner", "intermediate", "expert"];
      const currentLevelIndex = levels.indexOf(level);
      if (currentLevelIndex === 0) return false;
      return !quizTopicsDetails?.["subscribed"];
    },
    []
  );

  const isCompletedQuiz = useCallback((quizTopicsArr) => {
    return (
      quizTopicsArr?.length &&
      quizTopicsArr.reduce(
        (count, quiz) => (quiz.completed ? count + 1 : count),
        0
      )
    );
  }, []);

  const activeCurrentQuizHandler = useCallback(
    (quizId) => {
      setQuizTopicsDetails((prev) => {
        const newQuizTopicDetails = { ...prev };
        for (const level in newQuizTopicDetails) {
          const topics = newQuizTopicDetails[level].topics;
          const targetQuiz = topics.find((quiz) => quiz.id === quizId);
          if (targetQuiz) {
            setCurrentLevel(level);
            setIsSidebarOpen(false);
            topics.forEach((quiz) => {
              quiz.active = quiz.id === quizId;
            });
            break;
          }
        }
        return newQuizTopicDetails;
      });
    },
    [setCurrentLevel, setIsSidebarOpen, setQuizTopicsDetails]
  );

  const handleUnlockAll = useCallback(() => {
    console.log("Unlock all levels");
  }, []);

  const PaymentButton = memo(({ buttonName }) => (
    <>
      <LockIcon />
      <span className="mt-1">{buttonName}</span>
    </>
  ));

  const QuizLevelHeader = memo(({ level, isLocked, levelData }) => (
    <div className="flex items-center justify-between mb-2 lg:mb-3">
      <div className="flex items-center gap-2">
        <h3 className="text-base lg:text-lg font-semibold text-gray-700 capitalize">
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
        {isLocked && <LockIcon />}
      </div>
      <span className="text-xs lg:text-sm text-gray-500">
        {isCompletedQuiz(levelData?.topics)}/{levelData?.topics?.length}{" "}
        Complete
      </span>
    </div>
  ));

  return (
    <div className="menu bg-base-200 min-h-full w-full p-3 lg:p-4">
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
              <LockIcon />
              Free Trial
            </span>
          )}
        </div>
        <div className="h-1 w-16 lg:w-20 bg-primary rounded" />
      </div>

      {!quizTopicsDetails["fullCourse"]?.subscribed && (
        <div className="mb-6">
          <PaymentRazorPay
            handlePayment={handleUnlockAll}
            amount={quizTopicsDetails["fullCourse"]?.cost || 200}
            user={user}
            buttonName={
              <PaymentButton
                buttonName={`Unlock All Levels ₹${
                  quizTopicsDetails["fullCourse"]?.cost || 200
                }`}
              />
            }
          />
          <p className="text-center text-sm text-gray-600 mt-2">
            Get unlimited access to all premium content
          </p>
        </div>
      )}

      {Object.entries(quizTopicsDetails).map(([level, levelData]) => {
        const isLocked = isLevelLocked(level, levelData);
        if (level === "fullCourse") return null;

        return (
          <div
            key={level}
            className={`mb-4 lg:mb-6 ${isLocked ? "opacity-75" : ""}`}
          >
            <QuizLevelHeader
              level={level}
              isLocked={isLocked}
              levelData={levelData}
            />

            <div className="text-xs lg:text-sm text-gray-600 mb-3">
              <p>{quizDetails?.[topicId]?.[level]?.description}</p>
            </div>

            <div className="space-y-2">
              {levelData?.topics &&
                levelData?.topics.map((quiz, index) => (
                  <QuizTopic
                    key={index}
                    quiz={quiz}
                    isLocked={isLocked}
                    onActive={activeCurrentQuizHandler}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(QuizSidebar);
