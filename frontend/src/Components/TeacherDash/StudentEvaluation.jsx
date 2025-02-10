import { useState } from "react";

const mockSubmissions = [
  {
    id: 1,
    username: "JohnDoe",
    email: "john@example.com",
    question: "Implement Binary Search",
    description: "Write a function to perform binary search on a sorted array.",
    code: `def binary_search(arr, target):\n  left, right = 0, len(arr) - 1\n  while left <= right:\n    mid = (left + right) // 2\n    if arr[mid] == target:\n      return mid\n    elif arr[mid] < target:\n      left = mid + 1\n    else:\n      right = mid - 1\n  return -1`,
    qna: [
      { question: "What is the time complexity?", answer: "O(log n)" },
      { question: "What happens if the element is not found?", answer: "Returns -1" },
    ],
    grade: 8,
  },
  {
    id: 2,
    username: "JaneSmith",
    email: "jane@example.com",
    question: "Reverse a Linked List",
    description: "Write a function to reverse a singly linked list.",
    code: `class Node:\n  def __init__(self, data):\n    self.data = data\n    self.next = None\n\ndef reverse_list(head):\n  prev = None\n  current = head\n  while current:\n    next_node = current.next\n    current.next = prev\n    prev = current\n    current = next_node\n  return prev`,
    qna: [
      { question: "What is the space complexity?", answer: "O(1)" },
      { question: "What is the time complexity?", answer: "O(n)" },
    ],
    grade: 9,
  },
];

const StudentEvaluation = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [editedGrade, setEditedGrade] = useState(null);

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setEditedGrade(submission.grade);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
  };

  const handleGradeChange = (e) => {
    setEditedGrade(e.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 pb-7">Student Submissions</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white rounded-lg px-6 pb-4 shadow-md cursor-pointer hover:bg-gray-100 transition"
            onClick={() => openModal(submission)}
          >
            <h3 className="text-xl font-bold text-gray-900">{submission.username}</h3>
            <p className="text-gray-600">{submission.question}</p>
            <span className="text-blue-600 font-medium">Grade: {submission.grade}/10</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-lg max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">{selectedSubmission.question}</h2>
            <p className="text-gray-600">{selectedSubmission.description}</p>

            <div className="bg-gray-100 p-4 mt-4 rounded-md">
              <h3 className="text-lg font-bold">Submitted Code</h3>
              <pre className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto">
                {selectedSubmission.code}
              </pre>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold">Q&A</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {selectedSubmission.qna.map((qa, index) => (
                  <li key={index}>
                    <strong>{qa.question}:</strong> {qa.answer}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-900">Grade</label>
              <input
                type="number"
                min="0"
                max="10"
                value={editedGrade}
                onChange={handleGradeChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => alert(`Grade updated to: ${editedGrade}`)}
              >
                Save Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentEvaluation
