"use client";

import Script from "next/script";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PaymentRazorPay({
  amount,
  user,
  handlePayment,
  buttonName = "Pay Now",
}) {
  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadingMsg: "",
  });
  const createOrder = async () => {
    setIsLoading({
      loading: true,
      loadingMsg: "Proceeding for payment ...",
    });
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    setIsLoading({
      loading: false,
      loadingMsg: "",
    });
    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,
      currency: "INR",
      name: "Dev Ready Academy", //your business name
      description: "Transaction For devReady Academy",
      amount: data?.amount,

      handler: async function (response) {
        setIsLoading({
          loading: true,
          loadingMsg: "Confirming Payment ...",
        });
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
        if (data.isOk) {
          handlePayment(true);
          toast.success("Payment successful");
        } else {
          toast.error("Payment failed. Please try again");
        }
        setIsLoading({
          loading: false,
          loadingMsg: "",
        });
      },

      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.name, //your customer's name
        email: user?.email,
        contact: user?.phoneNumber || 9742117416, //Provide the customer's phone number for better conversion rates
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
    <div>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      {isLoading?.loading ? (
        <button
          className="btn bg-primary w-full text-white px-6 py-3 rounded-xl hover:bg-primary hover:scale-105 transform transition-transform duration-200"
          onClick={createOrder}
        >
          {isLoading?.loadingMsg}
        </button>
      ) : (
        <button
          className="btn bg-primary text-white flex w-full  gap-2  items-center rounded-xl hover:bg-primary hover:scale-105 transform transition-transform duration-200"
          onClick={createOrder}
        >
          {buttonName}
        </button>
      )}
    </div>
  );
}
