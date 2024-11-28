"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Suspense, useCallback, useMemo, useState } from "react";
import { SkillsAutocomplete } from "@/components/SkillsAutocomplete";
import { signUpHandler } from "@/lib/userAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  emailValidation,
  experienceValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from "@/utils/commonValidation";
import Button from "@/components/uiComponents/Button";
import { InputField } from "@/components/Formfeild";
import SignUpHeader from "@/components/SignUpHeader";
import Loading from "@/app/loading";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      emailId: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPassword: "",
      skills: [],
      yearsOfExperience: "",
    },
  });

  const confirmPasswordValidation = {
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      await signUpHandler(data);
      toast.success("Form submitted successfully and user is Signed Up.");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Error occurred While SignUp. Please Try After Sometime"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <SignUpHeader />

      <Suspense fallback={<Loading />}>
        {/* Right Section with Form */}
        <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen">
          <div className="w-full max-w-md mx-auto p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary">
                  Create Your Account
                </h2>
                <p className="mt-2 text-gray-600">
                  Begin your learning adventure with us
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
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
                    <span className="font-medium">{authError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <InputField
                    register={register}
                    name="name"
                    type="text"
                    label="Full Name *"
                    error={errors.name?.message}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    {...register("name", nameValidation)}
                  />

                  <InputField
                    register={register}
                    name="emailId"
                    type="email"
                    label="Email *"
                    error={errors.emailId?.message}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    {...register("emailId", emailValidation)}
                  />

                  <InputField
                    register={register}
                    name="phoneNumber"
                    type="tel"
                    label="Phone Number *"
                    error={errors.phoneNumber?.message}
                    placeholder="Your contact number"
                    disabled={isLoading}
                    {...register("phoneNumber", phoneValidation)}
                  />

                  <InputField
                    register={register}
                    name="username"
                    type="text"
                    label="Choose Username *"
                    error={errors.username?.message}
                    placeholder="Select a unique username"
                    disabled={isLoading}
                    {...register("username", usernameValidation)}
                  />

                  <div className="form-control w-full">
                    <label className="label font-bold">
                      <span className="text-lg">Skills</span>
                    </label>
                    <SkillsAutocomplete
                      control={control}
                      name="skills"
                      className="input-primary"
                    />
                  </div>

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

                  <InputField
                    register={register}
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password *"
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                    {...register("confirmPassword", confirmPasswordValidation)}
                  />

                  <InputField
                    register={register}
                    name="yearsOfExperience"
                    type="number"
                    label="Years of Experience *"
                    error={errors.yearsOfExperience?.message}
                    placeholder="Your years of experience"
                    disabled={isLoading}
                    {...register("yearsOfExperience", experienceValidation)}
                  />

                  <div className="pt-6 flex flex-col md:flex-row gap-4 justify-end">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                      mobileSize="md"
                      laptopSize="md"
                      className="w-full"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2 justify-center">
                          {/* <span className="loading loading-spinner loading-md"></span> */}
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                      onClick={resetForm}
                      mobileSize="md"
                      laptopSize="md"
                      className="w-full"
                    >
                      Reset Form
                    </Button>
                  </div>
                </form>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="text-primary hover:text-primary-focus transition-colors duration-300 font-semibold"
                  >
                    Sign in here
                  </a>
                </p>
                <p className="mt-2">
                  By creating an account, you agree to DevReady Academy's{" "}
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
      </Suspense>
    </main>
  );
}
