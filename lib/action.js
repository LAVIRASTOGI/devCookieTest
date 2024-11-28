"use server";
import { signInUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function signInHandler(formData) {
  try {
    const { email_username, password } = formData;
    let inputData = {
      email_username,
      password,
    };

    // Second API call to signin endpoint
    const signinResponse = await signInUser(inputData);

    console.log("signin response data", signinResponse);

    if (signinResponse.success) {
      // Set cookies if signin was successful
      const cookieStore = await cookies();
      cookieStore.set("token", signinResponse.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 24 hours
      });

      return {
        success: true,
        result: signinResponse.result,
        message: "Login successful",
        token: signinResponse.token,
      };
    } else {
      console.log("signin response data", signinResponse.message);
      return {
        success: false,
        message: signinResponse.message || "Login failed",
      };
      //   throw new Error("Signin failed");
    }
  } catch (error) {
    console.log("message catch", error);
    throw new Error("Error occurred While SignIn. Please Try After Sometime");
  }
}

export async function signOutHandler() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
}

export async function mockIdGenerate() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const id1 =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log("idyyyyyyyyyy", id1);
  return {
    id: id1.toString(),
  };
}
