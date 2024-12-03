"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CheckboxField, InputField, RadioField } from "../Formfeild";
import { SKILL_LEVELS, SPECIALIZATIONS } from "@/constants/formConfig";
import {
  checkboxSkillValidation,
  experienceValidation,
} from "@/utils/commonValidation";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Button from "../uiComponents/Button";
import { mockInterviewGenerate } from "@/lib/mockInterviewAIaction";

function AIForm() {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      skillFeild: "beginner",
      yearsOfExperience: user?.yearsOfExperience ? user.yearsOfExperience : 1,
      specializations: [], // Initialize as empty array
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!data.specializations || data.specializations.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }
    // router.push(`/mock-interview-ai/instructions`);
    setIsLoading(true);
    try {
      let mockid = await mockInterviewGenerate("", data, user);
      mockid = mockid || 1234;
      router.push(`/mock-interview-ai/${mockid}`);
      toast.success("Starting your interview...");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Error occurred While Form Submission. Please Try After Sometime"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors) => {
    console.error("Form validation errors:", errors);
    toast.error("Please fill in all required fields correctly");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        id="bookingForm"
        className="space-y-6"
        noValidate
      >
        <div className="space-y-4">
          <RadioField
            register={register}
            name="skillFeild"
            label="Skill Level"
            options={SKILL_LEVELS}
            error={errors.skillFeild?.message}
          />

          <CheckboxField
            register={register}
            name="specializations"
            label="Select Skills (Choose one or more) *"
            options={SPECIALIZATIONS}
            error={errors.specializations?.message}
            {...register("specializations", checkboxSkillValidation)}
          />

          <InputField
            register={register}
            name="yearsOfExperience"
            type="number"
            label="Years of Experience *"
            error={errors.yearsOfExperience?.message}
            placeholder="Enter Year of Experience"
            disabled={isLoading}
            {...register("yearsOfExperience", experienceValidation)}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <span>Starting Interview...</span>
          ) : (
            <span>Start Interview</span>
          )}
        </Button>
      </form>
    </div>
  );
}

export default AIForm;
