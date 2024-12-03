"use server";

import { chatSession } from "@/utils/geminiAI";
import { generateInterviewPrompt } from "@/utils/promptGenrator";

export async function mockInterviewGenerate(prevState, formData, user) {
  try {
    const interviewDetails = {
      skillLevel: formData?.["skillFeild"],
      experience: formData?.["yearsOfExperience"],
      skills: formData?.["specializations"],
      user: {
        id: user?._id,
      },
    };

    console.log("interviewDetails", interviewDetails);
    const promptGenerated = generateInterviewPrompt({
      skillLevel: interviewDetails?.["skillLevel"],
      experienceYears: interviewDetails?.["experience"],
      technologies: interviewDetails?.["skills"],
    });

    console.log("promptGenerated", promptGenerated);
    const result = await chatSession.sendMessage(promptGenerated);
    //replace ```json and ``` with '' in one line
    const interviewQuestions = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    interviewDetails.interviewQuestions = JSON.parse(interviewQuestions);
    console.log("interviewQues", interviewDetails?.interviewQuestions);
    return "success";
  } catch (err) {
    console.log(err);
    throw new Error(
      "Failed to generate interview questions Please Mention details Properly or try After sometime"
    );
  }
}
