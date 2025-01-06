"use client";

import { questions } from "@/lib/questions";
import dynamic from "next/dynamic";

import { useParams } from "next/navigation";
import LoadingQuiz from "../../loadingQuiz";

const QuestionPage = dynamic(
  () => import("@/components/quiz/quizQuestion/QuestionPage"),
  {
    loading: () => <LoadingQuiz />,
  }
);

function QuizPage() {
  const params = useParams();
  const topic = params?.quizId;
  const durationQuiz = "30";
  return (
    <div className="mt-20">
      <QuestionPage questions={questions} durationQuiz={durationQuiz} />
    </div>
  );
}

export default QuizPage;
