import QuestionPage from "@/components/quiz/quizQuestion/QuestionPage";
import { getEvaluateQuizId } from "@/lib/quizAction";

export const dynamic = "force-dynamic";

export default async function EvaluationPage({ params }) {
  try {
    const { topic, quizId } = await params;
    const quizDetailsTopicData = await getEvaluateQuizId(quizId, topic);
    const quizEvaluation = quizDetailsTopicData?.data || [];

    if (!Object.keys(quizEvaluation?.answer)?.length) {
      return <div>No Evaluation for Quiz. It will be available soon.</div>;
    }
    return (
      <>
        <main className="min-h-screen bg-background  mt-20">
          <QuestionPage
            questions={quizEvaluation?.answer}
            durationQuiz={quizEvaluation?.duration}
            quizId={quizEvaluation?.id}
            topic={topic}
            isEvaluate={true}
          />
        </main>
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background mt-20 flex items-center justify-center">
        <div className="text-center flex flex-col gap-2">
          <p className="text-red-600 text-lg mb-4">Error: {error?.message}</p>
          <a
            href="/"
            className="bg-primary text-white px-6 py-5 rounded-lg hover:bg-primary-dark"
          >
            Pleae retry after Sometime
          </a>
        </div>
      </div>
    );
  }
}
