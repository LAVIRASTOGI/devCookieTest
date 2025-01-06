import Button from "@/components/uiComponents/Button";

function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  showPrevious,
  selectedAnswer,
  quizState,
  isEvaluate,
}) {
  const getOptionStyle = (option) => {
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
  };

  const getTextStyle = (option) => {
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
  };

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

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isCorrect = option === question.correctAnswer;
          const isWrong =
            isEvaluate && question?.selectedAnswer === option && !isCorrect;

          return (
            <div
              key={index}
              onClick={() => !isEvaluate && onAnswer(option)}
              className={`p-4 rounded-lg border-2 transition-all
                ${isWrong ? "border-red-500 bg-red-50" : getOptionStyle(option)}
                ${isEvaluate ? "cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg ${getTextStyle(option)}`}>
                  {option}
                </span>
                {isEvaluate ? (
                  isCorrect ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : isWrong ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500"
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
                  ) : null
                ) : (
                  selectedAnswer === option && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

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

export default QuestionCard;
