"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { SPECIALIZATIONS } from "@/constants/specalizations ";

function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      rotate: -10,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading Section */}
        <motion.div
          className="mb-16 text-center max-w-3xl mx-auto"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-semibold text-white mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            MOCK INTERVIEW TECHNOLOGIES
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Technologies We Offer for Mock Interviews
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Master your technical interviews with our comprehensive mock
            sessions across various technologies and frameworks.
          </motion.p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SPECIALIZATIONS.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl 
              transition-all duration-300 p-8 rounded-xl"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-700/20 via-white to-primary/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-6"
                  variants={imageVariants}
                >
                  <motion.div
                    className="p-4"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <Image
                      src={item?.icon}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain filter brightness-110"
                      priority
                    />
                  </motion.div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-black/90 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-black/80 mb-6 line-clamp-3 group-hover:text-black/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default TechStack;
