"use client";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ScoreCard from "./ScoreCard";

// Enhanced ProgressBar component
function ProgressBar({ current, total }) {
  const progressValue = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-primary">Progress</span>
        <span className="text-sm font-medium text-primary">
          {current}/{total} Questions
        </span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
}

function QuestionPage({ questions }) {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    answers: new Array(questions.length).fill(""),
    isComplete: false,
  });

  const handleNext = () => {
    if (quizState.currentQuestionIndex === questions.length - 1) {
      const score = questions.reduce((acc, question, index) => {
        return (
          acc + (quizState.answers[index] === question.correctAnswer ? 1 : 0)
        );
      }, 0);
      setQuizState({ ...quizState, score, isComplete: true });
    } else {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
      });
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answer;
    setQuizState({ ...quizState, answers: newAnswers });
  };

  const handlePrevious = () => {
    setQuizState({
      ...quizState,
      currentQuestionIndex: quizState.currentQuestionIndex - 1,
    });
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: new Array(questions.length).fill(""),
      isComplete: false,
    });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-primary bg-clip-text text-transparent">
              Quiz Time!
            </h1>
            <p className="mt-4 text-gray-600">
              Test your knowledge and challenge yourself
            </p>
          </div>

          {!quizState.isComplete ? (
            <div className="space-y-8">
              <ProgressBar
                current={quizState.currentQuestionIndex + 1}
                total={questions.length}
              />
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <QuestionCard
                  question={questions[quizState.currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  showPrevious={quizState.currentQuestionIndex > 0}
                  selectedAnswer={
                    quizState.answers[quizState.currentQuestionIndex]
                  }
                />
              </div>
            </div>
          ) : (
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <ScoreCard
                score={quizState.score}
                total={questions.length}
                onRestart={handleRestart}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
