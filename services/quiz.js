import { HTMLQuizDetails } from "@/constants/htmlQuizDetails";
import { quizTopics } from "@/constants/quizTopic";
import axiosInstance from "@/lib/axiosInstance";
import { quizQuestion } from "@/lib/questions";
import { userQuizEvaluation } from "@/lib/userQuizEvaluation";

export const getQuizDetailsTopic = async (data, token) => {
  try {
    //   const response = await axiosInstance.post("/updateProfile", data, {
    //     token,
    //   });
    //   return response.data;

    return {
      success: true,
      result: HTMLQuizDetails,
    };
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during signup";

    console.error("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status,
    };
  }
};

export const getQuizData = async (data, token) => {
  try {
    //   const response = await axiosInstance.post("/updateProfile", data, {
    //     token,
    //   });
    //   return response.data;

    return {
      success: true,
      result: quizTopics,
    };
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during signup";

    console.error("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status,
    };
  }
};

export const getQuizIdQuestions = async (data, token) => {
  try {
    //   const response = await axiosInstance.post("/updateProfile", data, {
    //     token,
    //   });
    //   return response.data;

    return {
      success: true,
      result: quizQuestion,
    };
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Fetching Quiz Data";

    console.error("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status,
    };
  }
};

export const getQuizIdEvaluate = async (data, token) => {
  try {
    //   const response = await axiosInstance.post("/updateProfile", data, {
    //     token,
    //   });
    //   return response.data;

    return {
      success: true,
      result: userQuizEvaluation,
    };
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Fetching Quiz Data";

    console.error("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status,
    };
  }
};
