import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("Error creating order", error, error.message);
    return NextResponse.json(
      { error: "Error Creating order" },
      { status: 500 }
    );
  }
}
