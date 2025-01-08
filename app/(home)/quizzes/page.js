import QuizTopicCard from "@/components/quiz/QuizTopicCard";
import { getQuizDetails } from "@/lib/quizAction";

export const dynamic = "force-dynamic";
export default async function QuizzesPage() {
  try {
    const quizDetails = await getQuizDetails();
    const quizTopics = quizDetails?.data || [];

    if (!quizTopics.length) {
      return <div>No quizzes available.</div>;
    }
    return (
      <>
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
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background p-8 mt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error?.message}</p>
          <a
            href="/"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
          >
            Pleae retry after Sometime
          </a>
        </div>
      </div>
    );
  }
}
