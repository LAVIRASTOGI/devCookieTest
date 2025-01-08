"use client";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ScoreCard from "./ScoreCard";
import ProgressBar from "@/components/uiComponents/progress-bar";
import Timer from "./Timer";
import { useRouter } from "next/navigation";

function QuestionPage({
  questions,
  durationQuiz,
  quizId,
  topic,
  isEvaluate = false,
}) {
  const router = useRouter();
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    answers: new Array(questions.length).fill(""),
    isLast: false,
    isComplete: false,
    timeExpired: false,
  });

  const handleTimeUp = () => {
    const score = questions.reduce((acc, question, index) => {
      return (
        acc + (quizState.answers[index] === question.correctAnswer ? 1 : 0)
      );
    }, 0);
    setQuizState({ ...quizState, score, isComplete: true, timeExpired: true });
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex === questions.length - 1) {
      const score = questions.reduce((acc, question, index) => {
        return (
          acc + (quizState.answers[index] === question.correctAnswer ? 1 : 0)
        );
      }, 0);
      setQuizState({ ...quizState, score, isComplete: true });
    } else {
      let isLast = false;
      if (quizState.currentQuestionIndex === questions.length - 2) {
        isLast = true;
      }
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
        isLast: isLast,
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
      isLast: false,
    });
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: new Array(questions.length).fill(""),
      isComplete: false,
      timeExpired: false,
    });
  };

  const evaluateHandler = () => {
    router.push(`/quizzes/${topic}/evaluate/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="relative min-h-screen">
        {/* Timer */}
        {!quizState.isComplete && !isEvaluate && (
          <Timer duration={durationQuiz} onTimeUp={handleTimeUp} />
        )}

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-2">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mt-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Quiz Time!
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Test your knowledge and challenge yourself
              </p>
            </div>

            {/* Quiz Content */}
            {!quizState.isComplete || isEvaluate ? (
              <div className="space-y-8 py-8">
                {/* Progress Bar */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <ProgressBar
                    current={quizState.currentQuestionIndex + 1}
                    total={questions.length}
                  />
                </div>

                {/* Question Card */}
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
                    quizState={quizState}
                    isEvaluate={isEvaluate}
                  />
                </div>
              </div>
            ) : (
              <div className="transform transition-all duration-300 hover:scale-[1.01] py-8">
                <ScoreCard
                  score={quizState.score}
                  total={questions.length}
                  onRestart={handleRestart}
                  timeExpired={quizState.timeExpired}
                  onEvaluate={evaluateHandler}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
