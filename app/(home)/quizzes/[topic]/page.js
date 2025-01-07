"use client";

import { useParams } from "next/navigation";
import LoadingQuiz from "../loadingQuiz";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const TopicsDashboard = dynamic(
  () => import("@/components/quiz/quizTopicsDashboard/TopicsDashboard"),
  {
    loading: () => <LoadingQuiz />,
  }
);

export default function TopicPage() {
  const params = useParams();
  const topic = params?.topic;
  if (!topic) {
    return <LoadingQuiz />;
  }
  

  return (
    <div className="mt-20">
      <Suspense fallback={<LoadingQuiz />}>
        <TopicsDashboard topic={topic} />
      </Suspense>
    </div>
  );
}
