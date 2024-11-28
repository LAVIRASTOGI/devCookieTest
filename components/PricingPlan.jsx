"use client";
import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "./uiComponents/Button";

const PricingPlan = ({ openModal }) => {
  const plans = [
    {
      title: "Basic Plan",
      price: "200",
      icon: "/images/price-basicicon.png",
      features: [
        "1 Mock Interview Session",
        "Detailed Analysis and Feedback on Areas of Improvement",
        "Conducted by Industry Experienced Interviewers",
      ],
      buttonColor: "bg-primary hover:bg-primary/90",
    },
    {
      title: "Premium Plan",
      price: "300",
      icon: "/images/price-businessicon.png",
      features: [
        "2 Mock Interview Sessions",
        "Detailed Analysis and Feedback on Areas of Improvement",
        "Conducted by Industry Experienced Interviewers",
      ],
      buttonColor: "bg-success hover:bg-success/90",
      featured: true,
    },
  ];

  // Animation variants
  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const featureVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <h2 className="text-xl md:text-2xl text-orange-500 font-semibold mb-3">
          What We Offer
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Choose Your Pricing Plan
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: plan.featured ? -8 : -4 }}
            className={`relative bg-white rounded-2xl shadow-xl border-t-4 ${
              plan.featured ? "border-orange-500" : "border-blue-100"
            } transition-colors duration-300`}
          >
            {plan.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Popular
              </motion.span>
            )}
            <div className="p-8">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="p-4 bg-gray-100 rounded-full mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={plan.icon}
                    alt={`${plan.title} icon`}
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </motion.div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {plan.title}
                </h2>
                <motion.p
                  className="text-orange-500 text-3xl font-bold mb-6"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Rs {plan.price}
                </motion.p>
              </motion.div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={featureVariants}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                    <span
                      className={`text-gray-600 ${
                        idx === 0 ? "font-bold" : "font-normal"
                      }`}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="orange"
                mobileSize="lg"
                laptopSize="xl"
                className={`w-full ${plan.buttonColor} text-white font-semibold transition-colors duration-200`}
                onClick={() => openModal(plan.price)}
              >
                Book 1:1 Mock Interview
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlan;
