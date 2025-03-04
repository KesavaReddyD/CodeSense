import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateFeedback = async (question, submission) => {

    // console.log(generativeQnA);

    const prompt = `
    You are a highly advanced teaching assistant, capable of providing detailed, constructive, and actionable feedback to students. Your task is to evaluate the student's answers to the following questions and provide:

PROGRAMMING PROBLEM:
Title: ${question.question}
Description: ${question.description}
Test Cases: ${JSON.stringify(question.testcases)}

Language: ${submission.language}
STUDENT'S SUBMITTED CODE:
\`\`\`
${submission.code}
\`\`\`

Based on this submission some questions were generated and students have answered them. Your task is to evaluate the student's answers and provide detailed feedback for each question.

1. **Feedback for the Student**:
   - Explain why the answer is correct or incorrect.
   - If the answer is incorrect, provide the correct answer and explain why it is correct.
   - Offer actionable advice for improvement.
   - If the student needs to revise specific topics, mention this explicitly in the feedback (e.g., "You should revise the topic of time complexity.").

2. **Overall Grade**:
   - Provide an overall grade out of 10 based on the accuracy and completeness of all answers.

Format your response as a JSON object with the following structure( don't include back ticks, json in your response):
{
  feedbacks: [
    {
      _id: "The _id of the question",
      response: "Your feedback for this question"
    },
    ...
  ],
  overallGrade: "The overall grade out of 10 for all answers"
}

For each question, you will be provided with:
- The question text.
- Options.
- expected answer.
- expected keywords.
- The student's answer.

Questions and Answers:
${submission.generativeQnA}
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // console.log(responseText);

        const cleanedFeedbackText = responseText.replace(/```json\n{/g, '{').replace(/}\n```/g, '}').trim();
        const feedbackObject = JSON.parse(cleanedFeedbackText);
        // console.log("Parsed Feedback Object:", feedbackObject);

        return feedbackObject;
    } catch (error) {
        console.log('Error generating feedback:', error);
        return 'Error generating feedback';
    }
}