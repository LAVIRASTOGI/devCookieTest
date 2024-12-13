"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { getInterviewerSlots } from "@/lib/userAction";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";

const FormMockStep = dynamic(() => import("./FormMockStep"), {
  loading: () => <Loading />,
});

const PaymentStep = dynamic(() => import("./Payment"), {
  loading: () => <Loading />,
});

const SpecializationStep = dynamic(() => import("./SpecializationStep"), {
  loading: () => <Loading />,
});
const initialFormData = {
  date: "",
  time: "",
  experienceLevel: "Beginner (0-2 years)",
  notes: "",
  phoneNumber: "",
  email: "",
  name: "",
  planAmount: 200,
};

const headingsData = [
  "Select Specialization",
  "Personal Information",
  "Complete Payment",
];

const SpecializationModalContent = ({ closeModal, isOpen, planAmount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [interviewerDetails, setInterviewerDetails] = useState({});
  const { user } = useUser();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSpecializations([]);
      setFormData({
        ...initialFormData,
        planAmount: planAmount ? planAmount : 200,
      });
      setActiveIndex(0);
    }
  }, [isOpen, planAmount]);

  const paymentSucessHandler = () => {
    fetchInterviewerSlots();
  };

  const fetchInterviewerSlots = async () => {
    try {
      const response = await getInterviewerSlots();
      if (response.success) {
        const slots = response.data;
        setInterviewerDetails(slots);
      }
    } catch (error) {
      console.error("Error fetching interviewer slots:", error);
    }
  };
  useEffect(() => {
    fetchInterviewerSlots();
  }, []);

  const yearsOfExperienceHandler = useMemo(() => {
    let experience = user?.yearsOfExperience;
    let yearsOfExperience = {
      value: "Beginner (0-2 years)",
      label: "Beginner (0-2 years)",
    };
    if (experience) {
      if (Number(experience >= 2 && experience <= 5)) {
        yearsOfExperience = {
          value: "Intermediate (2-5 years)",
          label: "Intermediate (2-5 years)",
        };
      }
      if (Number(experience > 5)) {
        yearsOfExperience = {
          value: "Advanced (5+ years)",
          label: "Advanced (5+ years)",
        };
      }
    }
    return yearsOfExperience?.value;
  }, [user?.yearsOfExperience]);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user.name,
        email: user.emailId,
        phoneNumber: user.phoneNumber,
        experienceLevel: yearsOfExperienceHandler,
      }));
    }
  }, [user]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSpecializations([]);
      setFormData({
        ...initialFormData,
        name: user?.name ? user.name : "",
        email: user?.emailId ? user.emailId : "",
        phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
        planAmount: planAmount ? planAmount : 200,
        experienceLevel: yearsOfExperienceHandler,
      });
      setActiveIndex(0);
    }
  }, [isOpen, planAmount]);

  const handleSpecializationSelect = (specializations) => {
    setSelectedSpecializations(specializations);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    handleNext();
  };

  const handleNext = () => {
    if (activeIndex < 2) {
      setActiveIndex(activeIndex + 1);
    } else {
      closeModal();
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const getStepContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <SpecializationStep
            onSelect={handleSpecializationSelect}
            selectedSpecializations={
              selectedSpecializations?.length ? selectedSpecializations : []
            }
          />
        );
      case 1:
        return (
          <Suspense fallback={<Loading />}>
            <FormMockStep
              specializations={selectedSpecializations}
              formData={formData}
              onFormSubmit={handleFormSubmit}
              handleBack={handleBack}
              closeModal={closeModal}
              interviewerDetails={interviewerDetails}
            />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<Loading />}>
            <PaymentStep
              amount={formData?.planAmount}
              user={{ ...formData, specializations: selectedSpecializations }}
              paymentSucessHandler={paymentSucessHandler}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    return selectedSpecializations?.length === 0;
  };

  const renderProgressIndicator = () => {
    const steps = ["Specialization", "Details", "Payment"];
    return (
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              index <= activeIndex ? "text-primary" : "text-gray-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${
                index <= activeIndex
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 hidden md:inline">{step}</span>
            </div>

            {index < 2 && (
              <div
                className={`h-px w-20 mx-2 md:mt-[-22px] md:w-24 ${
                  index < activeIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl text-center mt-[-30px] pb-4">
        {headingsData[activeIndex]}
      </h1>
      {/* Progress indicator */}
      {renderProgressIndicator()}

      {/* Step content */}
      <div className="min-h-[300px]">{getStepContent()}</div>

      {/* Navigation buttons */}

      <div className="py-4 flex gap-4 justify-center md:justify-end">
        {activeIndex === 0 && (
          <button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`btn md:w-32 rounded-xl text-white 
                ${
                  isNextDisabled()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SpecializationModalContent;
