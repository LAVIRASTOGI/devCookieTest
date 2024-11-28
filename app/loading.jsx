// app/loading.jsx
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
