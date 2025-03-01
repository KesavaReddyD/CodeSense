import Together from 'together-ai';

async function generateCodeUnderstandingQuestions(submissionData) {
  try {
    // 1. Initialize Together AI client
    const together = new Together({
      apiKey: '55e93f6fcb10aa78f67a53a83458a61c105b0c2f67642fc782774046abd50698'
    });
    
    // 2. Craft a detailed prompt for the LLM
    const prompt = `
I need you to analyze a student's code submission for a programming assignment and generate questions that test their true understanding of the code they've written.

PROGRAMMING PROBLEM:
Title: ${submissionData.question}
Description: ${submissionData.description}
Test Cases: ${JSON.stringify(submissionData.testcases)}

STUDENT'S SUBMITTED CODE:
\`\`\`
${submissionData.studentCode}
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

    // 3. Call the Together AI API
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "system", 
          content: "You are an expert programming instructor who specializes in evaluating student code and creating assessments that test deep understanding."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.7,
      max_tokens: 2048
    });
    
    // 4. Extract and validate the JSON response
    const responseContent = response.choices[0].message.content;
    const jsonStartIndex = responseContent.indexOf('[');
    const jsonEndIndex = responseContent.lastIndexOf(']') + 1;
    
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Failed to parse JSON response from model");
    }
    
    const jsonString = responseContent.substring(jsonStartIndex, jsonEndIndex);
    const questions = JSON.parse(jsonString);
    
    return questions;
    
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Example usage
const submissionData = {
  question: "Find the maximum subarray sum",
  description: "Given an array of integers, find the contiguous subarray with the largest sum.",
  testcases: [
    {
      input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      output: 6
    },
    {
      input: [1],
      output: 1
    }
  ],
  studentCode: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`
};

generateCodeUnderstandingQuestions(submissionData)
  .then(questions => {
    console.log("Generated questions:");
    console.log(JSON.stringify(questions, null, 2));
  })
  .catch(error => {
    console.error("Failed to generate questions:", error);
  });