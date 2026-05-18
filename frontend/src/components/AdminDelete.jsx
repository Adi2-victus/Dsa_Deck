// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient'

// const AdminDelete = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get('/problem/getAllProblem');
//       setProblems(data);
//     } catch (err) {
//       setError('Failed to fetch problems');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
//     try {
//       await axiosClient.delete(`/problem/delete/${id}`);
//       setProblems(problems.filter(problem => problem._id !== id));
//     } catch (err) {
//       setError('Failed to delete problem');
//       console.error(err);
//     }
//   };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Delete Problems</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="w-1/12">#</th>
//               <th className="w-4/12">Title</th>
//               <th className="w-2/12">Difficulty</th>
//               <th className="w-3/12">Tags</th>
//               <th className="w-2/12">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr key={problem._id}>
//                 <th>{index + 1}</th>
//                 <td>{problem.title}</td>
//                 <td>
//                   <span className={`badge ${
//                     problem.difficulty === 'Easy' 
//                       ? 'badge-success' 
//                       : problem.difficulty === 'Medium' 
//                         ? 'badge-warning' 
//                         : 'badge-error'
//                   }`}>
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge badge-outline">
//                     {problem.tags}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => handleDelete(problem._id)}
//                       className="btn btn-sm btn-error"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDelete;



import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';

// ── Icons ──────────────────────────────────────────────────────────────────────
const Ic = {
  home:   <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  chevR:  <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>,
  trash:  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  warn:   <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>,
  spin:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
  close:  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  list:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>,
  tag:    <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>,
};

const DIFF = {
  easy:   { color: '#34d399', bg: 'rgba(52,211,153,.10)',  border: 'rgba(52,211,153,.28)',  label: 'EASY'   },
  medium: { color: '#fbbf24', bg: 'rgba(251,191,36,.10)',  border: 'rgba(251,191,36,.28)',  label: 'MEDIUM' },
  hard:   { color: '#f87171', bg: 'rgba(248,113,113,.10)', border: 'rgba(248,113,113,.28)', label: 'HARD'   },
};

const TAG_COLORS = {
  array:      { color: '#60a5fa', bg: 'rgba(96,165,250,.08)',  border: 'rgba(96,165,250,.2)'  },
  linkedList: { color: '#a78bfa', bg: 'rgba(167,139,250,.08)', border: 'rgba(167,139,250,.2)' },
  graph:      { color: '#34d399', bg: 'rgba(52,211,153,.08)',  border: 'rgba(52,211,153,.2)'  },
  dp:         { color: '#fb923c', bg: 'rgba(251,146,60,.08)',  border: 'rgba(251,146,60,.2)'  },
};

// ── Confirm Modal ──────────────────────────────────────────────────────────────
function ConfirmModal({ problem, onConfirm, onCancel }) {
  if (!problem) return null;
  const d = DIFF[problem.difficulty?.toLowerCase()] || DIFF.medium;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)', animation: 'fadeIn .15s ease' }}>
      <div className="bg-[#161618] border border-red-500/25 rounded-[14px] p-7 max-w-[420px] w-full
                      shadow-[0_0_60px_rgba(239,68,68,.15)]"
           style={{ animation: 'scaleIn .18s ease' }}>
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-[10px] mx-auto mb-5
                        bg-red-500/[0.08] border border-red-500/25 text-red-400
                        shadow-[0_0_20px_rgba(239,68,68,.2)]">
          {Ic.trash}
        </div>

        <div className="text-center mb-5">
          <div className="font-mono text-[0.6rem] tracking-[1.5px] text-zinc-600 mb-2">CONFIRM DELETION — OP_03</div>
          <h2 className="text-[1.05rem] font-bold text-white mb-2">Delete this problem?</h2>
          <p className="font-mono text-[0.72rem] text-zinc-500 leading-[1.7]">
            This action is <span className="text-red-400 font-semibold">permanent</span> and cannot be undone.
          </p>
        </div>

        {/* Problem preview */}
        <div className="bg-[#111113] border border-white/[0.07] rounded-[9px] p-4 mb-6">
          <div className="font-mono text-[0.6rem] tracking-[1px] text-zinc-700 mb-1.5">PROBLEM</div>
          <div className="text-[0.85rem] font-semibold text-[#e8e8ea] mb-2 truncate">{problem.title}</div>
          <div className="flex items-center gap-2">
            <span style={{ color: d.color, background: d.bg, borderColor: d.border }}
                  className="font-mono text-[0.6rem] font-bold tracking-[0.8px] px-2 py-0.5 rounded border">
              {d.label}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-[7px] font-mono text-[0.72rem] font-semibold tracking-[0.5px]
                       text-zinc-500 border border-white/[0.07] hover:text-zinc-300 hover:border-white/[0.15]
                       transition-all duration-200">
            CANCEL
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-[7px] font-mono text-[0.72rem] font-semibold tracking-[0.5px]
                       text-red-400 bg-red-500/[0.10] border border-red-500/35
                       hover:bg-red-500/[0.18] hover:border-red-500/60
                       hover:shadow-[0_0_16px_rgba(239,68,68,.2)]
                       transition-all duration-200">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const AdminDelete = () => {
  const [problems, setProblems]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState('');
  const [filterDiff, setFilterDiff]   = useState('all');
  const [deletingId, setDeletingId]   = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null); // problem obj to confirm delete
  const [successMsg, setSuccessMsg]   = useState('');

  useEffect(() => { fetchProblems(); }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (problem) => setConfirmTarget(problem);

  const handleDelete = async () => {
    const id = confirmTarget._id;
    const title = confirmTarget.title;
    setConfirmTarget(null);
    setDeletingId(id);
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(prev => prev.filter(p => p._id !== id));
      setSuccessMsg(`"${title}" deleted.`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to delete problem');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff   = filterDiff === 'all' || p.difficulty?.toLowerCase() === filterDiff;
    return matchSearch && matchDiff;
  });

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111113] flex flex-col items-center justify-center gap-4">
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
        <div style={{ animation: 'spin 1s linear infinite' }} className="text-red-400">{Ic.spin}</div>
        <p className="font-mono text-[0.7rem] text-zinc-600 tracking-[1.5px]">FETCHING PROBLEMS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111113] text-[#e8e8ea]">
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }
        @keyframes spin     { to { transform:rotate(360deg); } }
        @keyframes pulse2   { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes slideRow { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:none; } }
        .anim-fu   { animation: fadeUp .42s ease both; }
        .anim-fu-1 { animation: fadeUp .42s .06s ease both; }
        .anim-fu-2 { animation: fadeUp .42s .12s ease both; }
        .row-anim  { animation: slideRow .28s ease both; }
        tr:hover .del-btn { opacity: 1 !important; }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="sticky top-0 z-50 h-12 flex items-center justify-between px-[18px]
                      bg-[#161618] border-b border-white/[0.07] flex-shrink-0">
        <div className="flex items-center gap-[10px]">
          <div className="flex gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="w-px h-4 bg-white/[0.07]" />
          <div className="flex items-center gap-[5px] font-mono text-[0.72rem]">
            <NavLink to="/" className="flex items-center gap-1 text-zinc-600 no-underline hover:text-red-400 transition-colors">
              {Ic.home} Home
            </NavLink>
            <span className="text-zinc-600">{Ic.chevR}</span>
            <NavLink to="/admin" className="text-zinc-600 no-underline hover:text-red-400 transition-colors">Admin</NavLink>
            <span className="text-zinc-600">{Ic.chevR}</span>
            <span className="text-zinc-400 font-medium">Delete Problems</span>
          </div>
        </div>
        <div className="flex items-center gap-[6px] font-mono text-[0.62rem]
                        px-[10px] py-[3px] rounded bg-red-500/[0.08]
                        border border-red-500/20 text-red-400">
          <span className="w-[5px] h-[5px] rounded-full bg-red-400
                           shadow-[0_0_6px_rgba(239,68,68,.7)]"
                style={{ animation: 'pulse2 2s ease infinite' }} />
          DANGER ZONE
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="text-center px-6 pt-12 pb-8 anim-fu">
        <div className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[1.5px] text-zinc-600 mb-4
                        px-3 py-1.5 rounded bg-red-500/[0.06] border border-red-500/15">
          <span className="text-red-400">{Ic.trash}</span>
          OP_03 — DELETE /api/problem/:id
        </div>
        <h1 className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-[-1.5px] leading-[1.05] mb-3 text-white">
          Delete <em className="not-italic text-red-400">Problems</em>
        </h1>
        <p className="font-mono text-[0.78rem] text-zinc-600 max-w-[380px] mx-auto leading-[1.7] tracking-[0.3px]">
          Permanently remove challenges from the platform.<br />
          <span className="text-red-500/60">This action cannot be undone.</span>
        </p>
      </div>

      <div className="max-w-[900px] w-full mx-auto px-5 pb-20">

        {/* ── Toasts ── */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-[8px] bg-red-500/[0.06] border border-red-500/25 mb-4 anim-fu">
            <span className="text-red-400 flex-shrink-0">{Ic.warn}</span>
            <span className="font-mono text-[0.75rem] text-red-300">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-zinc-600 hover:text-red-400 transition-colors">{Ic.close}</button>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-3 p-4 rounded-[8px] bg-emerald-500/[0.06] border border-emerald-500/25 mb-4 anim-fu">
            <span className="text-emerald-400 flex-shrink-0">{Ic.check}</span>
            <span className="font-mono text-[0.75rem] text-emerald-300">{successMsg}</span>
          </div>
        )}

        {/* ── Controls bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4 anim-fu-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">{Ic.search}</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search problems…"
              className="w-full bg-[#161618] border border-white/[0.07] rounded-[7px] pl-8 pr-3 py-2
                         font-mono text-[0.78rem] text-[#e8e8ea] placeholder-zinc-700 outline-none
                         focus:border-red-500/30 focus:shadow-[0_0_12px_rgba(239,68,68,.08)]
                         transition-all duration-200"
            />
          </div>

          {/* Difficulty filter pills */}
          <div className="flex items-center gap-2">
            {['all','easy','medium','hard'].map(d => {
              const s = d === 'all' ? null : DIFF[d];
              const active = filterDiff === d;
              return (
                <button key={d} onClick={() => setFilterDiff(d)}
                  style={active && s ? { color: s.color, background: s.bg, borderColor: s.border } :
                         active     ? { color: '#e8e8ea', background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.15)' } : {}}
                  className={`font-mono text-[0.62rem] font-semibold tracking-[0.8px] uppercase
                              px-3 py-1.5 rounded-[6px] border transition-all duration-200
                              ${active ? '' : 'text-zinc-600 border-white/[0.07] hover:border-white/[0.14] hover:text-zinc-400'}`}>
                  {d}
                </button>
              );
            })}
          </div>

          {/* Count badge */}
          <div className="font-mono text-[0.62rem] text-zinc-600 border border-white/[0.07]
                          rounded-[6px] px-3 py-1.5 bg-[#161618]">
            {filtered.length} <span className="text-zinc-700">/ {problems.length}</span>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-[#161618] border border-white/[0.07] rounded-[12px] overflow-hidden anim-fu-2">
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_6rem_7rem_5.5rem] gap-4 items-center
                          px-5 py-3 border-b border-white/[0.07] bg-[#111113]/60">
            {['#','TITLE','DIFF','TAG','ACTION'].map(h => (
              <div key={h} className="font-mono text-[0.58rem] tracking-[1.2px] text-zinc-600">{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#111113] border border-white/[0.07]
                              flex items-center justify-center text-zinc-700">
                {Ic.list}
              </div>
              <p className="font-mono text-[0.72rem] text-zinc-600 tracking-[0.5px]">NO PROBLEMS FOUND</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filtered.map((problem, i) => {
                const d   = DIFF[problem.difficulty?.toLowerCase()] || DIFF.medium;
                const t   = TAG_COLORS[problem.tags] || TAG_COLORS.array;
                const del = deletingId === problem._id;
                return (
                  <div key={problem._id}
                       className="grid grid-cols-[2rem_1fr_6rem_7rem_5.5rem] gap-4 items-center
                                  px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-150 group row-anim"
                       style={{ animationDelay: `${i * 0.03}s` }}>
                    {/* Index */}
                    <div className="font-mono text-[0.62rem] text-zinc-700">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <div className="font-medium text-[0.82rem] text-[#e8e8ea] truncate pr-2">
                      {problem.title}
                    </div>

                    {/* Difficulty */}
                    <div>
                      <span style={{ color: d.color, background: d.bg, borderColor: d.border }}
                            className="font-mono text-[0.58rem] font-bold tracking-[0.8px]
                                       px-2 py-0.5 rounded-[4px] border">
                        {d.label}
                      </span>
                    </div>

                    {/* Tag */}
                    <div>
                      <span style={{ color: t.color, background: t.bg, borderColor: t.border }}
                            className="inline-flex items-center gap-1 font-mono text-[0.58rem]
                                       font-semibold tracking-[0.5px] px-2 py-0.5 rounded-[4px] border">
                        {Ic.tag} {problem.tags}
                      </span>
                    </div>

                    {/* Delete button */}
                    <div>
                      <button
                        onClick={() => confirmDelete(problem)}
                        disabled={del}
                        className="del-btn flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold
                                   tracking-[0.5px] px-3 py-1.5 rounded-[6px] border
                                   text-red-400 bg-red-500/[0.06] border-red-500/20
                                   hover:bg-red-500/[0.16] hover:border-red-500/45
                                   hover:shadow-[0_0_12px_rgba(239,68,68,.18)]
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-all duration-200"
                        style={{ opacity: del ? 0.4 : undefined }}>
                        {del
                          ? <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>{Ic.spin}</span>
                          : Ic.trash}
                        {del ? 'DEL…' : 'DEL'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer count strip */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-[#111113]/40">
            <span className="font-mono text-[0.6rem] text-zinc-700 tracking-[0.5px]">
              {filtered.length} RESULT{filtered.length !== 1 ? 'S' : ''} — DELETE /api/problem/:id
            </span>
            <span className="font-mono text-[0.6rem] text-zinc-700">DSA Deck</span>
          </div>
        </div>
      </div>

      {/* ── CONFIRM MODAL ── */}
      <ConfirmModal
        problem={confirmTarget}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />

      {/* ── STATUS BAR ── */}
      <div className="mt-auto h-[22px] flex items-center gap-4 px-4
                      bg-red-500 font-mono text-[0.6rem] font-semibold
                      text-[#3d0000] tracking-[0.5px] flex-shrink-0">
        <span className="flex items-center gap-[6px] opacity-70">{Ic.shield}</span>
        <span>Admin Panel</span>
        <span className="flex items-center gap-[6px] opacity-70">{Ic.list}</span>
        <span>{problems.length} Problems</span>
        <span className="ml-auto">DSA Deck</span>
      </div>
    </div>
  );
};

export default AdminDelete;