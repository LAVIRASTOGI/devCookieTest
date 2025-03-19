import axiosInstance from "@/lib/axiosInstance";

export const signInUser = async (data) => {
  try {
    const response = await axiosInstance.post("/signin", data, {
      withCredentials: "include",
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during signin";

    console.error("Error signing in:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status,
    };
  }
};

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during signup";

    console.error("Error signing up:", {
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

export const forgotPasswordUser = async (data) => {
  try {
    const response = await axiosInstance.patch("/forgotPassword", data);
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
export const updateUserProfile = async (data, token) => {
  try {
    const response = await axiosInstance.post("/updateProfile", data, {
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
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get("/getUserProile", {
      token, // Pass the token here
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
      data: error.response?.data,
    };
  }
};
export const mockInviteUser = async (data) => {
  try {
    const response = await axiosInstance.post("/mockInvite", data);
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Form Submission";

    console.error("Error during Form Submission:", {
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

export const mockInterviewUserMail = async (data) => {
  try {
    const response = await axiosInstance.post("/submitForm", data);
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Sending mail";

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

export const getInterviewerDetailsData = async () => {
  try {
    const response = await axiosInstance.get("/getInterviewerDetails");
    console.log("response", response?.data);
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during Fetching Details";

    console.error("Fetching Details:", {
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
