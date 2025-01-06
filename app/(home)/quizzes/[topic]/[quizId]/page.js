"use client";
import QuestionPage from "@/components/quiz/quizQuestion/QuestionPage";
import { questions } from "@/lib/questions";

import { useParams } from "next/navigation";

function QuizPage() {
  const params = useParams();
  const topic = params?.quizId;
  return (
    <div className="mt-20">
      <QuestionPage questions={questions} />
    </div>
  );
}

export default QuizPage;
