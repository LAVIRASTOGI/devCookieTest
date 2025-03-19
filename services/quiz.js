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

    console.log("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
    };
  }
};

export const getQuizData = async (token) => {
  try {
    const response = await axiosInstance.get("/quiz/quizDetailsForUser", {
      token,
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error?.message ||
      "An unexpected error occurred during fetching Data";

    console.log("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
      data: error.response?.data,
    };
  }
};
export const fetchQuizSubscription = async (module, token) => {
  console.log("module", module);
  try {
    const response = await axiosInstance.get(
      `/getUserSubscriptionValue/${module}`,
      {
        token,
      }
    );
    return response?.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred while fetching Data";

    console.log("Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
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

    console.log("Error:", {
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

export const submitQuizData = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/quiz/insertUserQuizResponse",
      data,
      {
        token,
      }
    );
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Submitting Quiz Data";

    console.log("Error:", {
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
    const response = await axiosInstance.post("/quiz/evaluateQuiz", data, {
      token,
    });
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Fetching Quiz Data";

    console.log("Error:", {
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
    const response = await axiosInstance.post(
      "/insertUserSubscriptionValue",
      data,
      {
        token,
      }
    );
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Fetching Quiz Data";

    console.log("Error:", {
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
