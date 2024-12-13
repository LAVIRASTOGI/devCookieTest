"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../uiComponents/Button";

export default function Hero({ openModal }) {
  return (
    <section
      className="bg-primary/80 p-12 lg:p-[200px] text-white "
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundPosition: "center",
      }}
    >
      <div className="container grid grid-cols-1 lg:grid-cols-[50%_40%] gap-8 items-center">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Achieve Career Success with Expert Coaching, Mock Interviews
          </motion.h2>
          <motion.p
            className="mb-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Unleash your potential and get ready for your dream job. Our
            platform offers tailored expert guidance, realistic mock interview
            simulations, in-depth analysis, and actionable feedback. Build
            confidence, refine your skills, and ace interviews effortlessly.
          </motion.p>
          <motion.div
            className="flex gap-8 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              variant="orange"
              mobileSize="lg"
              laptopSize="xl"
              className="text-white"
              onClick={() => openModal()}
            >
              Book 1:1 Mock Interview
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative w-full h-[300px] lg:h-[400px] hidden lg:block overflow-hidden rounded-tl-[10%] rounded-br-[10%]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/Interview.jpg"
            alt="Interview illustration"
            fill
            className=" object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
