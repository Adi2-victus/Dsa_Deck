import { useState, useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';

const langMap = {
        cpp: 'C++',
        java: 'Java',
        javascript: 'JavaScript'
};


const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let {problemId}  = useParams();

  

  const { handleSubmit } = useForm();

 useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
       
        
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;

        setProblem(response.data);
        
        setCode(initialCode);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
      
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        // error: 'Internal server error'
        error: error.response?.status === 429 
        ? 'Too many requests. Please wait and try again later.' 
        : 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    
    try {
        const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code:code,
        language: selectedLanguage
      });

       setSubmitResult(response.data);
       setLoading(false);
       setActiveRightTab('result');
      
    } catch (error) {
      console.error('Error submitting code:', error);
      // setSubmitResult(null);
       setSubmitResult({
      accepted: false,
      error: error.response?.status === 429
        ? 'Too many submissions. Please wait before submitting again.'
        : 'Submission failed'
    });
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-base-100">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col border-r border-base-300">
        {/* Left Tabs */}
        <div className="tabs tabs-bordered bg-base-200 px-4">
          <button 
            className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('editorial')}
          >
            Editorial
          </button>
          <button 
            className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('solutions')}
          >
            Solutions
          </button>
          <button 
            className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('submissions')}
          >
            Submissions
          </button>

          <button 
            className={`tab ${activeLeftTab === 'chatAI' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('chatAI')}
          >
            ChatAI
          </button>


        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {problem && (
            <>
              {activeLeftTab === 'description' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold">{problem.title}</h1>
                    <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </div>
                    <div className="badge badge-primary">{problem.tags}</div>
                  </div>

                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {problem.description}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Examples:</h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-base-200 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2 text-sm font-mono">
                            <div><strong>Input:</strong> {example.input}</div>
                            <div><strong>Output:</strong> {example.output}</div>
                            <div><strong>Explanation:</strong> {example.explanation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">Editorial</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
                  </div>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Solutions</h2>
                  <div className="space-y-6">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="border border-base-300 rounded-lg">
                        <div className="bg-base-200 px-4 py-2 rounded-t-lg">
                          <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
                        </div>
                        <div className="p-4">
                          <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                  <div className="text-gray-500">
                    <SubmissionHistory problemId={problemId} />
                  </div>
                </div>
              )}

              {activeLeftTab === 'chatAI' && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">CHAT with AI</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    <ChatAi problem={problem}></ChatAi>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col">
        {/* Right Tabs */}
        <div className="tabs tabs-bordered bg-base-200 px-4">
          <button 
            className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('code')}
          >
            Code
          </button>
          <button 
            className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('testcase')}
          >
            Testcase
          </button>
          <button 
            className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('result')}
          >
            Result
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center p-4 border-b border-base-300">
                <div className="flex gap-2">
                  {['javascript', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-base-300 flex justify-between">
                <div className="flex gap-2">
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => setActiveRightTab('testcase')}
                  >
                    Console
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  >
                    Run
                  </button>
                  <button
                    className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Test Results</h3>
              {runResult ? (
                <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
                  <div>
                    {runResult.success ? (
                      <div>
                        <h4 className="font-bold">✅ All test cases passed!</h4>
                        <p className="text-sm mt-2">Runtime: {runResult.runtime+" sec"}</p>
                        <p className="text-sm">Memory: {runResult.memory+" KB"}</p>
                        
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-base-100 p-3 rounded text-xs">
                              <div className="font-mono">
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div className={'text-green-600'}>
                                  {'✓ Passed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold">❌ Error</h4>
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-base-100 p-3 rounded text-xs">
                              <div className="font-mono">
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
                                  {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  Click "Run" to test your code with the example test cases.
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Submission Result</h3>
              {submitResult ? (
                <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'}`}>
                  <div>
                    {submitResult.accepted ? (
                      <div>
                        <h4 className="font-bold text-lg">🎉 Accepted</h4>
                        <div className="mt-4 space-y-2">
                          <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                          <p>Runtime: {submitResult.runtime + " sec"}</p>
                          <p>Memory: {submitResult.memory + "KB"} </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
                        <div className="mt-4 space-y-2">
                          <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  Click "Submit" to submit your solution for evaluation.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;





// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router';
// import axiosClient from "../utils/axiosClient"
// import SubmissionHistory from "../components/SubmissionHistory"
// import ChatAi from '../components/ChatAi';
// import Editorial from '../components/Editorial';
// import { 
//   Code, 
//   BookOpen, 
//   FileText, 
//   MessageSquare, 
//   Clock, 
//   CheckCircle, 
//   XCircle,
//   ChevronRight,
//   ChevronLeft,
//   Play,
//   Send,
//   History,
//   Video,
//   Terminal
// } from 'lucide-react';

// const langMap = {
//   cpp: 'C++',
//   java: 'Java',
//   javascript: 'JavaScript'
// };

// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState('description');
//   const [activeRightTab, setActiveRightTab] = useState('code');
//   const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
//   const editorRef = useRef(null);
//   let { problemId } = useParams();

//   const { handleSubmit } = useForm();

//   useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosClient.get(`/problem/problemById/${problemId}`);
//         const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;

//         setProblem(response.data);
//         setCode(initialCode);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching problem:', error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);

//   // Update code when language changes
//   useEffect(() => {
//     if (problem) {
//       const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
//       setCode(initialCode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || '');
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleRun = async () => {
//     setLoading(true);
//     setRunResult(null);
    
//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab('testcase');
//     } catch (error) {
//       console.error('Error running code:', error);
//       setRunResult({
//         success: false,
//         error: 'Internal server error'
//       });
//       setLoading(false);
//       setActiveRightTab('testcase');
//     }
//   };

//   const handleSubmitCode = async () => {
//     setLoading(true);
//     setSubmitResult(null);
    
//     try {
//       const response = await axiosClient.post(`/submission/submit/${problemId}`, {
//         code: code,
//         language: selectedLanguage
//       });

//       setSubmitResult(response.data);
//       setLoading(false);
//       setActiveRightTab('result');
//     } catch (error) {
//       console.error('Error submitting code:', error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab('result');
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case 'javascript': return 'javascript';
//       case 'java': return 'java';
//       case 'cpp': return 'cpp';
//       default: return 'javascript';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy': return 'badge-success';
//       case 'medium': return 'badge-warning';
//       case 'hard': return 'badge-error';
//       default: return 'badge-neutral';
//     }
//   };

//   const getStatusIcon = (status) => {
//     return status === 'success' ? 
//       <CheckCircle className="text-success" size={20} /> : 
//       <XCircle className="text-error" size={20} />;
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-base-100">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
//       {/* Collapse Button */}
//       <button 
//         className="fixed top-1/2 left-0 z-20 bg-base-300 p-2 rounded-r-lg shadow-lg lg:hidden"
//         onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
//       >
//         {isLeftPanelCollapsed ? <ChevronRight /> : <ChevronLeft />}
//       </button>

//       {/* Left Panel */}
//       <div 
//         className={`w-full lg:w-1/2 flex flex-col bg-base-100 transition-all duration-300 ${
//           isLeftPanelCollapsed ? 'hidden lg:flex' : 'flex'
//         }`}
//       >
//         {/* Left Tabs */}
//         <div className="tabs tabs-boxed bg-base-200 p-2 gap-1">
//           <button 
//             className={`tab flex items-center gap-2 ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('description')}
//           >
//             <BookOpen size={16} />
//             Description
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('editorial')}
//           >
//             <Video size={16} />
//             Editorial
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('solutions')}
//           >
//             <Code size={16} />
//             Solutions
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('submissions')}
//           >
//             <History size={16} />
//             Submissions
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeLeftTab === 'chatAI' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('chatAI')}
//           >
//             <MessageSquare size={16} />
//             ChatAI
//           </button>
//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6 bg-base-100">
//           {problem && (
//             <>
//               {activeLeftTab === 'description' && (
//                 <div className="space-y-6">
//                   <div className="flex flex-wrap items-center gap-4">
//                     <h1 className="text-2xl font-bold">{problem.title}</h1>
//                     <div className={`badge ${getDifficultyColor(problem.difficulty)}`}>
//                       {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
//                     </div>
//                     <div className="badge badge-primary">{problem.tags}</div>
//                   </div>

//                   <div className="prose max-w-none bg-base-200 p-4 rounded-box">
//                     <div className="whitespace-pre-wrap text-base leading-relaxed">
//                       {problem.description}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                       Examples:
//                     </h3>
//                     <div className="space-y-4">
//                       {problem.visibleTestCases.map((example, index) => (
//                         <div key={index} className="bg-base-200 p-4 rounded-box border border-base-300">
//                           <h4 className="font-semibold mb-3">Example {index + 1}:</h4>
//                           <div className="space-y-3 text-base">
//                             <div>
//                               <span className="font-bold text-primary">Input:</span> 
//                               <pre className="bg-base-100 p-2 rounded mt-1">{example.input}</pre>
//                             </div>
//                             <div>
//                               <span className="font-bold text-primary">Output:</span> 
//                               <pre className="bg-base-100 p-2 rounded mt-1">{example.output}</pre>
//                             </div>
//                             <div>
//                               <span className="font-bold text-primary">Explanation:</span> 
//                               <div className="mt-1">{example.explanation}</div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'editorial' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                     <Video size={20} />
//                     Editorial
//                   </h2>
//                   <div className="bg-base-200 p-4 rounded-box">
//                     <Editorial 
//                       secureUrl={problem.secureUrl} 
//                       thumbnailUrl={problem.thumbnailUrl} 
//                       duration={problem.duration}
//                     />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'solutions' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                     <Code size={20} />
//                     Solutions
//                   </h2>
//                   <div className="space-y-6">
//                     {problem.referenceSolution?.map((solution, index) => (
//                       <div key={index} className="bg-base-200 rounded-box border border-base-300">
//                         <div className="bg-base-300 px-4 py-3 rounded-t-box flex items-center justify-between">
//                           <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
//                           <div className="badge badge-primary">Accepted</div>
//                         </div>
//                         <div className="p-4">
//                           <pre className="bg-base-100 p-4 rounded-box text-sm overflow-x-auto">
//                             <code>{solution?.completeCode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     )) || <div className="alert alert-info">
//                       Solutions will be available after you solve the problem.
//                     </div>}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'submissions' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                     <History size={20} />
//                     My Submissions
//                   </h2>
//                   <div className="bg-base-200 p-4 rounded-box">
//                     <SubmissionHistory problemId={problemId} />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'chatAI' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                     <MessageSquare size={20} />
//                     CHAT with AI
//                   </h2>
//                   <div className="bg-base-200 p-4 rounded-box">
//                     <ChatAi problem={problem} />
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-full lg:w-1/2 flex flex-col border-l border-base-300">
//         {/* Right Tabs */}
//         <div className="tabs tabs-boxed bg-base-200 p-2 gap-1">
//           <button 
//             className={`tab flex items-center gap-2 ${activeRightTab === 'code' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('code')}
//           >
//             <Code size={16} />
//             Code
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('testcase')}
//           >
//             <Terminal size={16} />
//             Testcase
//           </button>
//           <button 
//             className={`tab flex items-center gap-2 ${activeRightTab === 'result' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('result')}
//           >
//             <FileText size={16} />
//             Result
//           </button>
//         </div>

//         {/* Right Content */}
//         <div className="flex-1 flex flex-col bg-base-100">
//           {activeRightTab === 'code' && (
//             <div className="flex-1 flex flex-col">
//               {/* Language Selector */}
//               <div className="flex justify-between items-center p-4 bg-base-200">
//                 <div className="flex gap-2">
//                   {['javascript', 'java', 'cpp'].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-outline'}`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="text-sm opacity-70">
//                   <Clock size={16} className="inline mr-1" />
//                   {problem?.timeLimit} sec time limit
//                 </div>
//               </div>

//               {/* Monaco Editor */}
//               <div className="flex-1">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme="vs-dark"
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: 'on',
//                     lineNumbers: 'on',
//                     glyphMargin: false,
//                     folding: true,
//                     lineDecorationsWidth: 10,
//                     lineNumbersMinChars: 3,
//                     renderLineHighlight: 'line',
//                     selectOnLineNumbers: true,
//                     roundedSelection: false,
//                     readOnly: false,
//                     cursorStyle: 'line',
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 bg-base-200 border-t border-base-300 flex justify-between">
//                 <div className="flex gap-2">
//                   <button 
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setActiveRightTab('testcase')}
//                   >
//                     <Terminal size={16} className="mr-1" />
//                     Console
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     <Play size={16} className="mr-1" />
//                     Run
//                   </button>
//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     <Send size={16} className="mr-1" />
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeRightTab === 'testcase' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Terminal size={20} />
//                 Test Results
//               </h3>
              
//               {runResult ? (
//                 <div className={`rounded-box p-4 mb-4 ${
//                   runResult.success ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
//                 }`}>
//                   <div>
//                     <div className="flex items-center gap-2 mb-3">
//                       {runResult.success ? 
//                         <CheckCircle className="text-success" size={24} /> : 
//                         <XCircle className="text-error" size={24} />}
//                       <h4 className="font-bold text-lg">
//                         {runResult.success ? "✅ All test cases passed!" : "❌ Some test cases failed"}
//                       </h4>
//                     </div>
                    
//                     <div className="stats stats-horizontal bg-base-100 shadow w-full mb-4">
//                       <div className="stat">
//                         <div className="stat-title">Runtime</div>
//                         <div className="stat-value text-success">{runResult.runtime || 0}s</div>
//                       </div>
                      
//                       <div className="stat">
//                         <div className="stat-title">Memory</div>
//                         <div className="stat-value text-info">{runResult.memory || 0}KB</div>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {runResult.testCases.map((tc, i) => (
//                         <div key={i} className="bg-base-100 p-4 rounded-box border border-base-300">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="font-bold">Test Case {i + 1}</div>
//                             <div className={`flex items-center gap-1 ${tc.status_id === 3 ? 'text-success' : 'text-error'}`}>
//                               {tc.status_id === 3 ? <CheckCircle size={16} /> : <XCircle size={16} />}
//                               {tc.status_id === 3 ? 'Passed' : 'Failed'}
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div>
//                               <div className="text-sm font-semibold text-primary mb-1">Input</div>
//                               <pre className="bg-base-200 p-2 rounded text-sm">{tc.stdin}</pre>
//                             </div>
                            
//                             <div>
//                               <div className="text-sm font-semibold text-primary mb-1">Output</div>
//                               <pre className="bg-base-200 p-2 rounded text-sm">{tc.stdout}</pre>
//                             </div>
                            
//                             <div>
//                               <div className="text-sm font-semibold text-primary mb-1">Expected</div>
//                               <pre className="bg-base-200 p-2 rounded text-sm">{tc.expected_output}</pre>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="alert alert-info">
//                   <div>
//                     <Terminal size={24} />
//                     <span>Click "Run" to test your code with the example test cases.</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeRightTab === 'result' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <FileText size={20} />
//                 Submission Result
//               </h3>
              
//               {submitResult ? (
//                 <div className={`rounded-box p-6 mb-4 ${
//                   submitResult.accepted ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
//                 }`}>
//                   <div>
//                     <div className="flex items-center gap-3 mb-4">
//                       {submitResult.accepted ? 
//                         <CheckCircle className="text-success" size={28} /> : 
//                         <XCircle className="text-error" size={28} />}
//                       <div>
//                         <h4 className="font-bold text-xl">
//                           {submitResult.accepted ? "🎉 Accepted" : `❌ ${submitResult.error}`}
//                         </h4>
//                         <p className="text-sm opacity-80">
//                           {submitResult.accepted ? 
//                             "Your solution passed all test cases!" : 
//                             "Your solution did not pass all test cases"}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="stats stats-horizontal bg-base-100 shadow w-full mb-6">
//                       <div className="stat">
//                         <div className="stat-title">Test Cases</div>
//                         <div className="stat-value">
//                           <span className="text-success">{submitResult.passedTestCases}</span>
//                           <span className="opacity-70">/{submitResult.totalTestCases}</span>
//                         </div>
//                       </div>
                      
//                       <div className="stat">
//                         <div className="stat-title">Runtime</div>
//                         <div className="stat-value text-success">{submitResult.runtime || 0}s</div>
//                       </div>
                      
//                       <div className="stat">
//                         <div className="stat-title">Memory</div>
//                         <div className="stat-value text-info">{submitResult.memory || 0}KB</div>
//                       </div>
//                     </div>
                    
//                     {!submitResult.accepted && (
//                       <div className="space-y-4">
//                         <div className="text-lg font-semibold">Failed Test Cases:</div>
                        
//                         {submitResult.failedCases?.map((tc, i) => (
//                           <div key={i} className="bg-base-100 p-4 rounded-box border border-base-300">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                               <div>
//                                 <div className="text-sm font-semibold text-primary mb-1">Input</div>
//                                 <pre className="bg-base-200 p-2 rounded text-sm">{tc.input}</pre>
//                               </div>
                              
//                               <div>
//                                 <div className="text-sm font-semibold text-primary mb-1">Your Output</div>
//                                 <pre className="bg-base-200 p-2 rounded text-sm">{tc.actualOutput}</pre>
//                               </div>
                              
//                               <div>
//                                 <div className="text-sm font-semibold text-primary mb-1">Expected</div>
//                                 <pre className="bg-base-200 p-2 rounded text-sm">{tc.expectedOutput}</pre>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="alert alert-info">
//                   <div>
//                     <Send size={24} />
//                     <span>Click "Submit" to submit your solution for evaluation.</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;