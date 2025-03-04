import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export const generateQuiz = async (question, code, language) => {

    console.log(question, code, language);
    const prompt = `
I need you to analyze a student's code submission for a programming assignment and generate questions that test their true understanding of the code they've written.

PROGRAMMING PROBLEM:
Title: ${question.question}
Description: ${question.description}
Test Cases: ${JSON.stringify(question.testcases)}

Language: ${language}
STUDENT'S SUBMITTED CODE:
\`\`\`
${code}
\`\`\`

Based on this submission, generate 5 questions that will test the student's deeper understanding of their code implementation. The questions should:
1. Test conceptual understanding, not just whether the code works
2. Probe edge cases and potential limitations 
3. Check if the student understands the time/space complexity of their solution
4. Assess their awareness of alternative approaches
5. Verify their grasp of the underlying algorithms and data structures used

Create a mix of multiple-choice and descriptive questions. For descriptive questions, include expected keywords that should appear in a good answer.

Format your response as a valid JSON array of question objects with the following structure:
[
  {
    "question": "Your multiple-choice question here",
    "type": "mcq",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "expectedAnswer": "The correct option"
  },
  {
    "question": "Your descriptive question here",
    "type": "descriptive",
    "options": [],
    "expectedAnswer": "A detailed model answer",
    "expectedKeywords": ["keyword1", "keyword2", "keyword3"]
  }
]
`;



    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(responseText);
    
        // Extract JSON array from response text
        const jsonArrayString = responseText.match(/\[.*\]/s);
        if (!jsonArrayString) {
          throw new Error('Failed to extract JSON array from response');
        }
    
        // Parse the JSON array string
        const parsedResponse = JSON.parse(jsonArrayString[0]);
        return parsedResponse;
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        throw new Error('Failed to generate quiz questions');
      }

}





