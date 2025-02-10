import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Send } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const SUPPORTED_LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' }
];

const CodeSubmissionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorTheme, setEditorTheme] = useState('light');

  // Default starter code for different languages
  const starterCode = {
    python: '# Write your Python code here\n\ndef solution():\n    pass',
    javascript: '// Write your JavaScript code here\n\nfunction solution() {\n}',
    java: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your Java code here\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    // Write your C++ code here\n    return 0;\n}'
  };

  useEffect(() => {
    // Set initial code based on selected language
    setCode(starterCode[language]);
  }, [language]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        const data = await response.json();
        setQuestion(data);
        // If question specifies a language, set it
        if (data.language && SUPPORTED_LANGUAGES.find(l => l.id === data.language)) {
          setLanguage(data.language);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/submit/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      
      if (data.next_steps) {
        navigate(`/questions/${questionId}/ai-assessment/${data.next_steps.submission_id}`);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const toggleTheme = () => {
    setEditorTheme(editorTheme === 'light' ? 'vs-dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Questions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-8">
          {/* Left Panel - Question Details */}
          <div className="w-2/5 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {question?.title || 'Loading...'}
              </h1>
              <div className="mt-4 text-gray-600">
                {question?.description || 'Loading...'}
              </div>
              {question?.examples && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Examples:</h2>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-md overflow-x-auto">
                    {question.examples}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor and Console */}
          <div className="w-3/5 space-y-6">
            {/* Editor Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleTheme}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600"
                  >
                    Toggle Theme
                  </button>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50"
                  >
                    <Play className="w-5 h-5 inline mr-2" />
                    Run Code
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 inline mr-2" />
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Editor
                height="60vh"
                language={language}
                value={code}
                theme={editorTheme}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  rulers: [80],
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on'
                }}
              />
            </div>

            {/* Console Output */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Console Output</h2>
              <pre className="w-full h-40 p-4 font-mono text-sm bg-gray-50 rounded-md overflow-auto">
                {isRunning ? 'Running code...' : output || 'No output yet'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSubmissionPage;