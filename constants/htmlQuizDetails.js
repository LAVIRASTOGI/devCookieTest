export const HTMLQuizDetails = {
  FreeQuiz: {
    description: "HTML concepts",
    key: "free",
    topic: [
      {
        quizName: "Basic HTML Assessment",
        id: "quizFree1",
        totalQuestions: 15,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: true,
      },
    ],
    totalTopics: 1,
    completedTopics: 0,
    subscribed: true,
  },
  Beginner: {
    description: "Master fundamental HTML concepts",
    key: "beginner",
    topic: [
      {
        quizName: "Intro to HTML",
        id: "quizBeginner1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Basic HTML Elements",
        id: "quizBeginner2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Tables and Semantic HTML",
        id: "quizBeginner3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
    ],
    totalTopics: 3,
    completedTopics: 0,
    cost: 100,
    subscribed: true,
  },
  Intermediate: {
    description: "Advance your HTML skills",
    key: "intermediate",
    topic: [
      {
        quizName: "Forms and User Inputs",
        id: "quizIntermediate1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Multimedia and Interactive Elements",
        id: "quizIntermediate2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Responsive Design and Accessibility",
        id: "quizIntermediate3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
    ],
    totalTopics: 3,
    completedTopics: 0,
    cost: 100,
    subscribed: true,
  },
  Advanced: {
    description: "Become an HTML expert",
    key: "advanced",
    topic: [
      {
        quizName: "SEO and Structured Data",
        id: "quizAdvanced1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "HTML5 and Web Storage",
        id: "quizAdvanced2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Advanced HTML Features",
        id: "quizAdvanced3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
      {
        quizName: "Complete HTML Assessment",
        id: "quizAdvanced4",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        progress: 0,
        active: false,
      },
    ],
    totalTopics: 4,
    completedTopics: 0,
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
