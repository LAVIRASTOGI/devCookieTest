export const HTMLQuizDetails = {
  Beginner: {
    description: "Master fundamental HTML concepts",
    key: "beginner",
    topic: [
      {
        quizName: "Intro to HTML",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Basic HTML Elements",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Tables and Semantic HTML",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
    ],
    totalTopics: 3,
    completedTopics: 0,
    overallProgress: 0,
    cost: 100,
    subscribed: true,
  },
  Intermediate: {
    description: "Advance your HTML skills",
    key: "intermediate",
    topic: [
      {
        quizName: "Forms and User Inputs",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Multimedia and Interactive Elements",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Responsive Design and Accessibility",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
    ],
    totalTopics: 3,
    completedTopics: 0,
    overallProgress: 0,
    cost: 100,
    subscribed: false,
  },
  Advanced: {
    description: "Become an HTML expert",
    key: "advanced",
    topic: [
      {
        quizName: "SEO and Structured Data",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "HTML5 and Web Storage",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Advanced HTML Features",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
      {
        quizName: "Complete HTML Assessment",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
      },
    ],
    totalTopics: 4,
    completedTopics: 0,
    overallProgress: 0,
    cost: 100,
    subscribed: false,
  },
};

// Helper function to calculate overall progress
export const calculateProgress = (level) => {
  const totalQuestions = level.topic.reduce(
    (sum, quiz) => sum + quiz.totalQuestions,
    0
  );
  const completedQuestions = level.topic.reduce(
    (sum, quiz) => sum + quiz.completedQuestions,
    0
  );
  return totalQuestions > 0
    ? Math.round((completedQuestions / totalQuestions) * 100)
    : 0;
};

// Helper function to update quiz progress
export const updateQuizProgress = (level, quizIndex, completedQuestions) => {
  const quiz = level.topic[quizIndex];
  quiz.completedQuestions = completedQuestions;
  quiz.progress = Math.round((completedQuestions / quiz.totalQuestions) * 100);
  quiz.isCompleted = quiz.completedQuestions === quiz.totalQuestions;

  // Update level progress
  level.completedTopics = level.topic.filter((quiz) => quiz.isCompleted).length;
  level.overallProgress = calculateProgress(level);

  return level;
};
