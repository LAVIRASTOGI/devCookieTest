export let HTMLQuizDetails = {
  FreeQuiz: {
    description: "Introduction to Core HTML Concepts",
    key: "free",
    topics: [
      {
        quizName: "Basic HTML Assessment",
        description: "A foundational quiz on key HTML concepts for beginners.",
        id: "quizFree1",
        totalQuestions: 15,
        completedQuestions: 0,
        isCompleted: false,
        active: true,
        duration: "15 minutes",
      },
    ],
    totalTopics: 1,
    completedTopics: 0,
    subscribed: true,
  },

  Beginner: {
    description: "Master the Basics of HTML",
    key: "beginner",
    topics: [
      {
        quizName: "Intro to HTML",
        description: "Learn about HTML structure and essential tags.",
        id: "quizBeginner1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Basic HTML Elements",
        description:
          "Understand core elements such as headings, paragraphs, and links.",
        id: "quizBeginner2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Tables and Semantic HTML",
        description:
          "Explore tables, forms, and semantic tags for better document structure.",
        id: "quizBeginner3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
    ],
   
    cost: 100,
    subscribed: true,
  },

  Intermediate: {
    description: "Enhance Your HTML Skills",
    key: "intermediate",
    topics: [
      {
        quizName: "Forms and User Inputs",
        description:
          "Dive deep into forms, input fields, and validation techniques.",
        id: "quizIntermediate1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Multimedia and Interactive Elements",
        description:
          "Learn about multimedia elements like audio and video, and interactive elements such as buttons.",
        id: "quizIntermediate2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Responsive Design and Accessibility",
        description:
          "Understand responsive design principles and improve HTML accessibility.",
        id: "quizIntermediate3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
    ],
    totalTopics: 3,
    completedTopics: 0,
    cost: 100,
    subscribed: false,
  },

  Advanced: {
    description: "Master Advanced HTML Techniques",
    key: "advanced",
    topics: [
      {
        quizName: "SEO and Structured Data",
        description: "Learn about the role of SEO and structured data in HTML.",
        id: "quizAdvanced1",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "HTML5 and Web Storage",
        description: "Master HTML5 features and web storage methods.",
        id: "quizAdvanced2",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Advanced HTML Features",
        description:
          "Explore advanced HTML5 features like video, audio, and canvas.",
        id: "quizAdvanced3",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "20 minutes",
      },
      {
        quizName: "Complete HTML Assessment",
        description:
          "A comprehensive quiz covering all HTML topics, from basics to advanced.",
        id: "quizAdvanced4",
        totalQuestions: 10,
        completedQuestions: 0,
        isCompleted: false,
        active: false,
        duration: "25 minutes",
      },
    ],
    totalTopics: 4,
    completedTopics: 0,
    cost: 100,
    subscribed: false,
  },
  fullCourse: {
    cost: 200,
    subscribed: false,
  },
};
