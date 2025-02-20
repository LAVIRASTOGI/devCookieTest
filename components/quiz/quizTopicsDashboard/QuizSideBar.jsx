import { useMemo, useCallback, memo } from "react";
import PaymentRazorPay from "@/components/payment/PaymentRazorPay";
import { useUser } from "@/contexts/userContext";
import QuizTopic from "./QuizTopic";
import { quizDetails } from "@/constants/quizDetails";
import { subscribeQuiz } from "@/lib/quizAction";
import LockIcon from "@/components/quiz/Icons/LockIcon";
import PaymentButton from "@/components/uiComponents/PaymentButton";

const QuizLevelHeader = memo(({ level, isLocked, levelData }) => (
  <div className="flex items-center justify-between mb-2 lg:mb-3">
    <div className="flex items-center gap-2">
      <h3 className="text-base lg:text-lg font-semibold text-gray-700 capitalize">
        {level}
      </h3>
      {level !== "free" && (
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
      {levelData?.completedCount ?? 0}/{levelData?.topics?.length ?? 0} Complete
    </span>
  </div>
));

function QuizSidebar({
  quizTopicsDetails,
  setQuizTopicsDetails,
  setCurrentLevel,
  setIsSidebarOpen,
  topicId,
}) {
  const { user } = useUser();

  const isLevelLocked = useMemo(() => {
    return (level, quizTopicsDetails) => {
      if (level === "free") return false;
      return !quizTopicsDetails?.["subscribed"];
    };
  }, []);

  const allLevelLocked = useMemo(() => {
    return () => {
      if (!Object.keys(quizTopicsDetails)?.length) return false;
      const relevantLevels = Object.entries(quizTopicsDetails).filter(
        ([key]) => !["free", "fullCourse"].includes(key)
      );
      console.log("relevantLevels", relevantLevels);
      return relevantLevels.every(([_, data]) => !data.subscribed);
    };
  }, [quizTopicsDetails]);

  const isCompletedQuiz = useMemo(
    () => (quizTopicsArr) => {
      if (!quizTopicsArr?.length) return 0;
      return quizTopicsArr.filter((quiz) => quiz.completed).length;
    },
    []
  );

  const activeCurrentQuizHandler = useCallback(
    (quizId) => {
      setQuizTopicsDetails((prev) => {
        const newQuizTopicDetails = { ...prev };

        Object.entries(newQuizTopicDetails).forEach(([level, data]) => {
          if (level !== "fullCourse" && data.topics) {
            data.topics.forEach((quiz) => {
              if (quiz.toppicId === quizId) {
                quiz.active = true;
                setCurrentLevel(level);
                setIsSidebarOpen(false);
              } else {
                quiz.active = false;
              }
            });
          }
        });

        return newQuizTopicDetails;
      });
    },
    [setCurrentLevel, setIsSidebarOpen]
  );

  const handleUnlockAll = useCallback(
    async (isPayment, level) => {
      if (!isPayment) return;

      const levelSubscribed =
        level === "fullCourse"
          ? Object.keys(quizTopicsDetails).filter(
              (l) => l !== "free" && l !== "fullCourse"
            )
          : [level];

      try {
        let subscriptions = [levelSubscribed];
        if (levelSubscribed == "fullCourse") {
          subscriptions = ["beginner", "intermediate", "expert"];
        }
        let inputData = {
          role: "user",
          skills: [topicId],
          section: "quiz",
          subscriptions,
        };
        const subscribedData = await subscribeQuiz(inputData);
        if (subscribedData?.success) {
          setQuizTopicsDetails((prev) => ({
            ...prev,
            ...Object.fromEntries(
              levelSubscribed.map((l) => [l, { ...prev[l], subscribed: true }])
            ),
          }));
        }
      } catch (error) {
        console.error("Subscription failed:", error);
      }
    },
    [topicId, quizTopicsDetails, setQuizTopicsDetails]
  );

  const renderLockStatus = useMemo(() => {
    if (allLevelLocked()) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs lg:text-sm font-medium bg-amber-100 text-amber-800">
          <LockIcon />
          Free Trial
        </span>
      );
    }
    return (
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
    );
  }, [allLevelLocked]);

  return (
    <div className="menu bg-base-200 min-h-full w-full p-3 lg:p-4">
      <div className="mb-4 lg:mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
            HTML Course
          </h2>
          {renderLockStatus}
        </div>
        <div className="h-1 w-16 lg:w-20 bg-primary rounded" />
      </div>

      {allLevelLocked() && (
        <div className="mb-6">
          <PaymentRazorPay
            handlePayment={(isPayment) =>
              handleUnlockAll(isPayment, "fullCourse")
            }
            sucessMsg="Quiz Subscribed Successfully. Please Start giving quiz."
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

      {Object.entries(quizTopicsDetails)
        .filter(([level]) => level !== "fullCourse")
        .map(([level, levelData]) => {
          const isLocked = isLevelLocked(level, levelData);

          return (
            <div
              key={level}
              className={`mb-4 lg:mb-6 ${isLocked ? "opacity-75" : ""}`}
            >
              <QuizLevelHeader
                level={level}
                isLocked={isLocked}
                levelData={{
                  ...levelData,
                  completedCount: isCompletedQuiz(levelData?.topics),
                }}
              />

              <div className="text-xs lg:text-sm text-gray-600 mb-3">
                <p>{quizDetails?.[topicId]?.[level]?.description}</p>
              </div>

              <div className="space-y-2">
                {levelData?.topics?.map((quiz, index) => (
                  <QuizTopic
                    key={`${quiz.toppicId}-${index}`}
                    quiz={quiz}
                    isLocked={isLocked}
                    onActive={activeCurrentQuizHandler}
                  />
                ))}
              </div>

              {isLocked && level !== "free" && (
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
                      sucessMsg="Quiz Subscribed Successfully. Please Start giving quiz."
                      amount={levelData.cost}
                      user={user}
                      buttonName={<PaymentButton buttonName={`Unlock Level`} />}
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
