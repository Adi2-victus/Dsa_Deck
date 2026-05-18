


// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// // ── Icons ─────────────────────────────────────────────────────────────────────
// const IconCode   = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
// const IconCheck  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
// const IconPlus   = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
// const IconTrophy = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>;
// const IconFilter = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>;
// const IconAdmin  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 13l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/></svg>;
// const IconChart  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-4h2v14h-2V7z"/></svg>;
// const IconLogout = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>;
// const IconX      = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>;
// const IconSearch = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
// const IconUser   = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;

// const DIFF_TW = {
//   easy:   { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Easy' },
//   medium: { text: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200', label: 'Medium' },
//   hard:   { text: 'text-rose-600',    bg: 'bg-rose-50',    border: 'border-rose-200', label: 'Hard' },
// };

// const TAG_OPTIONS = ['array','linkedList','graph','dp','tree','string','math','sorting','binary search','stack','queue','heap'];

// export default function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((s) => s.auth);
//   const [problems,       setProblems]       = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters,        setFilters]        = useState({ difficulty: 'all', tag: 'all', status: 'all' });
//   const [search,         setSearch]         = useState('');
//   const [loading,        setLoading]        = useState(true);
//   const [menuOpen,       setMenuOpen]       = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const [pRes, sRes] = await Promise.all([
//           axiosClient.get('/problem/getAllProblem'),
//           user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] }),
//         ]);
//         setProblems(pRes.data);
//         if (user) setSolvedProblems(sRes.data);
//       } catch (e) { console.error(e); }
//       finally { setLoading(false); }
//     })();
//   }, [user]);

//   const handleLogout = () => { dispatch(logoutUser()); setSolvedProblems([]); };
//   const isSolved = (id) => solvedProblems.some((sp) => sp._id === id);

//   const filtered = problems.filter((p) => {
//     const dMatch = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
//     const tMatch = filters.tag === 'all' || p.tags.includes(filters.tag);
//     const sMatch = filters.status === 'all' ||
//       (filters.status === 'solved' ? isSolved(p._id) : !isSolved(p._id));
//     const qMatch = !search || p.title.toLowerCase().includes(search.toLowerCase());
//     return dMatch && tMatch && sMatch && qMatch;
//   });

//   const hasFilters = filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all' || search;
//   const clearAll   = () => { setFilters({ difficulty: 'all', tag: 'all', status: 'all' }); setSearch(''); };

//   const solvedCount = solvedProblems.length;
//   const totalProblems = problems.length;
//   const completionRate = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ── NAV ── */}
//       <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-6 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <NavLink to="/" className="flex items-center gap-2 text-xl font-extrabold text-gray-900 no-underline">
//           <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
//             <IconCode size={16} />
//           </div>
//           DSA<span className="text-amber-500">Deck</span>
//         </NavLink>

//         {/* Right */}
//         <div className="flex items-center gap-3">
//           <NavLink 
//             to="/leaderboard"
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
//           >
//             <IconTrophy size={16} /> Leaderboard
//           </NavLink>

//           {/* Avatar + dropdown */}
//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <button
//               onClick={() => setMenuOpen((o) => !o)}
//               className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-sm font-bold text-amber-700 border-2 border-white shadow-sm hover:shadow-md transition-shadow"
//             >
//               {user?.firstName?.charAt(0)?.toUpperCase() || <IconUser size={16} />}
//             </button>

//             {menuOpen && (
//               <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn">
//                 <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
//                   <p className="text-xs text-gray-400 uppercase tracking-wide">Signed in as</p>
//                   <p className="text-sm font-semibold text-gray-800 mt-0.5">
//                     {user?.firstName} {user?.lastName}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.emailId}</p>
//                 </div>
                
//                 <NavLink
//                   to="/profile"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
//                 >
//                   <IconChart size={15} /> Analytics
//                 </NavLink>
                
//                 {user?.role === 'admin' && (
//                   <NavLink
//                     to="/admin"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
//                   >
//                     <IconAdmin size={16} /> Admin Dashboard
//                   </NavLink>
//                 )}
                
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 w-full text-left transition-colors border-t border-gray-100"
//                 >
//                   <IconLogout size={16} /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ── HERO ── */}
//       <div className="text-center px-4 pt-12 pb-8">
//         <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
//           <IconCode size={12} className="text-amber-500" />
//           <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wide">Coding Arena</span>
//         </div>

//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
//           Master <span className="text-amber-500">Data Structures</span><br />& Algorithms
//         </h1>
//         <p className="text-gray-500 max-w-lg mx-auto mb-6">
//           Sharpen your skills with our curated collection of challenges, track your progress, and climb the leaderboard.
//         </p>

//         {/* Stat pills */}
//         <div className="flex flex-wrap gap-3 justify-center mb-10">
//           <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
//             <span className="text-xl font-bold text-gray-800">{totalProblems}</span>
//             <span className="text-xs text-gray-400">Total Problems</span>
//           </div>
//           {user && (
//             <>
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
//                 <span className="text-xl font-bold text-emerald-600">{solvedCount}</span>
//                 <span className="text-xs text-gray-400">Solved</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
//                 <span className="text-xl font-bold text-amber-500">{totalProblems - solvedCount}</span>
//                 <span className="text-xs text-gray-400">Remaining</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
//                 <span className="text-xl font-bold text-amber-600">{completionRate}%</span>
//                 <span className="text-xs text-gray-400">Completion</span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── FILTERS ── */}
//       <div className="max-w-5xl mx-auto mb-5 px-4">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
//           <div className="flex flex-wrap gap-3 items-end">
//             {/* Search */}
//             <div className="flex-1 min-w-[180px]">
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Search</label>
//               <div className="relative">
//                 <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-colors"
//                   placeholder="Search problems..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Selects */}
//             {[
//               { label: 'Status', key: 'status', opts: [['all','All'],['solved','Solved'],['unsolved','Unsolved']] },
//               { label: 'Difficulty', key: 'difficulty', opts: [['all','All'],['easy','Easy'],['medium','Medium'],['hard','Hard']] },
//               { label: 'Tag', key: 'tag', opts: [['all','All'], ...TAG_OPTIONS.map(t => [t, t.charAt(0).toUpperCase()+t.slice(1)])] },
//             ].map(({ label, key, opts }) => (
//               <div key={key} className="min-w-[120px]">
//                 <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//                   {label}
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 cursor-pointer"
//                   value={filters[key]}
//                   onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
//                 >
//                   {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
//                 </select>
//               </div>
//             ))}

//             {/* Clear */}
//             {hasFilters && (
//               <button
//                 onClick={clearAll}
//                 className="px-3 py-2 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
//               >
//                 <IconX size={12} className="inline mr-1" /> Clear
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── TABLE ── */}
//       <div className="max-w-5xl mx-auto mb-10 px-4">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//           <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 bg-gray-50/50">
//             <span className="text-sm font-semibold text-gray-700">Problems</span>
//             <span className="text-xs font-mono px-2 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-200">
//               {filtered.length} shown
//             </span>
//           </div>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-16 gap-3">
//               <div className="w-8 h-8 border-2 border-gray-200 border-t-amber-500 rounded-full animate-spin" />
//               <span className="text-sm text-gray-400">Loading problems...</span>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
//               <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="opacity-40">
//                 <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/>
//               </svg>
//               <p className="text-sm">No problems match your filters.</p>
//               <button onClick={clearAll} className="text-sm text-amber-600 hover:text-amber-700 font-medium">
//                 Clear filters
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-100">
//                   <tr>
//                     <th className="w-12 px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">✓</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Problem</th>
//                     <th className="w-24 px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Difficulty</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Tags</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {filtered.map((problem, i) => {
//                     const solved = isSolved(problem._id);
//                     const diff   = DIFF_TW[problem.difficulty?.toLowerCase()] || DIFF_TW.easy;
//                     const tags   = typeof problem.tags === 'string'
//                       ? problem.tags.split(',').map(t => t.trim())
//                       : problem.tags || [];

//                     return (
//                       <tr key={problem._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3 text-center">
//                           {solved
//                             ? <IconCheck size={16} className="text-emerald-500 mx-auto" />
//                             : <IconPlus size={16} className="text-gray-300 mx-auto" />
//                           }
//                         </td>
//                         <td className="px-4 py-3">
//                           <NavLink 
//                             to={`/problem/${problem._id}`}
//                             className="text-gray-800 font-medium hover:text-amber-600 transition-colors"
//                           >
//                             <span className="text-xs text-gray-400 mr-2 font-mono">#{i + 1}</span>
//                             {problem.title}
//                           </NavLink>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${diff.text} ${diff.bg} ${diff.border}`}>
//                             {diff.label}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex flex-wrap gap-1.5">
//                             {tags.slice(0, 3).map(tag => (
//                               <span key={tag} className="px-2 py-0.5 rounded text-xs text-gray-500 bg-gray-100 border border-gray-200">
//                                 {tag}
//                               </span>
//                             ))}
//                             {tags.length > 3 && (
//                               <span className="px-2 py-0.5 rounded text-xs text-gray-500 bg-gray-100 border border-gray-200">
//                                 +{tags.length - 3}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── FOOTER ── */}
//       <footer className="text-center px-5 py-5 text-xs text-gray-400 border-t border-gray-200 bg-white mt-5">
//         © 2026 DSA<span className="text-amber-500">Deck</span> — Practice coding skills with our challenges
//       </footer>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.15s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconCode   = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconCheck  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
const IconPlus   = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
const IconTrophy = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>;
const IconFilter = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>;
const IconAdmin  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 13l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/></svg>;
const IconChart  = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-4h2v14h-2V7z"/></svg>;
const IconLogout = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>;
const IconX      = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>;
const IconSearch = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;

const DIFF_TW = {
  easy:   { text: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/25',  label: 'Easy'   },
  medium: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/25', label: 'Medium' },
  hard:   { text: 'text-rose-500',   bg: 'bg-rose-500/10',   border: 'border-rose-500/25',   label: 'Hard'   },
};

const TAG_OPTIONS = ['array','linkedList','graph','dp','tree','string','math','sorting','binary search','stack','queue','heap'];

export default function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [problems,       setProblems]       = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters,        setFilters]        = useState({ difficulty: 'all', tag: 'all', status: 'all' });
  const [search,         setSearch]         = useState('');
  const [loading,        setLoading]        = useState(true);
  const [menuOpen,       setMenuOpen]       = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [pRes, sRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] }),
        ]);
        setProblems(pRes.data);
        if (user) setSolvedProblems(sRes.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user]);

  const handleLogout = () => { dispatch(logoutUser()); setSolvedProblems([]); };
  const isSolved = (id) => solvedProblems.some((sp) => sp._id === id);

  const filtered = problems.filter((p) => {
    const dMatch = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
    const tMatch = filters.tag === 'all' || p.tags.includes(filters.tag);
    const sMatch = filters.status === 'all' ||
      (filters.status === 'solved' ? isSolved(p._id) : !isSolved(p._id));
    const qMatch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return dMatch && tMatch && sMatch && qMatch;
  });

  const hasFilters = filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all' || search;
  const clearAll   = () => { setFilters({ difficulty: 'all', tag: 'all', status: 'all' }); setSearch(''); };

  return (
    <div
      className="min-h-screen bg-[#080b12] text-[#e2e8f0]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 40% at 20% -10%, rgba(0,229,255,.06), transparent),
          radial-gradient(ellipse 60% 40% at 85% 90%, rgba(244,63,94,.04), transparent)
        `,
      }}
      onClick={() => menuOpen && setMenuOpen(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        .font-syne  { font-family: 'Syne', sans-serif; }
        .font-mono2 { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes rowIn  { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:none; } }
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }
        @keyframes spin   { to   { transform:rotate(360deg); } }
        .anim-fadeup  { animation: fadeUp .5s ease both; }
        .anim-fadeup2 { animation: fadeUp .5s .1s ease both; }
        .anim-fadeup3 { animation: fadeUp .5s .18s ease both; }
        .anim-rowin   { animation: rowIn .3s ease both; }
        .anim-dropin  { animation: dropIn .15s ease; }
        .select-arrow {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='%234a5568'%3E%3Cpath d='M5 6L0 0h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
        .select-arrow option { background: #0f1520; }
        .row-hover:hover { background: rgba(255,255,255,.025); }
      `}</style>

      {/* ── NAV ── */}
      <nav className="font-syne sticky top-0 z-50 h-[60px] flex items-center justify-between px-6
                      bg-[rgba(8,11,18,.85)] backdrop-blur-[14px] border-b border-[#1e2a3a]">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-[1.3rem] font-extrabold tracking-[-1px] no-underline text-[#e2e8f0]">
          <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[#00e5ff]
                          border border-[rgba(0,229,255,.3)]"
            style={{ background: 'linear-gradient(135deg,#003a4d,rgba(0,229,255,.13))' }}>
            <IconCode size={16} />
          </div>
          DSA<span className="text-[#00e5ff]">Deck</span>
        </NavLink>

        {/* Right */}
        <div className="flex items-center gap-2">
          <NavLink to="/leaderboard"
            className="font-mono2 inline-flex items-center gap-[6px] px-[14px] py-[6px] rounded-lg
                       border border-[#1e2a3a] bg-transparent text-[#e2e8f0] text-[.75rem] font-semibold
                       no-underline cursor-pointer transition-all
                       hover:border-[#00e5ff] hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,.06)]">
            <IconTrophy size={13} /> Leaderboard
          </NavLink>

          {/* Avatar + dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-9 h-9 rounded-[10px] flex items-center justify-center font-syne
                         text-[.95rem] font-extrabold text-[#00e5ff] cursor-pointer
                         border-[1.5px] border-[#00e5ff] bg-gradient-to-br from-[#001a33] to-[#003366]
                         shadow-[0_0_10px_rgba(0,229,255,.2)] hover:shadow-[0_0_18px_rgba(0,229,255,.4)]
                         transition-shadow"
            >
              {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </button>

            {menuOpen && (
              <div className="anim-dropin absolute top-[calc(100%+10px)] right-0 min-w-[200px]
                              bg-[#0f1520] border border-[#1e2a3a] rounded-xl overflow-hidden
                              shadow-[0_16px_40px_rgba(0,0,0,.5)] z-50">
                <div className="font-mono2 px-4 py-3 border-b border-[#1e2a3a] text-[.8rem] text-[#4a5568]">
                  Signed in as
                  <strong className="block text-[#e2e8f0] text-[.9rem] mt-[2px]">
                    {user?.firstName} {user?.lastName}
                  </strong>
                </div>
                <NavLink to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-syne flex items-center gap-[10px] px-4 py-[11px] w-full
                             text-[.85rem] text-[#00e5ff] no-underline
                             hover:bg-[rgba(255,255,255,.04)] transition-colors">
                  <IconChart size={15} /> Analytics
                </NavLink>
                {user?.role === 'admin' && (
                  <NavLink to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="font-syne flex items-center gap-[10px] px-4 py-[11px] w-full
                               text-[.85rem] text-[#00e5ff] no-underline
                               hover:bg-[rgba(255,255,255,.04)] transition-colors">
                    <IconAdmin size={15} /> Admin Dashboard
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="font-syne flex items-center gap-[10px] px-4 py-[11px] w-full
                             text-[.85rem] text-[#f43f5e] bg-none border-none cursor-pointer
                             hover:bg-[rgba(255,255,255,.04)] transition-colors">
                  <IconLogout size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="font-syne text-center px-4 pt-[52px] pb-9 anim-fadeup">
        {/* Eyebrow */}
        <div className="font-mono2 inline-flex items-center gap-[6px] text-[.7rem] tracking-[2px] uppercase
                        text-[#00e5ff] bg-[rgba(0,229,255,.07)] border border-[rgba(0,229,255,.2)]
                        px-[14px] py-1 rounded-full mb-4">
          <IconCode size={11} /> Coding Arena
        </div>

        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold tracking-[-2px] leading-[1.05] mb-3">
          Master <span className="text-[#00e5ff]">Data Structures</span><br />& Algorithms
        </h1>
        <p className="text-[.95rem] text-[#4a5568] max-w-[480px] mx-auto mb-7 leading-[1.65]">
          Sharpen your skills with our curated collection of challenges, track your progress, and climb the leaderboard.
        </p>

        {/* Stat pills */}
        <div className="font-mono2 flex gap-[10px] justify-center flex-wrap mb-10">
          {[
            { val: problems.length,                                  lbl: 'Total Problems', color: 'text-[#e2e8f0]' },
            user ? { val: solvedProblems.length,                     lbl: 'Solved',         color: 'text-green-400' } : null,
            user ? { val: problems.length - solvedProblems.length,   lbl: 'Remaining',      color: 'text-rose-500'  } : null,
            user && problems.length > 0
              ? { val: `${Math.round((solvedProblems.length/problems.length)*100)}%`, lbl: 'Completion', color: 'text-[#00e5ff]' }
              : null,
          ].filter(Boolean).map((s) => (
            <div key={s.lbl}
              className="flex items-center gap-2 px-4 py-2 rounded-[10px]
                         bg-[#0f1520] border border-[#1e2a3a] text-[.78rem]">
              <span className={`text-[1.1rem] font-bold ${s.color}`}>{s.val}</span>
              <span className="text-[#4a5568] text-[.68rem]">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="max-w-[1100px] mx-auto mb-5 px-4 anim-fadeup2">
        <div className="flex gap-3 flex-wrap items-end
                        bg-[#0f1520] border border-[#1e2a3a] rounded-[14px] p-4">
          {/* Search */}
          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <span className="font-mono2 text-[.63rem] uppercase tracking-[1.5px] text-[#4a5568]">Search</span>
            <div className="relative">
              <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#4a5568] pointer-events-none">
                <IconSearch size={14} />
              </span>
              <input
                className="font-mono2 w-full pl-[34px] pr-[10px] py-[7px] rounded-lg text-[.78rem]
                           bg-[rgba(255,255,255,.03)] border border-[#1e2a3a] text-[#e2e8f0]
                           placeholder-[#4a5568] outline-none transition-colors
                           focus:border-[#00e5ff]"
                placeholder="Search problems…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Selects */}
          {[
            { label: 'Status',     key: 'status',     opts: [['all','All Problems'],['solved','Solved'],['unsolved','Unsolved']] },
            { label: 'Difficulty', key: 'difficulty', opts: [['all','All Levels'],['easy','Easy'],['medium','Medium'],['hard','Hard']] },
            { label: 'Tag',        key: 'tag',        opts: [['all','All Tags'], ...TAG_OPTIONS.map(t => [t, t.charAt(0).toUpperCase()+t.slice(1)])] },
          ].map(({ label, key, opts }) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="font-mono2 text-[.63rem] uppercase tracking-[1.5px] text-[#4a5568] flex items-center gap-1">
                <IconFilter size={10} /> {label}
              </span>
              <select
                className="select-arrow font-mono2 pl-[10px] pr-8 py-[7px] rounded-lg text-[.78rem]
                           bg-[rgba(255,255,255,.03)] border border-[#1e2a3a] text-[#e2e8f0]
                           cursor-pointer outline-none min-w-[130px] transition-colors
                           focus:border-[#00e5ff]"
                value={filters[key]}
                onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              >
                {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="font-mono2 self-end inline-flex items-center gap-[5px]
                         px-3 py-[7px] rounded-lg text-[.72rem] cursor-pointer
                         border border-[rgba(244,63,94,.25)] bg-[rgba(244,63,94,.06)] text-[#f43f5e]
                         hover:bg-[rgba(244,63,94,.12)] transition-colors">
              <IconX size={11} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="max-w-[1100px] mx-auto mb-10 px-4 anim-fadeup3">
        <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-2xl overflow-hidden">

          {/* Card header */}
          <div className="flex items-center justify-between px-[22px] py-[14px] border-b border-[#1e2a3a]">
            <span className="font-mono2 text-[.8rem] font-bold text-[#4a5568] tracking-[1px] uppercase">
              Problems
            </span>
            <span className="font-mono2 text-[.68rem] px-[10px] py-[2px] rounded-full
                             bg-[rgba(0,229,255,.07)] text-[#00e5ff] border border-[rgba(0,229,255,.15)]">
              {filtered.length} shown
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[260px] gap-[14px]">
              <div className="w-[38px] h-[38px] rounded-full border-[3px]
                              border-[rgba(0,229,255,.12)] border-t-[#00e5ff]
                              animate-spin" />
              <span className="font-mono2 text-[.78rem] text-[#4a5568]">Loading problems…</span>
            </div>

          /* Empty */
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-[60px] px-5 text-[#4a5568]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="opacity-30">
                <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/>
              </svg>
              <p className="text-[.9rem]">No problems match your filters.</p>
              <button onClick={clearAll}
                className="font-mono2 inline-flex items-center gap-[5px] px-3 py-[7px] rounded-lg
                           text-[.72rem] border border-[rgba(244,63,94,.25)] bg-[rgba(244,63,94,.06)]
                           text-[#f43f5e] hover:bg-[rgba(244,63,94,.12)] transition-colors cursor-pointer">
                <IconX size={11} /> Clear filters
              </button>
            </div>

          /* Table */
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['✓', 'Problem', 'Difficulty', 'Tags'].map((h, i) => (
                      <th key={h}
                        className={`font-mono2 px-[18px] py-[10px] text-[.62rem] font-semibold
                                    uppercase tracking-[1.5px] text-[#4a5568] text-left
                                    border-b border-[#1e2a3a]
                                    ${i === 0 ? 'text-center w-[52px]' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((problem, i) => {
                    const solved = isSolved(problem._id);
                    const diff   = DIFF_TW[problem.difficulty?.toLowerCase()] || DIFF_TW.easy;
                    const tags   = typeof problem.tags === 'string'
                      ? problem.tags.split(',').map(t => t.trim())
                      : problem.tags || [];

                    return (
                      <tr key={problem._id}
                        className="anim-rowin row-hover border-t border-[rgba(255,255,255,.03)] transition-colors"
                        style={{ animationDelay: `${i * 25}ms` }}>

                        {/* Status */}
                        <td className="px-[18px] py-3 text-center">
                          {solved
                            ? <span className="text-green-400" title="Solved"><IconCheck size={18} /></span>
                            : <span className="text-white/10" title="Unsolved"><IconPlus size={18} /></span>
                          }
                        </td>

                        {/* Title */}
                        <td className="px-[18px] py-3">
                          <NavLink to={`/problem/${problem._id}`}
                            className="font-syne no-underline text-[.9rem] font-bold text-[#e2e8f0]
                                       hover:text-[#00e5ff] transition-colors">
                            <span className="font-mono2 text-[.68rem] text-[#4a5568] mr-2">#{i + 1}</span>
                            {problem.title}
                          </NavLink>
                        </td>

                        {/* Difficulty */}
                        <td className="px-[18px] py-3">
                          <span className={`font-mono2 inline-block px-[10px] py-[3px] rounded-full
                                           text-[.68rem] font-bold border capitalize
                                           ${diff.text} ${diff.bg} ${diff.border}`}>
                            {diff.label}
                          </span>
                        </td>

                        {/* Tags */}
                        <td className="px-[18px] py-3">
                          <div className="flex flex-wrap gap-[5px]">
                            {tags.slice(0, 3).map(tag => (
                              <span key={tag}
                                className="font-mono2 px-2 py-[2px] rounded text-[.62rem] text-[#4a5568]
                                           bg-[rgba(255,255,255,.04)] border border-[#1e2a3a]
                                           hover:text-[#00e5ff] hover:border-[rgba(0,229,255,.2)]
                                           transition-colors cursor-default">
                                {tag}
                              </span>
                            ))}
                            {tags.length > 3 && (
                              <span className="font-mono2 px-2 py-[2px] rounded text-[.62rem] text-[#4a5568]
                                               bg-[rgba(255,255,255,.04)] border border-[#1e2a3a]">
                                +{tags.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="font-mono2 text-center px-5 py-5 text-[.68rem] text-[#4a5568]
                         border-t border-[#1e2a3a] mt-5">
        © 2026 DSA<span className="text-[#00e5ff]">Deck</span> — Practice coding skills with our challenges
      </footer>
    </div>
  );
}




