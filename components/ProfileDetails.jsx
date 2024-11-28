// components/ProfileDetails.jsx
"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaBriefcase,
  FaClock,
  FaPencilAlt,
  FaSave,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import { InputField } from "@/components/Formfeild";
import {
  emailValidation,
  experienceValidation,
  nameValidation,
  phoneValidation,
  usernameValidation,
} from "@/utils/commonValidation";
import { SkillsAutocomplete } from "./SkillsAutocomplete";
import { updateProfileHandler } from "@/lib/userAction";
import { useUser } from "@/contexts/userContext";

function ProfileDetails({ userData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { ...userData, skills: userData?.skills || [] } || {},
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { login } = useUser();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateProfileHandler(data);
      login(response?.data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.message ||
          "Error occurred while updating profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors) => {
    console.error("Form validation errors:", errors);
    toast.error("Please fill in all required fields correctly");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 text-primary py-2">
      <Icon className="text-lg sm:text-xl flex-shrink-0" />
      <h3 className="text-base sm:text-lg font-semibold whitespace-nowrap">
        {title}
      </h3>
      <div className="hidden sm:block flex-grow border-b border-gray-200 ml-2"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-8 sm:mt-24">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-8 border-b mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4  sm:mb-0">
                <FaUserCircle className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {userData?.name || "Your Profile"}
                </h2>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                  <FaEnvelope className="mr-2" />
                  <span className="text-sm sm:text-base break-all">
                    {userData?.emailId}
                  </span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`btn ${
                isEditing ? "btn-error text-white" : "btn-primary"
              } rounded-xl flex items-center gap-2 w-full sm:w-auto`}
            >
              {isEditing ? (
                <>
                  <FaTimes /> Cancel
                </>
              ) : (
                <>
                  <FaPencilAlt /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 sm:space-y-8"
            noValidate
          >
            {/* Personal Information */}
            <div className="space-y-4 sm:space-y-6 ">
              <SectionHeader icon={FaUser} title="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  register={register}
                  name="name"
                  label="Full Name"
                  inputClassName="disabled:text-black"
                  icon={<FaUser className="text-gray-400" />}
                  error={errors.name?.message}
                  placeholder="Enter your full name"
                  disabled={!isEditing || isLoading}
                  {...register("name", nameValidation)}
                />

                <InputField
                  register={register}
                  name="username"
                  label="Username"
                  inputClassName="disabled:text-black"
                  icon={<FaUser className="text-gray-400" />}
                  error={errors.username?.message}
                  placeholder="Choose a username"
                  disabled={true}
                  {...register("username", usernameValidation)}
                />

                <InputField
                  register={register}
                  name="emailId"
                  type="email"
                  label="Email Address"
                  inputClassName="disabled:text-black"
                  icon={<FaEnvelope className="text-gray-400" />}
                  error={errors.emailId?.message}
                  placeholder="Enter your email"
                  disabled={true}
                  {...register("emailId", emailValidation)}
                />

                <InputField
                  register={register}
                  name="phoneNumber"
                  type="tel"
                  label="Phone Number"
                  inputClassName="disabled:text-black"
                  icon={<FaPhone className="text-gray-400" />}
                  error={errors.phoneNumber?.message}
                  placeholder="Enter your phone number"
                  disabled={!isEditing || isLoading}
                  {...register("phoneNumber", phoneValidation)}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4 sm:space-y-6">
              <SectionHeader
                icon={FaBriefcase}
                title="Professional Information"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  register={register}
                  name="yearsOfExperience"
                  type="number"
                  inputClassName="disabled:text-black"
                  label="Years of Experience"
                  icon={<FaClock className="text-gray-400" />}
                  error={errors.yearsOfExperience?.message}
                  placeholder="Enter years of experience"
                  disabled={!isEditing || isLoading}
                  {...register("yearsOfExperience", experienceValidation)}
                />
                <InputField
                  register={register}
                  name="role"
                  label="Current Role"
                  inputClassName="disabled:text-black"
                  icon={<FaBriefcase className="text-gray-400" />}
                  error={errors.role?.message}
                  placeholder="e.g. Software Engineer"
                  disabled={!isEditing || isLoading}
                  {...register("role")}
                />

                <InputField
                  register={register}
                  name="location"
                  label="Location"
                  inputClassName="disabled:text-black"
                  icon={<FaMapMarkerAlt className="text-gray-400" />}
                  error={errors.location?.message}
                  placeholder="City, Country"
                  disabled={!isEditing || isLoading}
                  {...register("location")}
                />

                <div className="md:col-span-2">
                  <SkillsAutocomplete
                    control={control}
                    name="skills"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 sm:space-y-6">
              <SectionHeader icon={FaLinkedin} title="Social Links" />
              <div className="grid grid-cols-1">
                <InputField
                  register={register}
                  name="linkedIn"
                  type="url"
                  inputClassName="disabled:text-black"
                  label="LinkedIn Profile"
                  icon={<FaLinkedin className="text-gray-400" />}
                  error={errors.linkedIn?.message}
                  placeholder="https://linkedin.com/in/username"
                  disabled={!isEditing || isLoading}
                  {...register("linkedIn")}
                />
              </div>
            </div>

            {/* Form Actions */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    reset(userData);
                    setIsEditing(false);
                  }}
                  className="btn btn-outline btn-error rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto"
                  disabled={isLoading}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-primary text-white rounded-xl hover:bg-primary-dark flex items-center justify-center gap-2 w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner">Saving...</span>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
