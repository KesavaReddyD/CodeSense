import React, { useState } from 'react';

const Create = () => {
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    difficulty: 'Easy',
    testCases: [{ input: '', expectedOutput: '' }]
  });

  const difficulties = [
    { value: 'Easy', color: 'bg-green-100 text-green-800' },
    { value: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Hard', color: 'bg-red-100 text-red-800' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  const updateTestCase = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', expectedOutput: '' }]
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Create New Test</h2>
          </div>
          
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Question</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="Enter test question"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Difficulty</label>
                <div className="mt-2 flex space-x-4">
                  {difficulties.map(({ value, color }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData({...formData, difficulty: value})}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        formData.difficulty === value 
                          ? color
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                  className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter detailed description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">Test Cases</label>
                {formData.testCases.map((testCase, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Expected Output"
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTestCase}
                  className="px-4 py-2 text-gray-600 hover:text-blue-600"
                >
                  + Add Test Case
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit Test
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;