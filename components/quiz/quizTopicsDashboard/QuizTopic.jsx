import { memo } from "react";

const QuizTopic = memo(({ quiz, isLocked, onActive }) => (
  <div
    onClick={!isLocked ? () => onActive(quiz?.toppicId) : null}
    className={`rounded-lg p-2 lg:p-3 transition-all 
      ${quiz?.active ? "bg-blue-100" : "bg-white"}
      ${
        isLocked
          ? "cursor-not-allowed opacity-75"
          : "hover:shadow-md cursor-pointer hover:bg-gray-300"
      }`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-xs lg:text-sm font-medium text-gray-800">
        {quiz.quizName}
      </h4>
      <span className="text-[10px] lg:text-xs text-gray-500">
        {quiz?.isCompleted ? quiz.totalQuestions : 0}/{quiz.totalQuestions}
      </span>
    </div>

    <div className="w-full h-1 lg:h-1.5 bg-gray-100 rounded-full">
      <div
        className={`h-full rounded-full transition-all duration-300 ${
          isLocked ? "bg-gray-400" : "bg-primary"
        }`}
        style={{
          width: `${quiz?.isCompleted ? 100 : 0}%`,
        }}
      />
    </div>

    <div className="flex items-center justify-between mt-2">
      <span className="text-[10px] lg:text-xs text-gray-500">
        {quiz?.isCompleted ? 100 : 0}% Complete
      </span>
    </div>
  </div>
));
export default QuizTopic;
