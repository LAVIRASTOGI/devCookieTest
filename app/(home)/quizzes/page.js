"use client";
import QuizTopicCard from "@/components/quiz/QuizTopicCard";
import React, { Suspense, useEffect, useState } from "react";
import LoadingQuiz from "./loadingQuiz";
import { getQuizDetails } from "@/lib/quizAction";

function QuizzesPage() {
  const [quizTopics, setQuizTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizTopics = async () => {
      try {
        setLoading(true);
        const quizDetails = await getQuizDetails();
        const data = quizDetails?.data;
        setQuizTopics(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quiz topics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizTopics();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 mt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingQuiz />}>
        <main className="min-h-screen bg-background p-8 mt-20">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center text-primary">
              Quiz Dashboard
            </h1>
            {loading ? (
              <LoadingQuiz />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {quizTopics.map((topic) => (
                  <QuizTopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            )}
          </div>
        </main>
      </Suspense>
    </>
  );
}

export default QuizzesPage;
