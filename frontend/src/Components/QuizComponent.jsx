import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import Editor from '@monaco-editor/react';

// Mock data for testing
const MOCK_QUESTIONS = [
  {
    id: 1,
    type: 'multiple_choice',
    text: 'What is the time complexity of the implemented algorithm?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)']
  },
  {
    id: 2,
    type: 'descriptive',
    text: 'Explain how you could optimize this code for better space complexity.'
  },
  {
    id: 3,
    type: 'multiple_choice',
    text: 'Which data structure would be most efficient for this implementation?',
    options: ['Array', 'Hash Table', 'Binary Tree', 'Stack']
  },
  {
    id: 4,
    type: 'descriptive',
    text: 'What are the potential edge cases that this code might not handle properly?'
  },
  {
    id: 5,
    type: 'multiple_choice',
    text: 'What is the main advantage of your chosen approach?',
    options: [
      'Memory efficiency',
      'Runtime performance',
      'Code readability',
      'Easy maintenance'
    ]
  },
  // Add more mock questions to make 10 total...
];

const QuizComponent = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionsPerPage = 1;

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        // In real implementation, fetch both submission code and questions
        const response = await fetch(`/api/submissions/${submissionId}`);
        const data = await response.json();
        setCode(data.code || '# Your submitted code will appear here');
        
        // Initialize answers object
        const initialAnswers = {};
        MOCK_QUESTIONS.forEach(q => {
          initialAnswers[q.id] = q.type === 'multiple_choice' ? '' : '';
        });
        setAnswers(initialAnswers);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmissionData();
  }, [submissionId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: value
      };
      
      // Save to backend after each answer
      saveAnswersToBackend(newAnswers);
      
      return newAnswers;
    });
  };

  const saveAnswersToBackend = async (answerData) => {
    try {
      await fetch(`/api/save-quiz-progress/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answerData }),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/submit-quiz/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      
      const data = await response.json();
      navigate(`/submission/${submissionId}/results`);
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
            <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {question.text}
              </h3>

              {question.type === 'multiple_choice' ? (
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
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