import QuestionPage from "@/components/quiz/quizQuestion/QuestionPage";
import { getQuestionQuizId } from "@/lib/quizAction";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }) {
  try {
    const { topic, quizId } = await params;
    const quizDetailsTopicData = await getQuestionQuizId(quizId, topic);
    console.log(quizDetailsTopicData);
    const quizQuestion = quizDetailsTopicData?.data || [];

    if (!Object.keys(quizQuestion?.questions)?.length) {
      return <div>Quiz for this topic will be available soon.</div>;
    }
    return (
      <>
        <main className="min-h-screen bg-background  mt-20">
          <QuestionPage
            questions={quizQuestion?.questions}
            durationQuiz={quizQuestion?.duration}
            quizId={quizQuestion?.id}
            topic={topic}
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
