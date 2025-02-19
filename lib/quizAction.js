"use server";

import {
  fetchQuizSubscription,
  getQuizData,
  getQuizDetailsTopic,
  getQuizIdEvaluate,
  getQuizIdQuestions,
  postQuizSubscription,
  submitQuizData,
} from "@/services/quiz";

const { cookies } = require("next/headers");

async function getCookieValue() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}

export async function getQuizDetails() {
  try {
    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }

    const quizDetails = await getQuizData(token);
    if (quizDetails?.status === "success") {
      return {
        success: true,
        message: "Quiz Details Fetched Succesfully",
        data: quizDetails?.result,
      };
    } else {
      throw new Error(
        quizDetails?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

export async function getQuizTopicDetails(topicId) {
  try {
    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizDetails = await getQuizDetailsTopic(topicId, token);
    if (quizDetails?.status === "success") {
      return {
        success: true,
        message: "Quiz Fetched Succesfully",
        data: quizDetails?.result,
      };
    } else {
      throw new Error(
        quizDetails?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

//get quizId
export async function getQuestionQuizId(quizId, topicId) {
  try {
    let inputData = {
      skill: topicId,
      _id: quizId,
    };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    console.log("inputData", inputData);
    const quizDetails = await getQuizIdQuestions(inputData, token);
    if (quizDetails?.status === "success") {
      return {
        success: true,
        message: "Quiz Fetched Succesfully",
        data: quizDetails?.result[0],
      };
    } else {
      throw new Error(
        quizDetails?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

//get quizId
export async function getEvaluateQuizId(quizId, topicId) {
  try {
    let inputData = {
      questionId: quizId,
    };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizEvaluate = await getQuizIdEvaluate(inputData, token);
    console.log("quizEvaluate", quizEvaluate);
    if (quizEvaluate?.length) {
      return {
        success: true,
        message: "Quiz Answers Fetched Succesfully",
        data: quizEvaluate[0],
      };
    } else {
      throw new Error(
        quizEvaluate?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

//subscribe to quiz
export async function subscribeQuiz(topicId, levelSubsribed) {
  try {
    let inputData = {
      topicId: levelSubsribed,
    };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizSubscription = await postQuizSubscription(inputData, token);
    if (quizSubscription?.status === "success") {
      return {
        success: true,
        message: "Quiz Subscribed Succesfully",
        // data: quizSubscription?.result,
      };
    } else {
      throw new Error(
        quizSubscription?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

//get quiz Subscription
export async function getQuizSubscription(module, topicId) {
  try {
    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizSubscription = await fetchQuizSubscription(module, token);
    if (quizSubscription?.status === "success") {
      return {
        success: true,
        message: "Quiz Subscription Fetched Succesfully",
        data: quizSubscription?.result ? quizSubscription?.result[topicId] : {},
      };
    } else {
      throw new Error(
        quizSubscription?.error ||
          "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}

export async function submitQuiz(inputData) {
  try {
    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizDetails = await submitQuizData(inputData, token);
    if (quizDetails?.status === "success") {
      return {
        success: true,
        message: "Quiz Submitted Succesfully",
        data: quizDetails?.result,
      };
    } else {
      throw new Error(
        quizDetails?.error ||
          "Error occured While Submitting Quiz. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Fetching Details For the Quiz. Please Try After Sometime."
    );
  }
}
