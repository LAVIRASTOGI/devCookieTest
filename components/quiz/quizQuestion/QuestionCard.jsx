import { memo, useMemo, useCallback } from "react";
import Button from "@/components/uiComponents/Button";
import CorrectIcon from "../Icons/CorrectIcon";
import WrongIcon from "../Icons/WrongIcon";
import SelectedIcon from "../Icons/SelectedIcon";

const QuestionCard = memo(
  ({
    question,
    onAnswer,
    onNext,
    onPrevious,
    showPrevious,
    selectedAnswer,
    quizState,
    isEvaluate,
  }) => {
    // Memoize style calculation functions
    const getOptionStyle = useCallback(
      (option) => {
        if (!isEvaluate) {
          return selectedAnswer === option
            ? "border-primary bg-blue-50"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
        }

        if (option === question.correctAnswer) {
          return "border-green-500 bg-green-50";
        }

        if (selectedAnswer === option && option !== question.correctAnswer) {
          return "border-red-500 bg-red-50";
        }

        return "border-gray-200";
      },
      [isEvaluate, selectedAnswer, question.correctAnswer]
    );

    const getTextStyle = useCallback(
      (option) => {
        if (!isEvaluate) {
          return selectedAnswer === option ? "text-primary" : "text-gray-700";
        }

        if (option === question.correctAnswer) {
          return "text-green-700";
        }

        if (selectedAnswer === option && option !== question.correctAnswer) {
          return "text-red-700";
        }

        return "text-gray-700";
      },
      [isEvaluate, selectedAnswer, question.correctAnswer]
    );

    // Memoize option click handler
    const handleOptionClick = useCallback(
      (option, index) => {
        if (!isEvaluate) {
          onAnswer(option, index);
        }
      },
      [isEvaluate, onAnswer]
    );

    // Memoize icons

    // Memoize options rendering
    const renderOptions = useMemo(
      () => (
        <div className="space-y-4">
          {question.options.map((option, index) => {
            // const isCorrect = option === question.correctAnswer;
            const isCorrect = index + 1 === question.correctAnswer;
            const isWrong =
              isEvaluate && selectedAnswer === index + 1 && !isCorrect;
            // const isWrong =
            //   isEvaluate && selectedAnswer === option && !isCorrect;

            return (
              <div
                key={`${option}-${index}`}
                onClick={() => handleOptionClick(option, index + 1)}
                className={`p-4 rounded-lg border-2 transition-all
              ${
                isWrong ? "border-red-500 bg-red-50" : getOptionStyle(index + 1)
              }
              ${isEvaluate ? "cursor-not-allowed" : "cursor-pointer"}
            `}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg ${getTextStyle(index + 1)}`}>
                    {option}
                  </span>
                  {isEvaluate ? (
                    isCorrect ? (
                      <CorrectIcon />
                    ) : isWrong ? (
                      <WrongIcon />
                    ) : null
                  ) : (
                    selectedAnswer === index + 1 && <SelectedIcon />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ),
      [
        question.options,
        isEvaluate,
        selectedAnswer,
        handleOptionClick,
        getOptionStyle,
        getTextStyle,
      ]
    );

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {question.question}
          </h2>
          <p className="text-gray-500 text-sm">
            Select the best answer from the options below
          </p>
        </div>

        {renderOptions}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="gray"
            mobileSize="md"
            laptopSize="md"
            onClick={onPrevious}
            disabled={!showPrevious}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            mobileSize="md"
            laptopSize="md"
            className="text-white"
            disabled={!selectedAnswer && !isEvaluate}
            onClick={onNext}
          >
            {quizState.isLast ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </div>
    );
  }
);

export default QuestionCard;
