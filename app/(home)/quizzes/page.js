import QuizTopicCard from "@/components/quiz/QuizTopicCard";
import { quizTopics } from "@/constants/quizTopic";
import React, { Suspense } from "react";
import LoadingQuiz from "./loadingQuiz";

function QuizzesPage() {
  return (
    <>
      <Suspense fallback={<LoadingQuiz />}>
        <main className="min-h-screen bg-background p-8 mt-20">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center text-primary">
              Quiz Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {quizTopics.map((topic) => (
                <QuizTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        </main>
      </Suspense>
    </>
  );
}

export default QuizzesPage;
