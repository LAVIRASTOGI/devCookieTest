"use client";
import React from "react";
import {
  FaClock,
  FaMicrophone,
  FaCheckCircle,
  FaKeyboard,
  FaDesktop,
  FaVolumeUp,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa";
import Button from "../uiComponents/Button";

function InterviewInstructions({
  onStart,
  totalQuestions = 30,
  timePerQuestion = "2",
  isLoading,
}) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="card bg-base-100 w-full max-w-3xl shadow-xl">
        <div className="card-body space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              Mock Interview Instructions
            </h1>
            <p className="text-center text-base-content/70">
              Please read the following instructions carefully before starting
              your interview.
            </p>
          </div>

          {/* Instructions Grid */}
          <div className="divider"></div>

          <div className="grid gap-6 sm:gap-8">
            <InstructionItem
              icon={<FaCheckCircle className="w-6 h-6 text-success" />}
              title="Interview Format"
              description={`You will be presented with ${totalQuestions} technical questions based on your selected skills and experience level.`}
            />

            <InstructionItem
              icon={<FaClock className="w-6 h-6 text-primary" />}
              title="Time Management"
              description={`You will have ${timePerQuestion} minutes to answer each question. Use your time wisely to provide comprehensive answers.`}
            />

            <InstructionItem
              icon={<FaMicrophone className="w-6 h-6 text-secondary" />}
              title="Voice Recording"
              description="Use the microphone button to record your answers. Speak clearly and maintain a professional tone throughout."
            />

            <InstructionItem
              icon={<FaKeyboard className="w-6 h-6 text-accent" />}
              title="Text Input Option"
              description="If you prefer typing, you can use the text input option to write your answers instead of voice recording."
            />

            <InstructionItem
              icon={<FaDesktop className="w-6 h-6 text-info" />}
              title="System Check"
              description="Ensure your microphone are working properly before starting. Test them using the check button provided."
            />

            <InstructionItem
              icon={<FaVolumeUp className="w-6 h-6 text-warning" />}
              title="Audio Environment"
              description="Find a quiet place with minimal background noise for better voice recording quality."
            />
          </div>

          <div className="divider"></div>

          {/* Pro Tips */}
          <div className="alert alert-info shadow-lg">
            <div>
              <span className="flex gap-2">
                <FaLightbulb className="w-5 h-5" />
                <h3 className="font-bold mb-2">Pro Tips:</h3>
              </span>
              <div>
                <ul className="list-disc list-inside space-y-1 text-sm flex flex-col text-left">
                  <li>Review your selected skills before starting</li>
                  <li>Practice speaking clearly and confidently</li>
                  <li>
                    Take a few seconds to think before answering each question
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <Button onClick={onStart} disabled={isLoading} className="w-full">
              {isLoading ? (
                <span>Starting Interview...</span>
              ) : (
                <span className="flex gap-2 items-center justify-center">
                  Start Interview <FaArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
            <p className="text-sm text-center text-base-content/70">
              By starting the interview, you agree to our terms and conditions
              regarding the recording and storage of your responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Instruction Item Component
const InstructionItem = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 hover:bg-base-200 p-3 rounded-lg transition-colors duration-200">
    <div className="mt-1 flex-shrink-0">{icon}</div>
    <div>
      <h2 className="text-lg sm:text-xl font-semibold mb-1">{title}</h2>
      <p className="text-base-content/70 text-sm sm:text-base">{description}</p>
    </div>
  </div>
);

export default InterviewInstructions;
