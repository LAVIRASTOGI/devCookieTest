import TopicsDashboard from "@/components/quiz/quizTopicsDashboard/TopicsDashboard";
import { getQuizSubscription, getQuizTopicDetails } from "@/lib/quizAction";
export const dynamic = "force-dynamic";

export default async function TopicPage({ params }) {
  try {
    const { topic } = await params;
    const quizDetailsTopicData = await getQuizTopicDetails(topic);
    const quizSubscription = await getQuizSubscription(topic);
    const quizDetailsTopic = quizDetailsTopicData?.data || [];

    if (!Object.keys(quizDetailsTopic)?.length) {
      return <div>No quizzes available.</div>;
    }
    return (
      <>
        <main className="min-h-screen bg-background  mt-20">
          {Object.keys(quizDetailsTopic)?.length && (
            <TopicsDashboard
              topicId={topic}
              quizDetailsTopic={quizDetailsTopic}
              quizSubscription={quizSubscription?.data}
            />
          )}
        </main>
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background p-8 mt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error?.message}</p>
        </div>
      </div>
    );
  }
}
