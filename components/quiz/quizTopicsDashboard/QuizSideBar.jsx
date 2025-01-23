import { useMemo, useCallback, memo } from "react";
import PaymentRazorPay from "@/components/payment/PaymentRazorPay";

import { useUser } from "@/contexts/userContext";
import QuizTopic from "./QuizTopic";
import { quizDetails } from "@/constants/quizDetails";
import { subscribeQuiz } from "@/lib/quizAction";
import LockIcon from "@/components/uiComponents/LockIcon";

function QuizSidebar({
  quizTopicsDetails,
  setQuizTopicsDetails,
  setCurrentLevel,
  setIsSidebarOpen,
  topicId,
}) {
  const { user } = useUser();
  const paymentButtonName = (buttonName) => {
    return (
      <>
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
        <span className="lg:mt-1">{buttonName}</span>
      </>
    );
  };
  const isLevelLocked = useMemo(
    () => (level, quizTopicsDetails) => {
      const levels = ["freeQuiz", "beginner", "intermediate", "expert"];
      const currentLevelIndex = levels.indexOf(level);
      if (currentLevelIndex === 0) return false;
      return !quizTopicsDetails?.["subscribed"];
    },
    []
  );
  const allLevelLocked = () => {
    if (Object.keys(quizTopicsDetails)?.length) {
      let newquizTopicsDetails = { ...quizTopicsDetails };
      delete newquizTopicsDetails["freeQuiz"];
      delete newquizTopicsDetails["fullCourse"];
      let value = Object.keys(newquizTopicsDetails)?.every(
        (level) => !newquizTopicsDetails[level].subscribed
      );
      return value;
    }
  };

  const isCompletedQuiz = useCallback((quizTopicsArr) => {
    return (
      quizTopicsArr?.length &&
      quizTopicsArr.reduce(
        (count, quiz) => (quiz.completed ? count + 1 : count),
        0
      )
    );
  }, []);

  const activeCurrentQuizHandler = (quizId) => {
    setQuizTopicsDetails((prev) => {
      const newQuizTopicDetails = { ...prev };

      // First, set all quizzes in all levels to inactive
      Object.keys(newQuizTopicDetails).forEach((level) => {
        if (level !== "fullCourse") {
          // Skip the fullCourse property
          newQuizTopicDetails[level].topics.forEach((quiz) => {
            quiz.active = false;
          });
        }
      });

      // Then find and activate the target quiz
      for (const level in newQuizTopicDetails) {
        if (level === "fullCourse") continue; // Skip the fullCourse property

        const topics = newQuizTopicDetails[level].topics;
        const targetQuiz = topics.find((quiz) => quiz.toppicId === quizId);

        if (targetQuiz) {
          setCurrentLevel(level);
          setIsSidebarOpen(false);
          targetQuiz.active = true;
          break;
        }
      }

      return newQuizTopicDetails;
    });
  };

  const handleUnlockAll = async (isPayment, level) => {
    let levelSubscribed = [];
    if (isPayment) {
      if (level == "fullCourse") {
        levelSubscribed = Object.keys(quizTopicsDetails).filter(
          (level) => level !== "freeQuiz" || level !== "fullCourse"
        );
      } else {
        levelSubscribed = [level];
      }
      const subscribedData = await subscribeQuiz(topicId, levelSubscribed);
      if (subscribedData?.success) {
        setQuizTopicsDetails((prev) => {
          const newQuizTopicDetails = { ...prev };
          levelSubscribed.forEach((level) => {
            newQuizTopicDetails[level].subscribed = true;
          });
          return newQuizTopicDetails;
        });
      }
    }
  };

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
          {allLevelLocked() ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs lg:text-sm font-medium bg-amber-100 text-amber-800">
              <LockIcon />
              Free Trial
            </span>
          ) : (
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
          )}
        </div>
        <div className="h-1 w-16 lg:w-20 bg-primary rounded" />
      </div>

      {allLevelLocked() && (
        <div className="mb-6">
          <PaymentRazorPay
            handlePayment={(isPayment) =>
              handleUnlockAll(isPayment, "fullCourse")
            }
            sucessMsg={
              "Quiz Subscribed Successfully . Please Start giving quiz."
            }
            amount={quizTopicsDetails["fullCourse"]?.cost || 400}
            user={user}
            buttonName={
              <PaymentButton
                buttonName={`Unlock All Levels ₹${
                  quizTopicsDetails["fullCourse"]?.cost || 400
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
                  <PaymentRazorPay
                    handlePayment={(isPayment) =>
                      handleUnlockAll(isPayment, level)
                    }
                    sucessMsg={
                      "Quiz Subscribed Successfully . Please Start giving Quizzes."
                    }
                    amount={levelData.cost}
                    user={user}
                    buttonName={paymentButtonName("Unlock Now")}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(QuizSidebar);
