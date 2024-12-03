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

function AIForm() {
  const { user } = useUser();
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

    setIsLoading(true);
    try {
      //   await mockInterviewInviteHandler(data, specializations);
      toast.success("Starting your interview...");
      //   onFormSubmit(data);
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#467ac0] text-white rounded-md hover:bg-[#3b69a8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
        >
          {isLoading ? (
            <span>Starting Interview...</span>
          ) : (
            <span>Start Interview</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default AIForm;
