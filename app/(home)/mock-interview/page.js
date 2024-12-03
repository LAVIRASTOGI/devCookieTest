// import Loading from "@/app/loading";

import CoachingSection from "@/components/CoachingSection";
import TechStack from "@/components/TechStack";

// import dynamic from "next/dynamic";

// const CoachingSection = dynamic(() => import("@/components/CoachingSection"), {
//   loading: () => <Loading />,
// });

// const TechStack = dynamic(() => import("@/components/TechStack"), {
//   loading: () => <Loading />,
// });

export const dynamic = "force-static";
function MockInterview() {
  return (
    <>
      <div className="mt-20">
        <CoachingSection />
        <TechStack />
      </div>
    </>
  );
}

export default MockInterview;
