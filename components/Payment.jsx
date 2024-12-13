"use client";
import { useState } from "react";

import { mockInterviewMailUserHandler } from "@/lib/userAction";
import PaymentRazorPay from "./payment/PaymentRazorPay";

const PaymentStep = ({ amount, user, paymentSucessHandler }) => {
  const [isPayment, setIsPayment] = useState(false);

  const handlePayment = async (isPaid) => {
    setIsPayment(true);
    await mockInterviewMailUserHandler(user, isPaid);
    paymentSucessHandler();
  };

  const sessionDetails =
    Number(amount) === 300
      ? {
          count: "2 Mock Interview Sessions",
          duration: "60 minutes each",
          totalTime: "120 minutes total",
        }
      : {
          count: "1 Mock Interview Session",
          duration: "60 minutes",
          totalTime: "60 minutes total",
        };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Order Summary Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Order Summary
        </h2>

        {/* Session Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm md:text-lg font-semibold text-gray-700">
              {sessionDetails.count}
            </span>
            <span className="text-primary font-bold text-lg md:text-xl">
              ₹{amount}
            </span>
          </div>

          {/* Features List */}
          <ul className="space-y-3 text-gray-600 text-sm md:text-lg">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Duration: {sessionDetails.duration}
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Comprehensive Feedback Report
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Performance Analysis
            </li>
          </ul>
        </div>
      </div>
      {isPayment ? (
        <>
          {/* Confirmation Message */}
          <div className="text-center space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <svg
                className="w-12 h-12 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className=" text-lg md:text-2xl font-bold text-gray-800 mb-2">
                Thank You for Your Submission!
              </h3>
              <p className="text-gray-600">
                Our team will contact you shortly to schedule your interview
                session
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <PaymentRazorPay
            handlePayment={handlePayment}
            amount={amount}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
