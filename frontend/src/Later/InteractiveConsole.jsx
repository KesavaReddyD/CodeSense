// import { useState, useEffect, useRef } from 'react';
// import { ArrowLeft, Play, Send } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Editor from '@monaco-editor/react';

// // ... (previous imports and SUPPORTED_LANGUAGES remain the same)

// const InteractiveConsole = ({ isRunning, onInput }) => {
//   const [consoleHistory, setConsoleHistory] = useState([]);
//   const [currentInput, setCurrentInput] = useState('');
//   const consoleEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const scrollToBottom = () => {
//     consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [consoleHistory]);

//   const handleInputSubmit = (e) => {
//     e.preventDefault();
//     if (!currentInput.trim()) return;

//     // Add input to console history
//     setConsoleHistory(prev => [...prev, {
//       type: 'input',
//       content: currentInput
//     }]);

//     // Send input to parent
//     onInput(currentInput);
//     setCurrentInput('');
//   };

//   const addOutput = (output) => {
//     setConsoleHistory(prev => [...prev, {
//       type: 'output',
//       content: output
//     }]);
//   };

//   const clearConsole = () => {
//     setConsoleHistory([]);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-medium text-gray-900">Interactive Console</h2>
//         <button
//           onClick={clearConsole}
//           className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
//         >
//           Clear Console
//         </button>
//       </div>
      
//       <div className="w-full h-60 bg-gray-50 rounded-md overflow-auto p-4 font-mono text-sm">
//         {consoleHistory.map((entry, index) => (
//           <div 
//             key={index} 
//             className={`mb-1 ${entry.type === 'input' ? 'text-blue-600' : 'text-gray-800'}`}
//           >
//             {entry.type === 'input' ? `> ${entry.content}` : entry.content}
//           </div>
//         ))}
        
//         {isRunning && (
//           <div className="text-gray-600">Running code...</div>
//         )}
        
//         <form onSubmit={handleInputSubmit} className="mt-2">
//           <div className="flex items-center">
//             <span className="text-blue-600 mr-2">&gt;</span>
//             <input
//               ref={inputRef}
//               type="text"
//               value={currentInput}
//               onChange={(e) => setCurrentInput(e.target.value)}
//               className="flex-1 bg-transparent border-none outline-none"
//               placeholder={isRunning ? "Enter input..." : "Code not running..."}
//               disabled={!isRunning}
//             />
//           </div>
//         </form>
//         <div ref={consoleEndRef} />
//       </div>
//     </div>
//   );
// };

// const CodeSubmissionPage = () => {
//   // ... (previous state declarations)
//   const [websocket, setWebsocket] = useState(null);
//   const consoleRef = useRef(null);

//   useEffect(() => {
//     // Initialize WebSocket connection when running code
//     if (isRunning) {
//       // Replace with your WebSocket server URL
//       const ws = new WebSocket('ws://your-backend-url/code-execution');
      
//       ws.onopen = () => {
//         // Send initial code and language
//         ws.send(JSON.stringify({
//           type: 'init',
//           code,
//           language
//         }));
//       };

//       ws.onmessage = (event) => {
//         const data = JSON.parse(event.data);
        
//         if (data.type === 'output') {
//           consoleRef.current?.addOutput(data.content);
//         } else if (data.type === 'finished') {
//           setIsRunning(false);
//           setWebsocket(null);
//         }
//       };

//       ws.onclose = () => {
//         setIsRunning(false);
//         setWebsocket(null);
//       };

//       setWebsocket(ws);
//       return () => ws.close();
//     }
//   }, [isRunning, code, language]);

//   const handleRunCode = async () => {
//     setIsRunning(true);
//     consoleRef.current?.clearConsole();
    
//     // WebSocket connection will be established via useEffect
//   };

//   const handleConsoleInput = (input) => {
//     if (websocket && websocket.readyState === WebSocket.OPEN) {
//       websocket.send(JSON.stringify({
//         type: 'input',
//         content: input
//       }));
//     }
//   };

//   return (
//     // ... (previous JSX until the Console Output section)
    
//     {/* Replace Console Output with Interactive Console */}
//     <InteractiveConsole
//       ref={consoleRef}
//       isRunning={isRunning}
//       onInput={handleConsoleInput}
//     />
//   );
// };

// export default CodeSubmissionPage;