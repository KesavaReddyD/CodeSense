import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

// Mock data for testing
// const MOCK_QUESTIONS = [
//   {
//     id: 1,
//     type: 'multiple_choice',
//     text: 'What is the time complexity of the implemented algorithm?',
//     options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)']
//   },
//   {
//     id: 2,
//     type: 'descriptive',
//     text: 'Explain how you could optimize this code for better space complexity.'
//   },
//   {
//     id: 3,
//     type: 'multiple_choice',
//     text: 'Which data structure would be most efficient for this implementation?',
//     options: ['Array', 'Hash Table', 'Binary Tree', 'Stack']
//   },
//   {
//     id: 4,
//     type: 'descriptive',
//     text: 'What are the potential edge cases that this code might not handle properly?'
//   },
//   {
//     id: 5,
//     type: 'multiple_choice',
//     text: 'What is the main advantage of your chosen approach?',
//     options: [
//       'Memory efficiency',
//       'Runtime performance',
//       'Code readability',
//       'Easy maintenance'
//     ]
//   },
//   // Add more mock questions to make 10 total...
// ];

// const MOCK_QUESTIONS = [
//   {
//     question: 'What is the time complexity of the provided code?',
//     type: 'mcq',
//     options: [Array],
//     expectedAnswer: 'O(1)',
//     expectedKeywords: [],
//     studentAnswer: '',
//     aiFeedback: '',
//     _id:'67c0bc641e5d40b246bd388e'
//   },
//   {
//     question: 'Describe how you would modify the code to accept the two numbers as input from the user via the console. Include the necessary C++ syntax.',
//     type: 'descriptive',
//     options: [],
//     expectedAnswer: 'To accept input from the user, I would use `std::cin`. First, I would declare two integer variables (e.g., `int a, b;`). Then, I would prompt the user to enter the numbers using `std::cout << "Enter two numbers: ";`. Finally, I would read the input using `std::cin >> a >> b;`. The rest of the code to calculate and output the sum would remain the same.',
//     expectedKeywords: [Array],
//     studentAnswer: '',
//     aiFeedback: '',
//     _id: '67c0bc641e5d40b246bd388f'
//   },
//   {
//     question: "What happens if you try to compile and run the code with very large integer values for 'a' and 'b' (e.g., close to the maximum value for the `int` data type)?",
//     type: 'mcq',
//     options: [Array],
//     expectedAnswer: 'The program might overflow and produce an incorrect result.',
//     expectedKeywords: [],
//     studentAnswer: '',
//     aiFeedback: '',
//     _id:'67c0bc641e5d40b246bd3890'
//   },
//   {
//     question: 'Suppose you need to sum a very large array of numbers instead of just two. Would this current code be an appropriate solution? Why or why not? Briefly describe a more suitable approach.',        
//     type: 'descriptive',
//     options: [],
//     expectedAnswer: 'No, this code is not suitable for summing a large array because it only sums two predefined numbers. A more suitable approach would involve using a loop (e.g., `for` or `while`) to iterate through the array, accumulating the sum in a variable. This would require declaring an array and properly handling its indices. Also, for very large arrays, consider using a larger data type to store the sum to prevent overflow.',
//     expectedKeywords: [Array],
//     studentAnswer: '',
//     aiFeedback: '',
//     _id: '67c0bc641e5d40b246bd3891'
//   },
//   {
//     question: "Explain why using `int` data type might not be suitable for all possible values of 'a' and 'b' that you intend to sum. What alternative data type could you use to handle larger numbers and what are the trade-offs?",
//     type: 'descriptive',
//     options: [],
//     expectedAnswer: "The `int` data type has a limited range. If 'a' and 'b' are large enough, their sum could exceed this range, leading to integer overflow. To handle larger numbers, I could use `long long int` which has a larger range. Alternatively, I could use `double` which can represent a wider range but sacrifices precision.  `long double` provides even greater precision, although `double` and `long double` are floating point numbers, and are subject to the limitations of floating point arithmetic.  The trade-off for using larger data types is increased memory usage.",
//     expectedKeywords: [Array],
//     studentAnswer: '',
//     aiFeedback: '',
//     _id:'67c0bc641e5d40b246bd3892'
//   }
// ]



const QuizComponent = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionsPerPage = 1;
  const params = useParams();


  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        // In real implementation, fetch both submission code and questions
        // const response = await fetch(`/api/submissions/${params.submissionId}`);
        // const data = await response.json(); 67c21356ee8ecbd4556ca013

        const data = await axios.get(`/submissions/${params.submissionId}`,{
          withCredentials: true
        });
        setCode(data?.data?.submission?.code || '# Your submitted code will appear here');
        
        setQuestions(data?.data?.submission?.generativeQnA);

        // Initialize answers object
        const initialAnswers = {};
        data?.data?.submission?.generativeQnA.forEach((question) => {
          initialAnswers[question._id] = question.studentAnswer;
        });
        
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmissionData();
  }, [submissionId]);



  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {

      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        questionId,
        answer: answers[questionId],
      }));

      console.log(formattedAnswers);

      const response = await axios.post(`/submissions/evaluation/${params.submissionId}`, {
        formattedAnswers,
      });
      console.log(response);
      navigate('/dashboard');
      // navigate(`/submission/${submissionId}/results`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="w-12 h-12 text-blue-600 animate-spin" />
            <h2 className="text-xl font-medium text-gray-900">
              Loading Your Assessment
            </h2>
            <p className="text-gray-600">
              Please wait while we prepare your quiz...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Panel - Code View */}
        <div className="w-1/2 p-6 border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Submitted Code</h2>
          <div className="h-[calc(100vh-8rem)]">
            <Editor
              value={code}
              language="python"
              theme="light"
              options={{
                readOnly: true,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on'
              }}
            />
          </div>
        </div>

        {/* Right Panel - Quiz Questions */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Understanding Check
            </h2>
            <div className="text-gray-600">
              Question {currentPage} of {totalPages}
            </div>
          </div>

          {currentQuestions.map((question) => (
            <div key={question._id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {question.question}
              </h3>

              {question.type === 'mcq' ? (
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                        checked={answers[question._id] === option}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your answer..."
                />
              )}
            </div>
          ))}

          {/* Navigation and Submit */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
              >
                <ChevronLeft className="w-5 h-5 inline mr-1" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
              >
                Next
                <ChevronRight className="w-5 h-5 inline ml-1" />
              </button>
            </div>
            
            {currentPage === totalPages && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;