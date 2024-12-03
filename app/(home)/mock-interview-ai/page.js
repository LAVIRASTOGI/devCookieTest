import Dashboard from "@/components/mockInterviewAI/Dashboard";
import React from "react";
export const dynamic = "force-static";

function AIMockInterviewPage() {
  return (
    <div className="mt-32 container mx-auto ">
      <Dashboard title={"AI Mock Interview"} />
    </div>
  );
}

export default AIMockInterviewPage;
