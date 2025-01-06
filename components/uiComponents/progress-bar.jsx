function ProgressBar({ current, total }) {
  const progressValue = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-primary">Progress</span>
        <span className="text-sm font-medium text-primary">
          {current}/{total} Questions
        </span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
