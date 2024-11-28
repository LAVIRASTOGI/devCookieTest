"use client";
import { TIME_SLOTS, EXPERIENCE_LEVELS, PLANS } from "@/constants/formConfig";
import { mockInterviewInviteHandler } from "@/lib/userAction";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { InputField, SelectField } from "./Formfeild";
import {
  dateValidation,
  emailValidation,
  experienceLevelValidation,
  nameValidation,
  phoneValidation,
  planAmountValidation,
  timeValidation,
} from "@/utils/commonValidation";

function FormMockStep({
  specializations,
  formData,
  onFormSubmit,
  handleBack,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: formData,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Validate date before submission
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Please select a future date");
        return;
      }

      await mockInterviewInviteHandler(data, specializations);
      toast.success(
        "Form submitted successfully. Our Team will contact you soon."
      );
      onFormSubmit(data);
      reset(); // Reset form after successful submission
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
    // Handle validation errors
    console.error("Form validation errors:", errors);
    toast.error("Please fill in all required fields correctly");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        Interview Details for{" "}
        {specializations?.map((item) => item.title).join(", ")}
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        id="bookingForm"
        className="space-y-4"
        noValidate
      >
        <InputField
          register={register}
          name="name"
          label="Name *"
          error={errors.name?.message}
          placeholder="Enter your full name"
          disabled={isLoading}
          {...register("name", nameValidation)}
        />

        <InputField
          register={register}
          name="email"
          type="email"
          label="Email *"
          error={errors.email?.message}
          placeholder="Enter your email"
          disabled={isLoading}
          {...register("email", emailValidation)}
        />

        <InputField
          register={register}
          name="phoneNumber"
          type="tel"
          label="Phone Number *"
          error={errors.phoneNumber?.message}
          placeholder="Enter your phone number"
          disabled={isLoading}
          {...register("phoneNumber", phoneValidation)}
        />

        <InputField
          register={register}
          name="date"
          type="date"
          label="Preferred Date *"
          error={errors.date?.message}
          disabled={isLoading}
          min={new Date().toISOString().split("T")[0]}
          {...register("date", dateValidation)}
        />

        <SelectField
          register={register}
          name="time"
          label="Preferred Time *"
          error={errors.time?.message}
          options={TIME_SLOTS}
          disabled={isLoading}
          {...register("time", timeValidation)}
        />

        <SelectField
          register={register}
          name="experienceLevel"
          label="Experience Level *"
          error={errors.experienceLevel?.message}
          options={EXPERIENCE_LEVELS}
          disabled={isLoading}
          {...register("experienceLevel", experienceLevelValidation)}
        />

        <SelectField
          register={register}
          name="planAmount"
          label="Select Plan *"
          error={errors.planAmount?.message}
          options={PLANS}
          disabled={isLoading}
          {...register("planAmount", planAmountValidation)}
        />

        <InputField
          register={register}
          name="additionalNotes"
          type="textarea"
          label="Additional Notes (Optional)"
          error={errors.additionalNotes?.message}
          placeholder="Any specific requirements or questions?"
          disabled={isLoading}
          {...register("additionalNotes")}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={isLoading || isSubmitting}
            onClick={handleBack}
            className="btn md:w-32 btn-outline border-primary text-primary hover:text-white hover:bg-primary rounded-xl"
          >
            Back
          </button>

          <button
            type="button"
            disabled={isLoading || isSubmitting}
            onClick={closeModal}
            className="btn md:w-32 btn-outline border-primary text-primary hover:text-white hover:bg-primary rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn md:w-32 bg-primary rounded-xl text-white hover:bg-primary-dark"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <span className="loading loading-spinner">Submitting ...</span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormMockStep;
