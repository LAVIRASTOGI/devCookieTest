import { cssQuizDetails } from "./cssQuizDetails";
import { HTMLQuizDetails } from "./htmlQuizDetails";
import { javaScriptQuizDetails } from "./JavascriptQuizDetails";
import { reactQuizDetails } from "./reactQuizDetails";

export const quizTopics = [
  {
    id: "html",
    title: "HTML Quiz",
    description:
      "Learn HTML5 structure, semantic elements, forms, and multimedia integration. Perfect for building strong web development foundations.",
    quizCount: 10,
    beginner: "1-3",
    intermediate: "4-6",
    advanced: "7-10",
    icon: "/images/HtmlCSS.jpg",
    href: "/quizzes/html",
    completedQuizzes: 0,
    quizTopicsDetails: HTMLQuizDetails,
  },
  {
    id: "css",
    title: "CSS Quiz",
    description:
      "Master CSS layouts, flexbox, grid, animations, and responsive design. Enhance your styling skills for modern web applications.",
    quizCount: 10,
    beginner: "1-3",
    intermediate: "4-6",
    advanced: "7-10",
    icon: "/images/HtmlCSS.jpg",
    href: "/quizzes/css",
    completedQuizzes: 0,
    quizTopicsDetails: cssQuizDetails,
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "/images/JavaScript.png",
    description:
      "Explore core concepts like async programming, DOM manipulation, and ES6+ features. Build interactive and dynamic web applications.",
    quizCount: 15,
    beginner: "1-4",
    intermediate: "4-10",
    advanced: "10-15",
    href: "/quizzes/javascript",
    completedQuizzes: 0,
    quizTopicsDetails: javaScriptQuizDetails,
  },
  {
    id: "react",
    title: "React",
    icon: "/images/react.png",
    description:
      "Learn component architecture, hooks, state management, and React best practices. Create efficient and scalable user interfaces.",
    quizCount: 15,
    beginner: "1-4",
    intermediate: "4-10",
    advanced: "10-15",
    href: "/quizzes/react",
    completedQuizzes: 0,
    quizTopicsDetails: reactQuizDetails,
  },
];
