export function ProgressBar({ current, total }) {
  const progressValue = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8 flex flex-col items-center">
      <progress
        className="progress progress-white w-56"
        value={progressValue}
        max="100"
      ></progress>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Question {current} of {total}
      </p>
    </div>
  );
}
