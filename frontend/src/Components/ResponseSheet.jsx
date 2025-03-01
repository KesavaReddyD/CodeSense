import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const StudentResponseSheet = () => {
  const { submissionId } = useParams();
  const [responsesheet, setResponseSheet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const fetchResponseData = async () => {
      try {
        const data = await axios.get(`/submissions/${submissionId}`, {
          withCredentials: true,
        });
        setResponseSheet(data.data);
        console.log(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
        setIsLoading(false);
      }
    };

    fetchResponseData();
  }, [submissionId]);

  // Function to determine color based on matching answer
  const getStatusColor = (studentAnswer, expectedAnswer) => {
    if (!studentAnswer) return "text-gray-500"; // Unanswered
    return studentAnswer === expectedAnswer ? "text-green-600" : "text-red-600";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!responsesheet) {
    return <div>No data available</div>;
  }

  const { generativeQnA, grade } = responsesheet.submission;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz reviewing</h1>
              <p className="text-gray-600">Student: {auth?.user?.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Overall Grade:</span>
                <span className="text-2xl font-bold text-blue-600">{`${grade}/10`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall AI Feedback
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">AI Assessment Summary</h2>
          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-gray-600">{overallFeedback}</p>
          </div>
        </div> */}

        {/* Questions and Answers */}
        <div className="space-y-8">
          {generativeQnA.map((question, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Question Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
              </div>

              {/* Question Content */}
              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-gray-900 font-medium">Question:</p>
                  <div className="mt-1 text-gray-600">{question.question}</div>
                </div>

                {/* Options if any */}
                {question.options && question.options.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-900 font-medium">Options:</p>
                    <ul className="mt-1 ml-6 list-disc text-gray-600">
                      {question.options.map((option, optIndex) => (
                        <li key={optIndex}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Answer Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-900 font-medium">Expected Answer:</p>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-600 break-words">
                      {question.expectedAnswer}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Student's Answer:</p>
                    <div
                      className={`mt-1 p-3 rounded-md break-words ${
                        getStatusColor(question.studentAnswer, question.expectedAnswer) === "text-green-600"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <span className={getStatusColor(question.studentAnswer, question.expectedAnswer)}>
                        {question.studentAnswer || "Unanswered"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div>
                  <p className="text-gray-900 font-medium">AI Feedback:</p>
                  <div className="mt-1 p-4 bg-blue-50 rounded-md border border-blue-200 text-gray-600">
                    {question.aiFeedback}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResponseSheet;
