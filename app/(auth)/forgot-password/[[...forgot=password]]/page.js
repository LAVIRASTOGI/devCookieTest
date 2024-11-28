"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "@/utils/commonValidation";
import { toast } from "react-hot-toast";
import Button from "@/components/uiComponents/Button";
import Link from "next/link";
import { forgotPasswordHandler } from "@/lib/userAction";
import { InputField } from "@/components/Formfeild";

export default function ForgotPassword() {
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
      emailId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      await forgotPasswordHandler(data);
      toast.success("Password reset successful!");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error.message || "Unable to reset password. Please try again."
      );
      setAuthError(error.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPasswordValidation = {
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        {/* Logo and Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
            <Image
              src="/logo/logoLight.png"
              alt="DevReady Academy Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email and choose a new password
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            name="password"
            type="password"
            label="New Password *"
            error={errors.password?.message}
            placeholder="Enter new password"
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
          {authError && (
            <div className="text-sm text-error bg-error/10 px-4 py-3 rounded-lg">
              {authError}
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            mobileSize="md"
            laptopSize="md"
            className="text-white w-full"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="text-center">
          <Link href={"/sign-in"} className="btn btn-link text-sm">
            Back to Login
          </Link>
        </div>
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              href={"/sign-up"}
              className="font-medium text-primary hover:text-primary-focus transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
