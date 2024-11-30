"use client";

import { useUser } from "@/contexts/userContext";
import Script from "next/script";
import { useState } from "react";

export default function PaymentRazorPay() {
  const [amount, setAmount] = useState(100);
  const { user } = useUser();

  const createOrder = async () => {
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,
      currency: "INR",
      name: "Dev Ready Academy", //your business name
      description: "Test Transaction",
      amount: data?.amount,

      handler: async function (response) {
        // verify payment
        const res = await fetch("/api/verifyOrder", {
          method: "POST",
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.isOk) {
          // do whatever page transition you want here as payment was successful
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },

      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.name, //your customer's name
        email: user?.emailId,
        contact: user?.phoneNo || 9898989898, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#467ac0",
      },
    };

    const payment = new Razorpay(paymentData);
    payment.open();
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col gap-4">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={createOrder}
      >
        PayNow
      </button>
    </div>
  );
}
