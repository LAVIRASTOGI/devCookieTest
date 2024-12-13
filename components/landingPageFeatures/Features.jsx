"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const featureCards = [
  {
    imageSrc: "/images/interviewPrep.svg",
    title: "Realistic Experience",
    description:
      "Participate in mock interviews that mirror real-life scenarios, ensuring you're well-prepared and confident for the actual interview.",
  },
  {
    imageSrc: "/images/practiceInterview.svg",
    title: "Discover your Strengths",
    description:
      "Gain valuable insights and constructive feedback from expert interviewers, helping you identify strengths and sharpen your techniques.",
  },
  {
    imageSrc: "/images/readyInterview.svg",
    title: "Perform With Confidence",
    description:
      "Master the art of presenting yourself effectively. Reduce anxiety and boost confidence through practice, enabling you to excel in real interviews.",
  },
];

<div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>;

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="m-auto text-center container my-8">
      <motion.h2
        className="text-3xl lg:text-5xl font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary">Mock</span> Interviews Always{" "}
        <span className="text-primary">Work</span>
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center ">
        {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="card bg-base-100 flex flex-col shadow-xl max-w-xs h-[390px] border-2 border-gray-200 rounded-lg p-2 pt-8">
              <figure>
                <div className="relative w-full h-40">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className=" object-contain"
                  />
                </div>
              </figure>
              <div className="card-body flex flex-col items-center">
                <h2 className="card-title text-lg font-semibold ">
                  {card.title}
                </h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
