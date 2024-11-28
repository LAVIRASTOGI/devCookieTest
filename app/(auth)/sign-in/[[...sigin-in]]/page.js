"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { signInHandler } from "@/lib/action";
import toast from "react-hot-toast";
import { useUser } from "@/contexts/userContext";
import {
  emailOrUsernameValidation,
  passwordValidation,
} from "@/utils/commonValidation";
import Button from "@/components/uiComponents/Button";
import { InputField } from "@/components/Formfeild";
import SignUpHeader from "@/components/SignUpHeader";
import Loading from "@/app/loading";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_username: "devguruzone",
      password: "Lavi1993@",
    },
  });

  const handleSignupRedirect = () => {
    router.push("/sign-up");
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const response = await signInHandler(data);
      if (response?.success === false) {
        toast.error(response?.message);
        setAuthError(
          response?.message || "Authentication failed. Please try again."
        );
        return;
      }
      if (response.success) {
        login(response?.result);
        toast.success("Successfully signed in! Welcome back.");
      }

      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        window.location.href = callbackUrl;
      } else {
        window.location.href = "/";
      }
      // router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Unable to sign in. Please verify your credentials and try again."
      );
      setAuthError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Suspense fallback={<Loading />}>
        <SignUpHeader />
      </Suspense>

      {/* Right Section with Sign In Form */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen">
        <div className="w-full max-w-md mx-auto ">
          <div className="w-full max-w-md space-y-4 md:space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-bold text-primary">Sign In</h2>
              <p className="mt-2 text-gray-600">Access your learning journey</p>
            </div>

            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
              <div className="p-4">
                {authError && (
                  <div className="alert alert-error mb-6 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium break-all">{authError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <InputField
                    register={register}
                    name="email_username"
                    type="text"
                    label="Email or Username *"
                    error={errors.email_username?.message}
                    placeholder="Enter your email or username"
                    disabled={isLoading}
                    {...register("email_username", emailOrUsernameValidation)}
                  />
                  <InputField
                    register={register}
                    name="password"
                    type="password"
                    label="Password *"
                    error={errors.password?.message}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    {...register("password", passwordValidation)}
                  />

                  <div className="mt-4 text-sm text-right">
                    <a
                      href="/forgot-password"
                      className="text-primary hover:text-primary-focus transition-colors duration-300"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <div className="py-6 flex flex-col md:flex-row gap-4 md:justify-end">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                      mobileSize="md"
                      laptopSize="md"
                      className="text-white w-full"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2 justify-center">
                          {/* <span className="loading loading-spinner loading-md"></span> */}
                          Signing in...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                      onClick={handleSignupRedirect}
                      mobileSize="md"
                      laptopSize="md"
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>
                By signing in, you agree to DevReady Academy's{" "}
                <a
                  href="/terms"
                  className="text-primary hover:text-primary-focus transition-colors duration-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary-focus transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
