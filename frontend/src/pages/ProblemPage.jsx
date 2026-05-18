


import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';

const langMap = { cpp: 'C++', java: 'Java', javascript: 'JavaScript' };
const toLang  = (l) => ({ javascript: 'javascript', java: 'java', cpp: 'cpp' }[l] || 'javascript');

const DIFF = {
  easy:   { label: 'Easy',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  medium: { label: 'Medium', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30'   },
  hard:   { label: 'Hard',   color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/30'     },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const I = {
  home:   <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  play:   <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>,
  send:   <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  ok:     <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  x:      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  clock:  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
  chip:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/></svg>,
  file:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>,
  play2:  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>,
  code:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  hist:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/></svg>,
  bot:    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM9 13c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z"/></svg>,
  term:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM6.5 11.5l1.41-1.41L10 12.17l-2.09 2.08L6.5 12.84 7.91 11.5zm5 5.5H18v-2h-6.5v2z"/></svg>,
  result: <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>,
  chevR:  <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>,
};

export default function ProblemPage() {
  const [problem,      setProblem]      = useState(null);
  const [lang,         setLang]         = useState('javascript');
  const [code,         setCode]         = useState('');
  const [loading,      setLoading]      = useState(false);
  const [runResult,    setRunResult]    = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [leftTab,      setLeftTab]      = useState('description');
  const [rightTab,     setRightTab]     = useState('code');
  const [panelW,       setPanelW]       = useState(50);
  const [dragging,     setDragging]     = useState(false);
  const editorRef = useRef(null);
  const splitRef  = useRef(null);
  const { problemId } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res  = await axiosClient.get(`/problem/problemById/${problemId}`);
        const init = res.data.startCode?.find(s => s.language === langMap[lang])?.initialCode || '';
        setProblem(res.data); setCode(init);
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [problemId]);

  useEffect(() => {
    if (problem) setCode(problem.startCode?.find(s => s.language === langMap[lang])?.initialCode || '');
  }, [lang, problem]);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  useEffect(() => {
    const move = (e) => {
      if (!dragging || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      setPanelW(Math.min(70, Math.max(30, ((e.clientX - rect.left) / rect.width) * 100)));
    };
    const up = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [dragging]);

  const handleRun = async () => {
    setLoading(true); setRunResult(null);
    try {
      const r = await axiosClient.post(`/submission/run/${problemId}`, { code, language: lang });
      setRunResult(r.data); setRightTab('testcase');
    } catch(e) {
      setRunResult({ success: false, error: e.response?.status === 429 ? 'Rate limited.' : 'Server error' });
      setRightTab('testcase');
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true); setSubmitResult(null);
    try {
      const r = await axiosClient.post(`/submission/submit/${problemId}`, { code, language: lang });
      setSubmitResult(r.data); setRightTab('result');
    } catch(e) {
      setSubmitResult({ accepted: false, error: e.response?.status === 429 ? 'Rate limited.' : 'Submission failed' });
      setRightTab('result');
    } finally { setLoading(false); }
  };

  const diff = problem ? (DIFF[problem.difficulty?.toLowerCase()] || DIFF.easy) : null;
  const tags = problem ? (typeof problem.tags === 'string' ? problem.tags.split(',').map(t => t.trim()) : problem.tags || []) : [];

  const LT = [
    { id: 'description', label: 'Problem',   icon: I.file  },
    { id: 'editorial',   label: 'Editorial', icon: I.play2 },
    { id: 'solutions',   label: 'Solutions', icon: I.code  },
    { id: 'submissions', label: 'History',   icon: I.hist  },
    { id: 'chatAI',      label: 'AI',        icon: I.bot   },
  ];
  const RT = [
    { id: 'code',     label: 'Editor',  icon: I.code   },
    { id: 'testcase', label: 'Console', icon: I.term   },
    { id: 'result',   label: 'Result',  icon: I.result },
  ];

  // ── Section head reusable ──
  const SectionHead = ({ children, className = '' }) => (
    <div className={`flex items-center gap-2 text-[0.6rem] font-bold tracking-[2px] uppercase text-zinc-600 my-5 ${className}`}>
      <span className="w-4 h-[1.5px] bg-emerald-500 flex-shrink-0" />
      {children}
    </div>
  );

  // ── Full screen loader ──
  if (loading && !problem) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111113] gap-5">
      <div className="flex gap-[6px]">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <p className="font-mono text-[0.7rem] text-emerald-900 tracking-[3px] uppercase">loading problem</p>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}} @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#111113] text-[#e8e8ea] overflow-hidden">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        .anim-fadeup  { animation: fadeUp .3s ease both; }
        .anim-fadein  { animation: fadeIn .3s ease both; }
        .scroll-panel::-webkit-scrollbar { width: 3px; }
        .scroll-panel::-webkit-scrollbar-thumb { background: #242428; border-radius: 2px; }
        .scroll-panel::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,.3); }
        .tab-active::before { transform: scaleX(1) !important; }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="h-12 flex-shrink-0 flex items-center justify-between px-4 gap-3 bg-[#161618] border-b border-white/[0.07] z-50">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Traffic lights */}
          <div className="flex gap-[5px] flex-shrink-0">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57] hover:brightness-125 cursor-pointer transition-all" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e] hover:brightness-125 cursor-pointer transition-all" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840] hover:brightness-125 cursor-pointer transition-all" />
          </div>
          <div className="w-px h-4 bg-white/[0.07] flex-shrink-0" />
          {/* Breadcrumb */}
          <div className="flex items-center gap-[5px] text-[0.72rem] text-zinc-600 min-w-0">
            <NavLink to="/"
              className="flex items-center justify-center w-[26px] h-[26px] rounded-md text-zinc-400
                         hover:bg-[#242428] hover:text-emerald-400 transition-all no-underline">
              {I.home}
            </NavLink>
            <span className="text-[0.65rem]">{I.chevR}</span>
            <span className="text-[#e8e8ea] font-semibold text-[0.78rem] whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
              {problem?.title || '…'}
            </span>
          </div>
          {/* Diff chip */}
          {diff && (
            <span className={`px-2 py-[2px] rounded text-[0.63rem] font-semibold font-mono border
                              ${diff.color} ${diff.bg} ${diff.border}`}>
              {diff.label}
            </span>
          )}
          {/* Tags */}
          {tags.slice(0, 2).map(t => (
            <span key={t} className="px-2 py-[2px] rounded text-[0.63rem] font-medium
                                     bg-[#242428] border border-white/[0.07] text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        {/* Right — action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setRightTab('testcase')}
            className="inline-flex items-center gap-[6px] px-[14px] py-[5px] rounded-md text-[0.72rem] font-semibold
                       bg-[#242428] border border-white/[0.07] text-zinc-400
                       hover:bg-[#1c1c1f] hover:border-white/[0.12] hover:text-[#e8e8ea]
                       transition-all cursor-pointer"
          >
            {I.term} Console
          </button>
          <button
            onClick={handleRun} disabled={loading}
            className="inline-flex items-center gap-[6px] px-[14px] py-[5px] rounded-md text-[0.72rem] font-semibold
                       bg-emerald-500/10 border border-emerald-500/30 text-emerald-300
                       hover:bg-emerald-500/[0.18] hover:border-emerald-500/50 hover:text-emerald-200
                       hover:shadow-[0_0_16px_rgba(16,185,129,.15)]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all cursor-pointer"
          >
            {loading
              ? <span className="w-[11px] h-[11px] border-[1.5px] border-current border-t-transparent rounded-full animate-spin opacity-80" />
              : I.play}
            Run
          </button>
          <button
            onClick={handleSubmit} disabled={loading}
            className="inline-flex items-center gap-[6px] px-[14px] py-[5px] rounded-md text-[0.72rem] font-bold
                       bg-emerald-500 border-transparent text-[#002d1f]
                       hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,.35)] hover:-translate-y-px
                       active:translate-y-0
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all cursor-pointer relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
                             -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            {loading
              ? <span className="w-[11px] h-[11px] border-[1.5px] border-[#002d1f]/30 border-t-[#002d1f] rounded-full animate-spin" />
              : I.send}
            Submit
          </button>
        </div>
      </div>

      {/* ── SPLIT ── */}
      <div ref={splitRef} className="flex flex-1 overflow-hidden min-h-0">

        {/* LEFT PANEL */}
        <div className="flex flex-col overflow-hidden min-w-0" style={{ width: `${panelW}%` }}>
          {/* Tab bar */}
          <div className="flex flex-shrink-0 bg-[#161618] border-b border-white/[0.07] overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}>
            {LT.map(t => (
              <button key={t.id}
                onClick={() => setLeftTab(t.id)}
                className={`inline-flex items-center gap-[5px] px-[14px] h-[38px] flex-shrink-0
                            text-[0.7rem] font-medium border-none border-r border-white/[0.07]
                            cursor-pointer transition-colors relative
                            before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]
                            before:bg-emerald-500 before:scale-x-0 before:transition-transform before:duration-200
                            ${leftTab === t.id
                              ? 'text-[#e8e8ea] bg-[#111113] before:scale-x-100'
                              : 'text-zinc-600 bg-transparent hover:text-zinc-400 hover:bg-[#1c1c1f]'
                            }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Left scroll content */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#111113] scroll-panel">
            {problem && (
              <>
                {/* DESCRIPTION */}
                {leftTab === 'description' && (
                  <div className="anim-fadeup">
                    <h1 className="text-[1.05rem] font-extrabold leading-snug text-[#e8e8ea] mb-3 tracking-tight">
                      {problem.title}
                    </h1>
                    <div className="flex items-center gap-2 flex-wrap mb-5">
                      {diff && (
                        <span className={`px-2 py-[2px] rounded text-[0.63rem] font-semibold font-mono border
                                          ${diff.color} ${diff.bg} ${diff.border}`}>
                          {diff.label}
                        </span>
                      )}
                      {tags.map(t => (
                        <span key={t} className="px-2 py-[2px] rounded text-[0.63rem] font-medium
                                                  bg-[#242428] border border-white/[0.07] text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-[0.84rem] leading-[1.85] text-zinc-400 whitespace-pre-wrap">
                      {problem.description}
                    </p>
                    <SectionHead>Examples</SectionHead>
                    {problem.visibleTestCases?.map((ex, i) => (
                      <div key={i}
                        className="bg-[#161618] border border-white/[0.07] rounded-lg mb-3 overflow-hidden
                                   hover:border-emerald-500/20 transition-colors anim-fadeup"
                        style={{ animationDelay: `${i * 55}ms` }}>
                        <div className="px-[14px] py-[7px] border-b border-white/[0.07]
                                        text-[0.6rem] font-bold tracking-[1.5px] uppercase text-emerald-500">
                          Example {i + 1}
                        </div>
                        <div className="px-[14px] py-3 font-mono text-[0.71rem]">
                          {[['Input', ex.input], ['Output', ex.output], ex.explanation ? ['Note', ex.explanation] : null]
                            .filter(Boolean).map(([k, v]) => (
                              <div key={k} className="flex gap-[10px] leading-[2]">
                                <span className="text-zinc-600 min-w-[65px]">{k}</span>
                                <span className="text-zinc-400">{v}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EDITORIAL */}
                {leftTab === 'editorial' && (
                  <div className="anim-fadeup">
                    <SectionHead className="mt-0">Editorial</SectionHead>
                    <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
                  </div>
                )}

                {/* SOLUTIONS */}
                {leftTab === 'solutions' && (
                  <div className="anim-fadeup">
                    <SectionHead className="mt-0">Reference Solutions</SectionHead>
                    {problem.referenceSolution?.length
                      ? problem.referenceSolution.map((s, i) => (
                          <div key={i} className="border border-white/[0.07] rounded-lg mb-3 overflow-hidden anim-fadeup"
                            style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex justify-between px-[14px] py-2 bg-[#1c1c1f]
                                            border-b border-white/[0.07] text-[0.7rem] font-semibold text-zinc-400">
                              <span>{s.language}</span>
                              <span className="opacity-50">{problem.title}</span>
                            </div>
                            <div className="bg-black/40 p-[14px] overflow-x-auto">
                              <code className="font-mono text-[0.71rem] text-green-300 leading-[1.75] whitespace-pre">
                                {s.completeCode}
                              </code>
                            </div>
                          </div>
                        ))
                      : (
                        <div className="flex flex-col items-center justify-center min-h-[180px] gap-3 text-zinc-600 text-[0.75rem]">
                          <span className="text-[1.8rem] opacity-15">🔐</span>
                          Solve the problem to unlock solutions
                        </div>
                      )}
                  </div>
                )}

                {/* SUBMISSIONS */}
                {leftTab === 'submissions' && (
                  <div className="anim-fadeup">
                    <SectionHead className="mt-0">Submission History</SectionHead>
                    <SubmissionHistory problemId={problemId} />
                  </div>
                )}

                {/* AI CHAT */}
                {leftTab === 'chatAI' && (
                  <div className="anim-fadeup">
                    <SectionHead className="mt-0">AI Assistant</SectionHead>
                    <ChatAi problem={problem} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* DRAG DIVIDER */}
        <div
          onMouseDown={onMouseDown}
          className={`w-1 flex-shrink-0 cursor-col-resize z-10 flex items-center justify-center
                      transition-colors duration-150 select-none
                      ${dragging ? 'bg-emerald-500' : 'bg-white/[0.07] hover:bg-emerald-500'}`}
        >
          <span className="text-emerald-500/40 text-[10px]" style={{ writingMode: 'vertical-lr', letterSpacing: 2 }}>⠿</span>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col overflow-hidden min-w-0 flex-1">
          {/* Tab bar */}
          <div className="flex flex-shrink-0 bg-[#161618] border-b border-white/[0.07] overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}>
            {RT.map(t => (
              <button key={t.id}
                onClick={() => setRightTab(t.id)}
                className={`inline-flex items-center gap-[5px] px-[14px] h-[38px] flex-shrink-0
                            text-[0.7rem] font-medium border-none border-r border-white/[0.07]
                            cursor-pointer transition-colors relative
                            before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]
                            before:bg-emerald-500 before:scale-x-0 before:transition-transform before:duration-200
                            ${rightTab === t.id
                              ? 'text-[#e8e8ea] bg-[#111113] before:scale-x-100'
                              : 'text-zinc-600 bg-transparent hover:text-zinc-400 hover:bg-[#1c1c1f]'
                            }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* CODE */}
          {rightTab === 'code' && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Lang bar */}
              <div className="flex items-center justify-between px-3 py-[6px] flex-shrink-0
                              bg-[#161618] border-b border-white/[0.07]">
                <div className="flex gap-[2px]">
                  {[{ k: 'javascript', l: 'JS' }, { k: 'java', l: 'Java' }, { k: 'cpp', l: 'C++' }].map(({ k, l }) => (
                    <button key={k} onClick={() => setLang(k)}
                      className={`px-3 py-1 rounded text-[0.68rem] font-semibold font-mono cursor-pointer
                                  transition-all border
                                  ${lang === k
                                    ? 'bg-[#242428] border-emerald-500/35 text-emerald-300'
                                    : 'bg-transparent border-transparent text-zinc-600 hover:bg-[#242428] hover:text-zinc-400'
                                  }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-[6px] text-[0.63rem] font-mono text-zinc-600">
                  <span className={`w-[5px] h-[5px] rounded-full ${loading
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,.6)]'}`}
                  />
                  {loading ? 'running' : 'ready'}
                </div>
              </div>
              {/* Monaco */}
              <div className="flex-1 overflow-hidden min-h-0">
                <Editor
                  height="100%"
                  language={toLang(lang)}
                  value={code}
                  onChange={v => setCode(v || '')}
                  onMount={e => editorRef.current = e}
                  theme="vs-dark"
                  options={{
                    fontSize: 13, minimap: { enabled: false },
                    scrollBeyondLastLine: false, automaticLayout: true,
                    tabSize: 2, wordWrap: 'on', lineNumbers: 'on',
                    glyphMargin: false, folding: true,
                    lineDecorationsWidth: 6, lineNumbersMinChars: 3,
                    renderLineHighlight: 'line', cursorStyle: 'line',
                    mouseWheelZoom: true, padding: { top: 14 },
                    fontFamily: "'JetBrains Mono', monospace",
                    fontLigatures: true,
                  }}
                />
              </div>
            </div>
          )}

          {/* CONSOLE */}
          {rightTab === 'testcase' && (
            <div className="flex-1 overflow-y-auto p-[18px] bg-[#111113] scroll-panel">
              <SectionHead className="mt-0">Console</SectionHead>

              {!runResult ? (
                <div className="flex flex-col items-center justify-center min-h-[180px] gap-3 text-zinc-600 text-[0.75rem]">
                  <span className="text-[1.8rem] opacity-15">▷</span>
                  Hit Run to execute test cases
                </div>
              ) : (
                <>
                  {/* Banner */}
                  <div className={`flex items-start gap-3 rounded-lg p-[14px] mb-4 border anim-fadein
                                   ${runResult.success
                                     ? 'bg-emerald-500/[0.07] border-emerald-500/20'
                                     : 'bg-red-500/[0.07] border-red-500/20'}`}>
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0
                                     ${runResult.success ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                      {runResult.success ? I.ok : I.x}
                    </div>
                    <div>
                      <p className={`text-[0.85rem] font-bold mb-1 ${runResult.success ? 'text-emerald-300' : 'text-red-400'}`}>
                        {runResult.success ? 'All tests passed' : 'Tests failed'}
                      </p>
                      <p className="text-[0.72rem] text-zinc-600">
                        {runResult.error || (runResult.success ? 'Your solution handles all visible test cases.' : 'Check your logic.')}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  {runResult.success && (
                    <div className="flex gap-2 flex-wrap mb-4">
                      {[{ icon: I.clock, k: 'Runtime', v: `${runResult.runtime}s` },
                        { icon: I.chip,  k: 'Memory',  v: `${runResult.memory} KB` }].map(s => (
                        <div key={s.k} className="flex items-center gap-[6px] px-3 py-[6px] rounded-md
                                                   bg-[#1c1c1f] border border-white/[0.07] text-[0.68rem] font-mono">
                          <span className="text-emerald-400">{s.icon}</span>
                          <span className="text-zinc-600">{s.k}</span>
                          <span className="text-[#e8e8ea] font-semibold ml-[2px]">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Test cases */}
                  <div className="flex flex-col gap-[6px]">
                    {runResult.testCases?.map((tc, i) => {
                      const pass = tc.status_id === 3;
                      return (
                        <div key={i}
                          className={`border rounded-md overflow-hidden anim-fadeup transition-colors
                                      ${pass
                                        ? 'border-white/[0.07] hover:border-emerald-500/20'
                                        : 'border-white/[0.07] hover:border-red-500/20'}`}
                          style={{ animationDelay: `${i * 35}ms` }}>
                          <div className="flex items-center justify-between px-3 py-[6px]
                                          bg-[#1c1c1f] border-b border-white/[0.07] text-[0.63rem] font-semibold">
                            <span className="font-mono text-zinc-600">case_{String(i + 1).padStart(2, '0')}</span>
                            <span className={`flex items-center gap-1 ${pass ? 'text-emerald-400' : 'text-red-400'}`}>
                              {pass ? <>{I.ok} passed</> : <>{I.x} failed</>}
                            </span>
                          </div>
                          <div className="px-3 py-[9px] font-mono text-[0.69rem]">
                            {[['input', tc.stdin], ['expected', tc.expected_output], ['got', tc.stdout]].map(([k, v]) => (
                              <div key={k} className="flex gap-[10px] leading-[1.95]">
                                <span className="text-zinc-600 min-w-[65px]">{k}</span>
                                <span className="text-zinc-400">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* RESULT */}
          {rightTab === 'result' && (
            <div className="flex-1 overflow-y-auto p-[18px] bg-[#111113] scroll-panel">
              <SectionHead className="mt-0">Submission Result</SectionHead>

              {!submitResult ? (
                <div className="flex flex-col items-center justify-center min-h-[180px] gap-3 text-zinc-600 text-[0.75rem]">
                  <span className="text-[1.8rem] opacity-15">⬆</span>
                  Hit Submit to evaluate your solution
                </div>
              ) : (
                <>
                  {/* Banner */}
                  <div className={`flex items-start gap-3 rounded-lg p-[14px] mb-5 border anim-fadein
                                   ${submitResult.accepted
                                     ? 'bg-emerald-500/[0.07] border-emerald-500/20'
                                     : 'bg-red-500/[0.07] border-red-500/20'}`}>
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0
                                     ${submitResult.accepted ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                      {submitResult.accepted ? I.ok : I.x}
                    </div>
                    <div>
                      <p className={`text-[1rem] font-bold mb-1 ${submitResult.accepted ? 'text-emerald-300' : 'text-red-400'}`}>
                        {submitResult.accepted ? '🎉 Accepted' : submitResult.error || 'Wrong Answer'}
                      </p>
                      <p className="text-[0.72rem] text-zinc-600">
                        {submitResult.passedTestCases}/{submitResult.totalTestCases} test cases passed
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {submitResult.totalTestCases > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-[0.65rem] mb-[6px]">
                        <span className="text-zinc-600 font-medium">Test Cases</span>
                        <span className={`font-mono font-bold ${submitResult.accepted ? 'text-emerald-400' : 'text-red-400'}`}>
                          {Math.round((submitResult.passedTestCases / submitResult.totalTestCases) * 100)}%
                        </span>
                      </div>
                      <div className="h-1 bg-[#242428] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500
                                      ${submitResult.accepted
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_8px_rgba(16,185,129,.4)]'
                                        : 'bg-gradient-to-r from-red-500 to-red-400 shadow-[0_0_8px_rgba(239,68,68,.4)]'}`}
                          style={{ width: `${(submitResult.passedTestCases / submitResult.totalTestCases) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {submitResult.accepted && (
                    <div className="flex gap-2 flex-wrap">
                      {[{ icon: I.clock, k: 'Runtime', v: `${submitResult.runtime}s` },
                        { icon: I.chip,  k: 'Memory',  v: `${submitResult.memory} KB` }].map(s => (
                        <div key={s.k} className="flex items-center gap-[6px] px-3 py-[6px] rounded-md
                                                    bg-[#1c1c1f] border border-white/[0.07] text-[0.68rem] font-mono">
                          <span className="text-emerald-400">{s.icon}</span>
                          <span className="text-zinc-600">{s.k}</span>
                          <span className="text-[#e8e8ea] font-semibold ml-[2px]">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div className="h-[22px] flex-shrink-0 flex items-center gap-4 px-4
                      bg-emerald-500 font-mono text-[0.6rem] font-semibold text-[#001a10] tracking-[0.5px]">
        <span className="flex items-center gap-[5px]">
          {I.code}
          {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
        </span>
        {problem && (
          <span className="flex items-center gap-[5px]">{I.file} {problem.title}</span>
        )}
        {diff && <span className="ml-auto">{diff.label}</span>}
      </div>
    </div>
  );
}
