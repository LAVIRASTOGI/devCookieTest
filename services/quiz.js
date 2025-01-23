import { quizSubscription } from "@/constants/quizDetails";
import axiosInstance from "@/lib/axiosInstance";
import { userQuizEvaluation } from "@/lib/userQuizEvaluation";

export const getQuizDetailsTopic = async (skill, token) => {
  try {
    const response = await axiosInstance.get(`/quiz/quizDescription/${skill}`, {
      token,
    });
    return response.data;
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

export const getQuizData = async (token) => {
  try {
    console.log("responseee", token);
    const response = await axiosInstance.get("/quiz/quizDetailsForUser", {
      token,
    });
    console.log("response", token);
    return response.data;

    // return {
    //   success: true,
    //   result: quizTopics,
    // };
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
export const fetchQuizSubscription = async (topicId, token) => {
  try {
    // const response = await axiosInstance.get("/quiz/quizDetailsForUser", {
    //   token,
    // });
    // return response.data;
    return {
      status: "success",
      result: quizSubscription["html"],
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
    const response = await axiosInstance.post("/quiz/getQuestions", data, {
      token,
    });
    return response.data;
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
export const postQuizSubscription = async (data, token) => {
  try {
    // const response = await axiosInstance.post("/quiz/quizSubscription", data, {
    //   token,
    // });
    // return response.data;
    return {
      status: "success",
      result: "subscribed",
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
