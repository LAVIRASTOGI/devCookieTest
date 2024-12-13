"use client";
import Features from "@/components/landingPageFeatures/Features";

import TechStack from "@/components/landingPageFeatures/TechStack";
import { useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";
import Hero from "@/components/landingPageFeatures/Hero";
import PricingPlan from "@/components/landingPageFeatures/PricingPlan";
import MockInterviewProcess from "@/components/landingPageFeatures/MockInterviewProcess";

const CustomDialogue = dynamic(() => import("@/components/CustomDialogue"), {
  loading: () => <Loading />,
});

const SpecializationModalContent = dynamic(
  () => import("@/components/SpecializationModalContent"),
  {
    loading: () => <Loading />,
  }
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [planAmount, isPlanAmount] = useState(200);

  const openModal = (amount) => {
    if (amount) {
      isPlanAmount(amount);
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  return (
    <div className="min-h-screen bg-gradient-custom-2 mt-20">
      <Hero openModal={openModal} />
      <Features />
      <TechStack />
      <PricingPlan openModal={openModal} />
      <MockInterviewProcess openModal={openModal} />
      {isOpen && (
        <CustomDialogue
          idName="mockInterview"
          title=""
          description=""
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <SpecializationModalContent
            closeModal={closeModal}
            isOpen={isOpen}
            planAmount={planAmount}
          />
        </CustomDialogue>
      )}
    </div>
  );
}
