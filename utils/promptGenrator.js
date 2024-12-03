export function generateInterviewPrompt({
  experienceYears,
  skillLevel,
  technologies,
  questionCount = 30,
}) {
  const techStackValue = technologies ? technologies.join(", ") : "";

  return `Your task is to generate ${questionCount} interview questions in JSON format.
   The candidate should be proficient in ${techStackValue}, have ${experienceYears} years of experience,
    and possess a ${skillLevel} skill level. 
    Each question should be categorized as easy, medium, or tough.
     The output should be structured as follows: 

  {
    "questions": [
      {
        "question": "question text",
        "topic": "${techStackValue}",
        "subTopic": "Specific sub-topic here",
        "difficulty": "easy|medium|tough"
      }
    ]
  }
  
  Please continue to generate ${questionCount} such interview questions according to the structure and requirements provided.
   Out of the total questions, 25 should be conceptual and theoretical, and 5 should focus on programming, logical, or coding problems.
   
`;
}
