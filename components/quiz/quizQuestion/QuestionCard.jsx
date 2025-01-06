import Button from "@/components/uiComponents/Button";

function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  showPrevious,
  selectedAnswer,
}) {
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
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer
              ${
                selectedAnswer === option
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswer(option)}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
              />
              <div
                className={`ml-6 text-lg ${
                  selectedAnswer === option ? "text-primary" : "text-gray-700"
                }`}
              >
                {option}
              </div>
            </div>
          </label>
        ))}
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
          disabled={!selectedAnswer}
          onClick={onNext}
        >
          {question.isLast ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </div>
  );
}

export default QuestionCard;
