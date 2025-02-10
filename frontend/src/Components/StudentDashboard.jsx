import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const mockQuestions = [
  {
    id: 1,
    title: "Two Sum Problem",
    description: "Find two numbers in an array that add up to a target",
    difficulty: "Easy",
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
    ],
    dateCreated: "2025-02-01",
  },
];

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">{user?.username}</span>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Questions List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Tests</h2>
        <div className="grid grid-cols-1 gap-4">
          {mockQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/question/${question.id}`)}
            >
              <h3 className="text-xl font-bold text-gray-900">{question.title}</h3>
              <p className="text-gray-600">{question.description}</p>
              <span className="text-blue-600 font-medium">Difficulty: {question.difficulty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
