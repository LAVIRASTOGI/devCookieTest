"use server";
import {
  mockInviteUser,
  signupUser,
  getUserProfile,
  forgotPasswordUser,
  updateUserProfile,
} from "@/services/user";
import { cookies } from "next/headers";

async function getCookieValue() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}
export async function mockInterviewInviteHandler(formData, specializations) {
  try {
    const {
      date,
      time,
      experienceLevel,
      notes,
      phoneNumber,
      email,
      name,
      planAmount,
    } = formData;

    let skills = specializations?.map((item) => item.title);

    let inputData = {
      name,
      emailId: email,
      yearsOfExperience: experienceLevel,
      phoneNumber,
      interview_date: date,
      interview_time: time,
      notes,
      planAmount: Number(planAmount) ? Number(planAmount) : 200,
      skills,
    };

    const userDetails = await mockInviteUser(inputData);
    if (userDetails?.success) {
      return {
        success: true,
        message: "Interview Details Submitted successfully",
        data: userDetails?.result,
      };
    } else {
      throw new Error(
        userDetails?.error ||
          "Error occured While Submiiting Form. Please Try After Sometime hhh"
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message ||
        "Error occured While Submiiting Form. Please Try After Sometime"
    );
  }
}

export async function signUpHandler(formData) {
  try {
    const {
      name,
      emailId,
      phoneNumber,
      username,
      password,
      skills,
      yearsOfExperience,
    } = formData;

    let inputData = {
      name,
      emailId,
      phoneNumber,
      username,
      password,
      skills,
      yearsOfExperience,
    };

    const signUpUserDetails = await signupUser(inputData);
    if (signUpUserDetails?.success) {
      return {
        success: true,
        message: "User signed up successfully",
        data: signUpUserDetails,
      };
    } else {
      throw new Error(
        signUpUserDetails?.error ||
          "Error occured While SignUp. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignUp. Please Try After Sometime"
    );
  }
}

export async function getUserProfileHandler() {
  try {
    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const userProfileResult = await getUserProfile(token);
    if (userProfileResult?.success) {
      return {
        success: true,
        message: "User Profile fetched successfully",
        data: userProfileResult?.result,
      };
    } else {
      throw new Error(
        userProfileResult?.error ||
          "Error occured While SignIn. Please Try After Sometime"
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignIn. Please Try After Sometime"
    );
  }
}

export async function forgotPasswordHandler(formData) {
  try {
    const { emailId, password } = formData;

    let inputData = {
      emailId,
      password,
    };

    const userDetails = await forgotPasswordUser(inputData);
    if (userDetails?.success) {
      return {
        success: true,
        message: "Password Reset Successfully",
        data: userDetails?.result,
      };
    } else {
      throw new Error(
        userDetails?.error ||
          "Error occured While SignUp. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignUp. Please Try After Sometime"
    );
  }
}

export async function updateProfileHandler(formData) {
  try {
    const {
      name,
      phoneNumber,
      username,
      yearsOfExperience,
      role,
      location,
      skills,
      linkedIn,
    } = formData;

    let inputData = {
      name,
      phoneNumber,
      username,
      yearsOfExperience,
      role,
      location,
      skills,
      linkedIn,
    };

    const token = await getCookieValue();
    if (!token) {
      return {
        success: false,
        message: "User is not Authorized,Please login again.",
      };
    }
    const userDetails = await updateUserProfile(inputData, token);
    if (userDetails?.success) {
      return {
        success: true,
        message: "Profile updated Succesfully",
        data: userDetails?.result,
      };
    } else {
      throw new Error(
        userDetails?.error ||
          "Error occured While SignUp. Please Try After Sometime."
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignUp. Please Try After Sometime"
    );
  }
}
