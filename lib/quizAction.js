"use server";

import { getQuizData, getQuizDetailsTopic } from "@/services/quiz";

const { cookies } = require("next/headers");

async function getCookieValue() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}

//all quiz deatails API 1 (HTML,CSS,JS,React)
// [ { id: "html",
//     quizCount: 10,
//     beginner: "1-3",
//     intermediate: "4-6",
//     advanced: "7-10",
//     completedQuizzes: 0,}]
export async function getQuizDetails() {
  try {
    // let inputData = {
    //   userDetails: userDetails,
    // };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }

    const quizDetails = await getQuizData(token);
    if (quizDetails?.success) {
      return {
        success: true,
        message: "Quiz Fetched Succesfully",
        data: quizDetails?.result,
      };
    } else {
      throw new Error(
        userDetails?.error ||
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

//get topic wise deatails (beg , inernediate and advance and also)//htmlquizDeatils format1
export async function getQuizTopicDetails(topicId) {
  try {
    let inputData = {
      topic: topicId,
      //   userDetails: userDetails,
    };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const quizDetails = await getQuizDetailsTopic(inputData, token);
    if (quizDetails?.success) {
      return {
        success: true,
        message: "Quiz Fetched Succesfully",
        data: quizDetails?.result,
      };
    } else {
      throw new Error(
        userDetails?.error ||
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
