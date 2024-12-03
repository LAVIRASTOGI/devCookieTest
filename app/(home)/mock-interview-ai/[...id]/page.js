"use client";

import InterviewInstructions from "@/components/interview/InstructionPage";
import { useState } from "react";
import toast from "react-hot-toast";

function MockID() {
  const [isShowInstruction, setisShowInstruction] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(() => resolve("yes"), 2000));
      setisShowInstruction(false);
      setIsInterviewStarted(true);
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast.error("Failed to start interview. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isShowInstruction) {
    return (
      <div className="mt-28">
        <InterviewInstructions
          onStart={handleStartInterview}
          totalQuestions={30}
          timePerQuestion="2"
          isLoading={isLoading}
        />
      </div>
    );
  }
  if (isInterviewStarted) {
    return <div className="mt-28">Interview Started</div>;
  }
}

export default MockID;
