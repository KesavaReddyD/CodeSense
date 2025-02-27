import axios from "axios";
import React, { useEffect, useState } from "react";
import {toast} from "react-hot-toast";

const View = () => {


    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
        
            const data = await axios.get('/questions/all', {
                withCredentials: true
            });
            if(data.status !== 200){
                throw new Error("Unable to fetch questions");
            }
            // console.log(data);
            setQuestions(data.data);
        }
        fetchQuestions();
    }, [])


    

    const difficulties = [
        { value: 'Easy', color: 'bg-green-100 text-green-800' },
        { value: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'Hard', color: 'bg-red-100 text-red-800' }
      ];


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [viewingQuestion, setViewingQuestion] = useState(null);

    const handleView = (question) => {
        setViewingQuestion(question);
        setIsViewModalOpen(true);
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (question) =>{
        try{
            const lot = toast.loading("Deleting question...");
            await axios.delete(`/questions/delete/${question.id}`, {
                withCredentials: true
            });
            toast.dismiss(lot);
            toast.success("Question deleted successfully");
            setQuestions(questions.filter((q) => q.id !== question.id));
        }catch(error){
            toast.dismiss();
            toast.error("Error deleting question");
            console.error("Error deleting question:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/questions/update/${editingQuestion.id}`, editingQuestion, {
            withCredentials: true,
            });
            if (response.status !== 200) {
            throw new Error("Unable to update question");
            }
            setQuestions(
                questions.map((q) =>
                    q.id === editingQuestion.id ? editingQuestion : q
                )
            );
        } catch (error) {
            console.error("Error updating question:", error);
        }
        
        setIsEditModalOpen(false);
    };

    const addTestCase = () => {
        setEditingQuestion({
            ...editingQuestion,
            testCases: [
                ...editingQuestion.testCases,
                { input: "", expectedOutput: "" },
            ],
        });
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            Easy: "bg-green-100 text-green-800",
            Medium: "bg-yellow-100 text-yellow-800",
            Hard: "bg-red-100 text-red-800",
        };
        return colors[difficulty] || "bg-gray-100 text-gray-800";
    };

    return (
        <>
            {isViewModalOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Test Question Details
                            </h2>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {viewingQuestion.question}
                                </h3>
                                <span
                                    className={`mt-2 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                                        viewingQuestion.difficulty
                                    )}`}
                                >
                                    {viewingQuestion.difficulty}
                                </span>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-600">
                                    Description
                                </h4>
                                <p className="mt-2 text-gray-900 whitespace-pre-wrap">
                                    {viewingQuestion.description}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-3">
                                    Test Cases
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                    {viewingQuestion.testCases.map(
                                        (testCase, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-2 gap-4"
                                            >
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500">
                                                        Input
                                                    </label>
                                                    <code className="block mt-1 text-sm text-gray-900 bg-white p-2 rounded border border-gray-200">
                                                        {testCase.input}
                                                    </code>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500">
                                                        Expected Output
                                                    </label>
                                                    <code className="block mt-1 text-sm text-gray-900 bg-white p-2 rounded border border-gray-200">
                                                        {
                                                            testCase.expectedOutput
                                                        }
                                                    </code>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                Created: {viewingQuestion.dateCreated}
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        handleEdit(viewingQuestion);
                                    }}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Edit Question
                                </button>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Test Questions
                        </h2>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                        {questions.map((question) => (
                            <div
                                key={question.id}
                                className="p-6 hover:bg-gray-50"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {question.question}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {question.description}
                                        </p>
                                        <div className="mt-2 flex items-center space-x-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                                                    question.difficulty
                                                )}`}
                                            >
                                                {question.difficulty}
                                            </span>
                                            {/* <span className="text-sm text-gray-500">
                                                {question.testCases} test cases
                                            </span> */}
                                            <span className="text-sm text-gray-500">
                                                Created {question.dateCreated}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex items-center space-x-4">
                                        <button className="text-gray-600 hover:text-blue-600"
                                            onClick={() => handleEdit(question)}
                                        >
                                            Edit
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600"
                                            onClick={() => handleView(question)}
                                        >
                                            View
                                        </button>
                                        {/* i want to add the delete button */}
                                        <button className="text-gray-600 hover:text-red-600"
                                            onClick={() => handleDelete(question)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Edit Test Question
                            </h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-6">
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Question
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900"
                                        value={editingQuestion.question}
                                        onChange={(e) =>
                                            setEditingQuestion({
                                                ...editingQuestion,
                                                question: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Difficulty
                                    </label>
                                    <div className="mt-2 flex space-x-4">
                                        {difficulties.map(
                                            ({ value, color }) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() =>
                                                        setEditingQuestion({
                                                            ...editingQuestion,
                                                            difficulty: value,
                                                        })
                                                    }
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                        editingQuestion.difficulty ===
                                                        value
                                                            ? color
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {value}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Description
                                    </label>
                                    <textarea
                                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900"
                                        rows="4"
                                        value={editingQuestion.description}
                                        onChange={(e) =>
                                            setEditingQuestion({
                                                ...editingQuestion,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-3">
                                        Test Cases
                                    </label>
                                    {editingQuestion.testCases.map(
                                        (testCase, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-2 gap-4 mb-4"
                                            >
                                                <input
                                                    type="text"
                                                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-900"
                                                    placeholder="Input"
                                                    value={testCase.input}
                                                    onChange={(e) =>
                                                        updateTestCase(
                                                            index,
                                                            "input",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-900"
                                                    placeholder="Expected Output"
                                                    value={
                                                        testCase.expectedOutput
                                                    }
                                                    onChange={(e) =>
                                                        updateTestCase(
                                                            index,
                                                            "expectedOutput",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addTestCase}
                                        className="px-4 py-2 text-gray-600 hover:text-blue-600"
                                    >
                                        + Add Test Case
                                    </button>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default View;
