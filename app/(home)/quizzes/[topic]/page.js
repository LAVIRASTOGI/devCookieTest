import TopicsDashboard from "@/components/quiz/quizTopicsDashboard/TopicsDashboard";
import { getQuizTopicDetails } from "@/lib/quizAction";
export const dynamic = "force-dynamic";

export default async function TopicPage({ params }) {
  try {
    const { topic } = await params;
    const quizDetailsTopicData = await getQuizTopicDetails(topic);
    const quizDetailsTopic = quizDetailsTopicData?.data || [];

    if (!Object.keys(quizDetailsTopic)?.length) {
      return <div>No quizzes available.</div>;
    }
    return (
      <>
        <main className="min-h-screen bg-background  mt-20">
          <TopicsDashboard
            topicId={topic}
            quizDetailsTopic={quizDetailsTopic}
          />
        </main>
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background p-8 mt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error?.message}</p>
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
}
