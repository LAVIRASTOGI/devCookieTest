"use client";
import Dashboard from "@/components/mockInterviewAI/Dashboard";
import { mockIdGenerate } from "@/lib/action";
import { useRouter } from "next/navigation";
import React from "react";

function AIMockInterviewPage() {
  const router = useRouter();
  // const navigateWithHash = async () => {
  //   const { id } = await mockIdGenerate();
  //   router.push(`/mock-interview-ai/${id}`);
  // };
  return (
    <div className="mt-32 container mx-auto ">
      <Dashboard title={"AI Mock Interview"} />
    </div>
  );
}

export default AIMockInterviewPage;
