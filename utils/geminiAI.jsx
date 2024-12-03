import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getResponse(message = "hiiii") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ generationConfig }); // Start chat here
    const response = await chat.sendMessage(message);
    console.log("response", response.text);
    return response.text; // Directly access the text property
  } catch (error) {
    console.error("Error getting response:", error);
    if (error.message.includes("503")) {
      // Handle 503 specifically.  Consider retrying with exponential backoff.
      return "The service is temporarily unavailable. Please try again later.";
    } else {
      return "An error occurred. Please try again later.";
    }
  }
}
