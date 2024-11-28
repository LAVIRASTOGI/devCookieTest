"use client";

import useScreenSize from "@/utils/useScreenSize";
import Image from "next/image";

function SignUpHeader() {
  const isMobile = useScreenSize();
  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden w-full bg-white shadow-md p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/logo/logoLight.png"
                alt="DevReady Academy Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="text-xl font-bold text-primary">
                DevReady Academy
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Left Section with Image */}
          <div className="hidden lg:block lg:w-1/2 lg:fixed left-0 h-screen">
            <div className="relative h-full w-full">
              <Image
                src="/images/interviewCall.JPG"
                alt="DevReady Academy Learning Environment"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex flex-col justify-center items-center text-white p-12">
                <div className="mb-8">
                  <Image
                    src="/logo/logoDark.png"
                    alt="DevReady Academy Logo"
                    width={200}
                    height={60}
                    priority
                  />
                </div>
                <h1 className="text-5xl font-bold mb-6 text-center">
                  Start Your Journey
                </h1>
                <p className="text-xl text-center leading-relaxed max-w-2xl">
                  Join DevReady Academy and transform your passion for
                  technology into a successful career.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignUpHeader;
