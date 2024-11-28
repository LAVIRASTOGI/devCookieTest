"use client";
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
    <div className="mt-40">
      {/* <>
        <button onClick={navigateWithHash}>Click me</button>
      </> */}
    </div>
  );
}

export default AIMockInterviewPage;
