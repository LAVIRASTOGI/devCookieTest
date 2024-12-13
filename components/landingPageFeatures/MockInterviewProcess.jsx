"use client";
import React from "react";

import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../uiComponents/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const steps = [
  {
    title: "Step 1: Schedule Your Mock Interview",
    description:
      "Select your preferred time slot and technology stack for the mock interview session.",
    icon: "🗓️",
  },
  {
    title: "Step 2: Receive Team Call",
    description:
      "Our team will confirm your interview slot and discuss your specific requirements.",
    icon: "📞",
  },
  {
    title: "Step 3: Mock Interview Session",
    description:
      "Engage in a realistic interview simulation with one of our expert interviewers.",
    icon: "💻",
  },
  {
    title: "Step 4: Detailed Feedback",
    description:
      "Receive in-depth feedback on your performance, highlighting strengths and areas for improvement.",
    icon: "📝",
  },
  {
    title: "Step 5: Improvement Plan",
    description:
      "Get a tailored improvement plan with recommended resources and practice areas to help you grow.",
    icon: "🎯",
  },
];

const StepCard = ({ step, index }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
        <span className="text-2xl">{step.icon}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed">{step.description}</p>
      </div>
    </div>
  </motion.div>
);

const ProcessTimeline = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="space-y-6"
  >
    {steps.map((step, index) => (
      <div key={index} className="relative">
        <StepCard step={step} index={index} />
      </div>
    ))}
  </motion.div>
);

export default function MockInterviewProcess({ openModal }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl lg:text-2xl font-semibold text-orange-500 mb-2">
            MOCK INTERVIEW PROCESS
          </h2>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Your Path to Interview Success
          </h1>
          <p className="text-xl text-primary/90">
            Follow our proven approach to effectively prepare and excel in your
            technical interviews
          </p>
        </motion.div>

        <ProcessTimeline />

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button
            variant="primary"
            mobileSize="lg"
            laptopSize="xl"
            className="text-white inline-flex gap-4 items-center"
            onClick={() => openModal()}
          >
            <span className="font-semibold">Schedule Your Mock Interview</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
