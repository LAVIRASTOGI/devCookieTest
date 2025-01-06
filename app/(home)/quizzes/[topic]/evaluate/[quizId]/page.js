"use client";

import dynamic from "next/dynamic";

import { useParams } from "next/navigation";
import LoadingQuiz from "../../../loadingQuiz";
import { userQuizEvaluation } from "@/lib/userQuizEvaluation";

const QuestionPage = dynamic(
  () => import("@/components/quiz/quizQuestion/QuestionPage"),
  {
    loading: () => <LoadingQuiz />,
  }
);

function EvaluationPage() {
  const params = useParams();
  const topic = params?.topic;
  const quizId = params?.quizId;
  const durationQuiz = "30";
  return (
    <div className="mt-20">
      <QuestionPage
        questions={userQuizEvaluation}
        durationQuiz={durationQuiz}
        quizId={quizId}
        topic={topic}
        isEvaluate={true}
      />
    </div>
  );
}

export default EvaluationPage;
