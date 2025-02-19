"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import ScoreCard from "./ScoreCard";
import ProgressBar from "@/components/uiComponents/progress-bar";
import Timer from "./Timer";
import { useRouter } from "next/navigation";
import LoadingQuiz from "@/app/(home)/quizzes/loadingQuiz";
import { submitQuiz } from "@/lib/quizAction";
import toast from "react-hot-toast";

const QuestionPage = memo(
  ({ questions, durationQuiz, quizId, topic, isEvaluate = false }) => {
    const router = useRouter();

    // Memoize initial state
    const initialState = useMemo(
      () => ({
        currentQuestionIndex: 0,
        score: 0,
        answers: new Array(questions.length).fill(""),
        isLast: false,
        isComplete: false,
        timeExpired: false,
      }),
      [questions.length]
    );

    // Use state with memoized initial value
    const [quizState, setQuizState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    // Reset loading state on mount
    useEffect(() => {
      setIsLoading(false);
    }, []);

    // Memoize score calculation
    const calculateScore = useCallback(
      (answers) => {
        return questions.reduce(
          (acc, question, index) =>
            acc + (answers[index] === question.correctAnswer ? 1 : 0),
          0
        );
      },
      [questions]
    );

    // Optimize handlers with useCallback
    const handleTimeUp = useCallback(() => {
      const score = calculateScore(quizState.answers);
      setQuizState((prev) => ({
        ...prev,
        score,
        isComplete: true,
        timeExpired: true,
      }));
    }, [calculateScore, quizState.answers]);

    // submit quiz
    const finishQuizHandler = async (score) => {
      setIsLoading(true);
      const finalAnswer = quizState.answers.map((answer, index) => {
        return {
          serial_no: index + 1,
          option: answer,
        };
      });
      let inputData = {
        questionId: quizId,
        skill: topic,
        answer: finalAnswer,
        is_completed: true,
        totalMarks: score,
      };
      try {
        const submitQuizData = await submitQuiz(inputData);
        if (submitQuizData?.success) toast.success(submitQuizData?.message);
        else
          toast.error(
            "Error occured While Submitting Quiz. Please Try After Sometime."
          );
      } catch (error) {
        console.error("Error occured While Submitting Quiz:", error);
        toast.error(
          error.message ||
            "Error occured While Submitting Quiz. Please Try After Sometime."
        );
      } finally {
        setIsLoading(false);
      }
    };

    const handleNext = useCallback(() => {
      const isLastQues =
        quizState.currentQuestionIndex === questions.length - 1;
      if (isLastQues) {
        const score = calculateScore(quizState.answers);
        finishQuizHandler(score);
        setQuizState((prev) => ({
          ...prev,
          score,
          isComplete: true,
        }));

        return;
      }
      setQuizState((prev) => {
        const isLast = prev.currentQuestionIndex === questions.length - 2;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          isLast,
        };
      });
    }, [questions.length, calculateScore, quizState]);

    const handleAnswer = useCallback((answer, indexAnswer) => {
      setQuizState((prev) => {
        const newAnswers = [...prev.answers];
        newAnswers[prev.currentQuestionIndex] = indexAnswer;
        return { ...prev, answers: newAnswers };
      });
    }, []);

    const handlePrevious = useCallback(() => {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        isLast: false,
      }));
    }, []);

    const handleRestart = useCallback(() => {
      setQuizState(initialState);
    }, [initialState]);

    const evaluateHandler = useCallback(() => {
      setIsLoading(true);
      router.push(`/quizzes/${topic}/evaluate/${quizId}`);
    }, [router, topic, quizId]);

    // Memoize current question
    const currentQuestion = useMemo(
      () => questions[quizState.currentQuestionIndex],
      [questions, quizState.currentQuestionIndex]
    );

    // Memoize progress props
    const progressProps = useMemo(
      () => ({
        current: quizState.currentQuestionIndex + 1,
        total: questions.length,
      }),
      [quizState.currentQuestionIndex, questions.length]
    );

    // Memoize question card props
    const questionCardProps = useMemo(
      () => ({
        question: currentQuestion,
        onAnswer: handleAnswer,
        onNext: handleNext,
        onPrevious: handlePrevious,
        showPrevious: quizState.currentQuestionIndex > 0,
        selectedAnswer: quizState.answers[quizState.currentQuestionIndex],
        quizState,
        isEvaluate,
      }),
      [
        currentQuestion,
        handleAnswer,
        handleNext,
        handlePrevious,
        quizState,
        isEvaluate,
      ]
    );

    // Memoize score card props
    const scoreCardProps = useMemo(
      () => ({
        score: quizState.score,
        total: questions.length,
        onRestart: handleRestart,
        timeExpired: quizState.timeExpired,
        onEvaluate: evaluateHandler,
      }),
      [
        quizState.score,
        questions.length,
        handleRestart,
        quizState.timeExpired,
        evaluateHandler,
      ]
    );

    return (
      <>
        {isLoading && <LoadingQuiz />}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="relative min-h-screen">
            {/* Timer */}
            {!quizState.isComplete && !isEvaluate && (
              <Timer duration={durationQuiz} onTimeUp={handleTimeUp} />
            )}

            {/* Background Effects */}
            <BackgroundEffects />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-2">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <QuizHeader />

                {/* Quiz Content */}
                {!quizState.isComplete || isEvaluate ? (
                  <div className="space-y-8 py-8">
                    {/* Progress Bar */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <ProgressBar {...progressProps} />
                    </div>

                    {/* Question Card */}
                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <QuestionCard {...questionCardProps} />
                    </div>
                  </div>
                ) : (
                  <div className="transform transition-all duration-300 hover:scale-[1.01] py-8">
                    <ScoreCard {...scoreCardProps} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

// Memoized background effects component
const BackgroundEffects = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
    </div>
  </div>
));

// Memoized quiz header component
const QuizHeader = memo(() => (
  <div className="text-center mt-4">
    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
      Quiz Time!
    </h1>
    <p className="mt-4 text-gray-600 text-lg">
      Test your knowledge and challenge yourself
    </p>
  </div>
));

export default QuestionPage;
