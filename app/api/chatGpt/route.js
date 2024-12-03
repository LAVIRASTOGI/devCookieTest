import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    const apiKey = process.env.OPENAI_API_KEY; // Ensure you set this in your .env.local file

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // or 'gpt-4' depending on your model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error.message);
    console.error("Error details:", error.response?.data || error.message);
    const retryAfter = error.response.headers["retry-after"] || 60; // Default to 60 seconds
    console.log(`Too many requests. Retrying in ${retryAfter} seconds...`);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI", details: error.message },
      { status: 500 }
    );
  }
}
