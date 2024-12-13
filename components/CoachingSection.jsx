"use client";
import { useState } from "react";
import CustomDialogue from "./CustomDialogue";
import SpecializationModalContent from "./SpecializationModalContent";
import Image from "next/image";
import Button from "./uiComponents/Button";
import { FaArrowRight } from "react-icons/fa";

const VideoEmbed = () => (
  <div className="lg:w-1/2 mt-8 lg:mt-0 transform hover:scale-[1.02] transition-transform duration-300">
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ paddingBottom: "56.25%" }}
    >
      <Image
        src="/images/Interview.jpg"
        alt="Interview illustration"
        fill
        className="hover:opacity-95 transition-opacity duration-300 object-cover"
      />
    </div>
  </div>
);

const ContentSection = ({ title, description, buttonText, onButtonClick }) => (
  <div className="text-center lg:text-left lg:w-1/2 space-y-8 max-w-2xl">
    <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight tracking-tight">
      {title}
    </h1>
    <div className="text-gray-600 text-lg lg:w-[90%] mx-auto lg:mx-0 space-y-6">
      {description}
    </div>
    <Button
      variant="primary"
      mobileSize="lg"
      laptopSize="xl"
      className="text-white inline-flex gap-4 items-center"
      onClick={onButtonClick}
    >
      <span className="font-semibold">{buttonText}</span>
      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const DescrptionText = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Prepare for success with personalized technical interviews guided by
        industry experts with over 10 years of experience.
      </h1>
      <p className="mb-4 leading-relaxed">
        Choose your specialization, from front-end frameworks like React.js and
        receive immediate, constructive feedback.
      </p>
      <p className="leading-relaxed">
        Our mock interviews simulate real-world scenarios, helping you build
        confidence, refine your skills, and perform at your best. Get detailed
        insights into your strengths and areas for improvement, with a roadmap
        for continuous growth.
      </p>
    </>
  );
};

const CoachingSection = ({
  description = <DescrptionText />,
  title = "Expert Coaching & Mock Interviews",
  buttonText = "Start Mock Interview",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <section
      className="flex flex-col lg:flex-row justify-between gap-12 items-center 
                        p-8 lg:p-16 lg:pt-4 bg-gradient-to-br from-gray-50 to-gray-100
                        min-h-screen"
    >
      <ContentSection
        title={title}
        description={description}
        buttonText={buttonText}
        onButtonClick={openModal}
      />
      <VideoEmbed />
      {openModal && (
        <CustomDialogue
          idName="mockInterview"
          title=""
          description=""
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <SpecializationModalContent closeModal={closeModal} isOpen={isOpen} />
        </CustomDialogue>
      )}
    </section>
  );
};

export default CoachingSection;
