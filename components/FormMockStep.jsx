"use client";
import { TIME_SLOTS, EXPERIENCE_LEVELS, PLANS } from "@/constants/formConfig";
import { mockInterviewInviteHandler } from "@/lib/userAction";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { DatePickerFeild, InputField, SelectField } from "./Formfeild";
import {
  dateValidation,
  emailValidation,
  experienceLevelValidation,
  nameValidation,
  phoneValidation,
  planAmountValidation,
  timeValidation,
} from "@/utils/commonValidation";
import { maxDate, minDate } from "@/utils/commonFunction";
import moment from "moment";

function FormMockStep({
  specializations,
  formData,
  onFormSubmit,
  handleBack,
  closeModal,
  interviewerDetails,
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: formData,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const selectedDate = watch("date");
  const getDisabledTimeSlots = () => {
    if (!selectedDate) return TIME_SLOTS;
    const selectedDateTime = moment(selectedDate).format("YYYY-MM-DD");
    const dateSlots =
      interviewerDetails?.dateSlot &&
      interviewerDetails?.dateSlot.find(
        (item) => item.date === selectedDateTime
      );
    if (dateSlots) {
      const timeSlots = TIME_SLOTS.map((slot) => {
        let isDisabled = false;
        if (dateSlots?.slot) {
          dateSlots.slot.forEach((time) => {
            if (time === slot.value) {
              isDisabled = true;
            }
          });
        }
        return { ...slot, disabled: isDisabled };
      });
      return timeSlots;
    }

    return TIME_SLOTS;
  };

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

        <DatePickerFeild
          register={register}
          name="date"
          type="date"
          label="Preferred Date *"
          error={errors.date?.message}
          disabled={isLoading}
          control={control}
          min={minDate()}
          max={maxDate(15)}
          {...register("date", dateValidation)}
        />

        <SelectField
          register={register}
          name="time"
          label="Preferred Time *"
          error={errors.time?.message}
          options={getDisabledTimeSlots()}
          disabled={isLoading || !selectedDate}
          {...register("time", {
            ...timeValidation,
            validate: (value) => {
              const selectedSlot = getDisabledTimeSlots().find(
                (slot) => slot.value === value
              );
              if (selectedSlot?.disabled) {
                return "This time slot is not available";
              }
              return true;
            },
          })}
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
