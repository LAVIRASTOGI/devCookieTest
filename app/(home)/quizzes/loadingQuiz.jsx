export default function LoadingQuiz() {
  return (
    <div className="fixed inset-0 bg-gray-500/50  h-[100vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 text-center">
        <div className="w-16 h-16 mx-auto">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500">
          Please wait while we prepare your Quiz content
        </p>
      </div>
    </div>
  );
}
