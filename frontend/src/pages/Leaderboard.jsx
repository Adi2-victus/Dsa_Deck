


// import { useEffect, useMemo, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Home, RefreshCw, Zap, Trophy, Award, ChevronLeft, TrendingUp, Target, Flame } from 'lucide-react';

// // ── Inline SVG icons for fallback (keep for compatibility) ──────────────
// const IconCrown = ({ size = 18, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M2 19h20v2H2v-2zm2-3l3-8 5 4 5-4 3 8H4zm8-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
//   </svg>
// );
// const IconFlame = ({ size = 18, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
//   </svg>
// );
// const IconBolt = ({ size = 18, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M7 2v11h3v9l7-12h-4l4-8z" />
//   </svg>
// );
// const IconTarget = ({ size = 18, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
//   </svg>
// );

// const MEDAL = ["#F59E0B", "#9CA3AF", "#D97706"]; // Amber, Gray, Amber-dark for white theme

// const rankLabel = (rank) => {
//   if (rank === 1) return "🥇 1st";
//   if (rank === 2) return "🥈 2nd";
//   if (rank === 3) return "🥉 3rd";
//   return `#${rank}`;
// };

// export default function Leaderboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user } = useSelector((s) => s.auth);
 
//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         setLoading(true);
//         const { default: axiosClient } = await import("../utils/axiosClient");
//         const response = await axiosClient.get("/leaderboard");
//         setData(response.data.leaderboard || []);
//       } catch (err) {
//         setError(err?.response?.data?.message || "Failed to load leaderboard");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLeaderboard();
//   }, []);
 
//   const myRow = useMemo(() => {
//     if (!user?._id) return null;
//     return data.find((item) => String(item.userId) === String(user._id)) || null;
//   }, [data, user?._id]);
 
//   const easy   = myRow?.solved?.easy   || 0;
//   const medium = myRow?.solved?.medium || 0;
//   const hard   = myRow?.solved?.hard   || 0;
//   const total  = easy + medium + hard;
 
//   const easyPct   = total ? (easy   / total) * 100 : 0;
//   const medPct    = total ? (medium / total) * 100 : 0;
 
//   // SVG donut
//   const R = 54, CX = 64, CY = 64;
//   const circ = 2 * Math.PI * R;
//   const segments = [
//     { pct: easyPct,                     color: "#10B981", label: "Easy",   count: easy }, // Emerald
//     { pct: medPct,                      color: "#F59E0B", label: "Medium", count: medium }, // Amber
//     { pct: 100 - easyPct - medPct,      color: "#EF4444", label: "Hard",   count: hard }, // Red
//   ];
//   let offset = 0;
//   const arcs = segments.map((s) => {
//     const dash   = (s.pct / 100) * circ;
//     const gap    = circ - dash;
//     const rotate = (offset / 100) * 360 - 90;
//     offset += s.pct;
//     return { ...s, dash, gap, rotate };
//   });
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-amber-100 p-3 rounded-xl shadow-sm">
//               <Trophy className="w-6 h-6 text-amber-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leaderboard</h1>
//               <p className="text-gray-500 text-sm mt-0.5">Top performers & global rankings</p>
//             </div>
//           </div>
//           <NavLink 
//             to="/" 
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Back to Problems
//           </NavLink>
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
//             <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-3" />
//             <span className="text-gray-500 font-mono text-sm">Loading rankings…</span>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-2">
//             <span className="text-lg">⚠️</span> {error}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
//             {/* Rankings Table - spans 2 cols on large */}
//             <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                 <h2 className="font-semibold text-gray-800">Overall Rankings</h2>
//                 <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{data.length} competitors</span>
//               </div>
              
//               {data.length === 0 ? (
//                 <div className="text-center py-16 text-gray-400">No rankings yet. Solve some problems!</div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50 text-left">
//                       <tr>
//                         <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
//                         <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Player</th>
//                         <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {(() => {
//                         const maxScore = Math.max(...data.map((r) => r.score || 0), 1);
//                         return data.map((row, i) => {
//                           const isMe = String(row.userId) === String(user?._id);
//                           const rk = row.rank;
//                           const medalColor = rk === 1 ? "text-amber-500" : rk === 2 ? "text-gray-400" : rk === 3 ? "text-amber-700" : "text-gray-400";
//                           const scoreBarW = Math.round((row.score / maxScore) * 100);
                          
//                           return (
//                             <tr key={row.userId} className={`${isMe ? 'bg-amber-50/30' : ''} hover:bg-gray-50 transition-colors`}>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center gap-2">
//                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
//                                     rk === 1 ? 'bg-amber-100 text-amber-600' : 
//                                     rk === 2 ? 'bg-gray-100 text-gray-500' : 
//                                     rk === 3 ? 'bg-amber-100/60 text-amber-700' : 
//                                     'bg-gray-50 text-gray-400'
//                                   }`}>
//                                     {rk <= 3 ? <Award className="w-4 h-4" /> : rk}
//                                   </div>
//                                   {rk <= 3 && (
//                                     <span className={`text-xs font-semibold font-mono ${medalColor}`}>
//                                       {rankLabel(rk)}
//                                     </span>
//                                   )}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center gap-3">
//                                   <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${isMe ? 'from-amber-100 to-amber-200 border-2 border-amber-300' : 'from-gray-100 to-gray-200'} flex items-center justify-center font-bold text-gray-600`}>
//                                     {(row.name || "?").charAt(0).toUpperCase()}
//                                   </div>
//                                   <div>
//                                     <span className={`font-medium text-gray-900 ${isMe ? 'text-amber-700' : ''}`}>
//                                       {row.name || "Anonymous"}
//                                     </span>
//                                     {isMe && <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">you</span>}
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center gap-3">
//                                   <Zap className="w-4 h-4 text-amber-400" />
//                                   <span className="font-mono font-bold text-gray-800">{row.score ?? 0}</span>
//                                   <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
//                                     <div className="bg-amber-400 h-full rounded-full" style={{ width: `${scoreBarW}%` }} />
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           );
//                         });
//                       })()}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* My Performance Card */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
//                 <h2 className="font-semibold text-gray-800">My Performance</h2>
//                 {myRow?.rank && (
//                   <span className="text-xs font-bold bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
//                     Rank #{myRow.rank}
//                   </span>
//                 )}
//               </div>
              
//               <div className="p-5">
//                 {/* User Profile */}
//                 <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-6">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-lg font-bold text-amber-700 shadow-sm border border-white">
//                     {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">
//                       {myRow?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
//                     </div>
//                     <div className="text-xs text-gray-400 font-mono">
//                       {user?.emailId ? `@${user.emailId.split("@")[0]}` : "@user"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Difficulty Badges */}
//                 <div className="mb-6">
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Problems Solved</h3>
//                   <div className="grid grid-cols-3 gap-3">
//                     <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
//                       <div className="text-xs text-emerald-600 font-medium uppercase">Easy</div>
//                       <div className="text-xl font-bold text-emerald-700">{easy}</div>
//                     </div>
//                     <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
//                       <div className="text-xs text-amber-600 font-medium uppercase">Medium</div>
//                       <div className="text-xl font-bold text-amber-700">{medium}</div>
//                     </div>
//                     <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
//                       <div className="text-xs text-red-500 font-medium uppercase">Hard</div>
//                       <div className="text-xl font-bold text-red-600">{hard}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Donut Chart */}
//                 <div className="flex justify-center mb-6">
//                   <div className="relative">
//                     <svg width="120" height="120" viewBox="0 0 128 128">
//                       <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F3F4F6" strokeWidth="14" />
//                       {total > 0 && arcs.map((arc, i) => (
//                         <circle
//                           key={i}
//                           cx={CX} cy={CY} r={R}
//                           fill="none"
//                           stroke={arc.color}
//                           strokeWidth="14"
//                           strokeDasharray={`${arc.dash} ${arc.gap}`}
//                           strokeDashoffset={0}
//                           transform={`rotate(${arc.rotate} ${CX} ${CY})`}
//                           strokeLinecap="butt"
//                         />
//                       ))}
//                       <text x={CX} y={CY - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#1F2937">
//                         {total}
//                       </text>
//                       <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fill="#9CA3AF" letterSpacing="1">
//                         SOLVED
//                       </text>
//                     </svg>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-center gap-4 mb-6 text-xs">
//                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-emerald-500"></div><span className="text-gray-500">Easy {easy}</span></div>
//                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-amber-500"></div><span className="text-gray-500">Medium {medium}</span></div>
//                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-red-500"></div><span className="text-gray-500">Hard {hard}</span></div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <div className="flex items-center gap-1.5 text-amber-600 text-xs mb-1"><Trophy className="w-3 h-3" /> Rank</div>
//                     <div className="font-mono text-xl font-bold text-gray-800">{myRow?.rank || "—"}</div>
//                   </div>
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-1"><Zap className="w-3 h-3" /> Score</div>
//                     <div className="font-mono text-xl font-bold text-gray-800">{myRow?.score ?? 0}</div>
//                   </div>
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <div className="flex items-center gap-1.5 text-emerald-600 text-xs mb-1"><Target className="w-3 h-3" /> Solved</div>
//                     <div className="font-mono text-xl font-bold text-gray-800">{myRow?.solved?.total ?? 0}</div>
//                   </div>
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <div className="flex items-center gap-1.5 text-red-500 text-xs mb-1"><Flame className="w-3 h-3" /> Streak</div>
//                     <div className="font-mono text-xl font-bold text-gray-800">{myRow?.streak?.current ?? 0}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
 
// ── Inline SVG icons to avoid any icon-library dependency issues ──────────────
const IconCrown = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2 19h20v2H2v-2zm2-3l3-8 5 4 5-4 3 8H4zm8-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);
const IconFlame = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
  </svg>
);
const IconBolt = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);
const IconTarget = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);
const IconArrowLeft = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);
const IconStar = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
 
const MEDAL = ["#FFD700", "#C0C0C0", "#CD7F32"];
 
const rankLabel = (rank) => {
  if (rank === 1) return "👑 1st";
  if (rank === 2) return "🥈 2nd";
  if (rank === 3) return "🥉 3rd";
  return `#${rank}`;
};
 
export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(null);
  const { user } = useSelector((s) => s.auth);
 
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const { default: axiosClient } = await import("../utils/axiosClient");
        const response = await axiosClient.get("/leaderboard");
        setData(response.data.leaderboard || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);
 
  const myRow = useMemo(() => {
    if (!user?._id) return null;
    return data.find((item) => String(item.userId) === String(user._id)) || null;
  }, [data, user?._id]);
 
  const easy   = myRow?.solved?.easy   || 0;
  const medium = myRow?.solved?.medium || 0;
  const hard   = myRow?.solved?.hard   || 0;
  const total  = easy + medium + hard;
 
  const easyPct   = total ? (easy   / total) * 100 : 0;
  const medPct    = total ? (medium / total) * 100 : 0;
 
  // SVG donut
  const R = 54, CX = 64, CY = 64;
  const circ = 2 * Math.PI * R;
  const segments = [
    { pct: easyPct,                     color: "#38bdf8", label: "Easy",   count: easy },
    { pct: medPct,                      color: "#fb923c", label: "Medium", count: medium },
    { pct: 100 - easyPct - medPct,      color: "#f43f5e", label: "Hard",   count: hard },
  ];
  let offset = 0;
  const arcs = segments.map((s) => {
    const dash   = (s.pct / 100) * circ;
    const gap    = circ - dash;
    const rotate = (offset / 100) * 360 - 90;
    offset += s.pct;
    return { ...s, dash, gap, rotate };
  });
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        :root {
          --bg:       #080b12;
          --surface:  #0f1520;
          --border:   #1e2a3a;
          --accent:   #00e5ff;
          --gold:     #ffd700;
          --silver:   #c0c0c0;
          --bronze:   #cd7f32;
          --text:     #e2e8f0;
          --muted:    #4a5568;
          --easy:     #38bdf8;
          --medium:   #fb923c;
          --hard:     #f43f5e;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        .lb-root {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Syne', sans-serif;
          color: var(--text);
          padding: 24px 16px 60px;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,229,255,.07), transparent),
            radial-gradient(ellipse 60% 40% at 90% 80%, rgba(244,63,94,.05), transparent);
        }
 
        .lb-inner {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeUp .5s ease both;
        }
 
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        /* ── Header ── */
        .lb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .lb-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
        }
        .lb-title-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, var(--gold), #ff8c00);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(255,215,0,.35);
        }
        .lb-back {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          font-size: .8rem;
          text-decoration: none;
          transition: border-color .2s, background .2s;
        }
        .lb-back:hover { border-color: var(--accent); background: rgba(0,229,255,.06); }
 
        /* ── Grid ── */
        .lb-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .lb-grid { grid-template-columns: 1fr 340px; }
        }
 
        /* ── Card ── */
        .lb-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
        }
        .lb-card-header {
          padding: 18px 24px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .lb-card-title {
          font-size: 1rem; font-weight: 700; letter-spacing: .5px; color: var(--text);
        }
        .lb-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(0,229,255,.1);
          color: var(--accent);
          border: 1px solid rgba(0,229,255,.2);
        }
 
        /* ── Table ── */
        .lb-table { width: 100%; border-collapse: collapse; }
        .lb-table thead th {
          padding: 10px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--muted);
          text-align: left;
        }
        .lb-table tbody tr {
          border-top: 1px solid rgba(255,255,255,.03);
          transition: background .15s;
          cursor: default;
        }
        .lb-table tbody tr:hover { background: rgba(255,255,255,.025); }
        .lb-table tbody tr.is-me {
          background: rgba(0,229,255,.06);
          border-top-color: rgba(0,229,255,.15);
        }
        .lb-table td { padding: 13px 20px; vertical-align: middle; }
 
        .rank-cell { display: flex; align-items: center; gap: 8px; }
        .rank-medal {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; font-weight: 700; flex-shrink: 0;
        }
        .rank-1 { background: rgba(255,215,0,.18); color: var(--gold); box-shadow: 0 0 10px rgba(255,215,0,.3); }
        .rank-2 { background: rgba(192,192,192,.15); color: var(--silver); }
        .rank-3 { background: rgba(205,127,50,.15); color: var(--bronze); }
        .rank-n { background: rgba(255,255,255,.05); color: var(--muted); font-size: .65rem; }
 
        .player-cell { display: flex; align-items: center; gap: 10px; }
        .player-avatar {
          width: 32px; height: 32px; border-radius: 10px;
          background: linear-gradient(135deg, #1e3a5f, #0f2040);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; font-weight: 700; flex-shrink: 0;
          color: var(--accent);
        }
        .player-avatar.me { border-color: var(--accent); box-shadow: 0 0 8px rgba(0,229,255,.3); }
        .player-name { font-weight: 700; font-size: .92rem; }
        .player-name.me { color: var(--accent); }
 
        .score-cell {
          display: flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .9rem; font-weight: 600; color: var(--accent);
        }
        .score-bar-wrap {
          width: 60px; height: 4px; background: rgba(255,255,255,.07);
          border-radius: 2px; overflow: hidden;
        }
        .score-bar { height: 100%; border-radius: 2px; background: var(--accent); transition: width .4s; }
 
        /* ── Stats panel ── */
        .stats-panel { padding: 22px; }
        .stats-section-title {
          font-size: .7rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--muted);
          margin-bottom: 16px;
        }
 
        .user-hero {
          display: flex; align-items: center; gap: 12px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          border: 1px solid var(--border);
          margin-bottom: 20px;
        }
        .user-hero-avatar {
          width: 46px; height: 46px; border-radius: 12px;
          background: linear-gradient(135deg, #001a33, #003366);
          border: 1.5px solid var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; font-weight: 800; color: var(--accent);
          box-shadow: 0 0 14px rgba(0,229,255,.2);
          flex-shrink: 0;
        }
        .user-hero-name { font-weight: 700; font-size: 1rem; }
        .user-hero-handle { font-size: .75rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
 
        /* donut */
        .donut-wrap {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 20px;
        }
        .donut-svg { overflow: visible; }
        .donut-center-text { font-family: 'Syne', sans-serif; fill: var(--text); }
        .donut-legend {
          display: flex; gap: 16px; margin-top: 14px; flex-wrap: wrap; justify-content: center;
        }
        .donut-legend-item { display: flex; align-items: center; gap: 6px; font-size: .78rem; }
        .donut-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
 
        /* stat tiles */
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .stat-tile {
          padding: 14px;
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          border: 1px solid var(--border);
          transition: border-color .2s;
        }
        .stat-tile:hover { border-color: rgba(255,255,255,.12); }
        .stat-tile-label {
          font-size: .68rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--muted);
          margin-bottom: 6px;
          display: flex; align-items: center; gap: 5px;
        }
        .stat-tile-value {
          font-size: 1.4rem; font-weight: 800; line-height: 1;
          font-family: 'JetBrains Mono', monospace;
        }
 
        /* diff badges */
        .diff-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .diff-badge {
          flex: 1; min-width: 70px; padding: 10px 8px;
          border-radius: 10px; text-align: center;
          border: 1px solid;
          font-family: 'JetBrains Mono', monospace;
        }
        .diff-badge .d-label { font-size: .6rem; text-transform: uppercase; letter-spacing: 1px; opacity: .7; }
        .diff-badge .d-value { font-size: 1.3rem; font-weight: 700; }
        .diff-easy   { background: rgba(56,189,248,.08); border-color: rgba(56,189,248,.25); color: var(--easy); }
        .diff-medium { background: rgba(251,146,60,.08);  border-color: rgba(251,146,60,.25);  color: var(--medium); }
        .diff-hard   { background: rgba(244,63,94,.08);  border-color: rgba(244,63,94,.25);  color: var(--hard); }
 
        /* loading */
        .lb-loading {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 260px; gap: 14px;
        }
        .lb-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(0,229,255,.15);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin .8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
 
        .lb-error {
          padding: 16px 20px;
          border-radius: 12px;
          background: rgba(244,63,94,.08);
          border: 1px solid rgba(244,63,94,.25);
          color: var(--hard);
          font-family: 'JetBrains Mono', monospace;
          font-size: .85rem;
        }
 
        .empty-msg {
          padding: 48px 0; text-align: center;
          color: var(--muted); font-size: .9rem;
        }
 
        /* row entry animation */
        .lb-table tbody tr {
          animation: rowIn .3s ease both;
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
 
      <div className="lb-root">
        <div className="lb-inner">
          {/* Header */}
          <div className="lb-header">
            <div className="lb-title">
              <div className="lb-title-icon">
                <IconCrown size={22} />
              </div>
              Leaderboard
            </div>
            <NavLink to="/" className="lb-back">
              <IconArrowLeft size={14} /> Back to Problems
            </NavLink>
          </div>
 
          {loading ? (
            <div className="lb-loading">
              <div className="lb-spinner" />
              <span style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: ".8rem" }}>
                Loading rankings…
              </span>
            </div>
          ) : error ? (
            <div className="lb-error">⚠ {error}</div>
          ) : (
            <div className="lb-grid">
 
              {/* ── Rankings Table ── */}
              <div className="lb-card">
                <div className="lb-card-header">
                  <span className="lb-card-title">Overall Rankings</span>
                  <span className="lb-badge">{data.length} competitors</span>
                </div>
                {data.length === 0 ? (
                  <div className="empty-msg">No rankings yet. Solve some problems!</div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="lb-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const maxScore = Math.max(...data.map((r) => r.score || 0), 1);
                          return data.map((row, i) => {
                            const isMe = String(row.userId) === String(user?._id);
                            const rk = row.rank;
                            const rankClass = rk === 1 ? "rank-1" : rk === 2 ? "rank-2" : rk === 3 ? "rank-3" : "rank-n";
                            const scoreBarW = Math.round((row.score / maxScore) * 100);
                            return (
                              <tr
                                key={row.userId}
                                className={isMe ? "is-me" : ""}
                                style={{ animationDelay: `${i * 30}ms` }}
                              >
                                <td>
                                  <div className="rank-cell">
                                    <div className={`rank-medal ${rankClass}`}>
                                      {rk <= 3 ? <IconCrown size={12} /> : rk}
                                    </div>
                                    {rk <= 3 && (
                                      <span style={{
                                        fontFamily: "'JetBrains Mono',monospace",
                                        fontSize: ".7rem",
                                        color: MEDAL[rk - 1],
                                        fontWeight: 700,
                                      }}>{rankLabel(rk)}</span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="player-cell">
                                    <div className={`player-avatar${isMe ? " me" : ""}`}>
                                      {(row.name || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`player-name${isMe ? " me" : ""}`}>
                                      {row.name || "Anonymous"}
                                      {isMe && <span style={{ marginLeft: 6, fontSize: ".65rem", background: "rgba(0,229,255,.12)", color: "var(--accent)", padding: "1px 6px", borderRadius: 20, fontFamily: "'JetBrains Mono',monospace" }}>you</span>}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="score-cell">
                                    <IconBolt size={12} />
                                    {row.score ?? 0}
                                    <div className="score-bar-wrap">
                                      <div className="score-bar" style={{ width: `${scoreBarW}%` }} />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
 
              {/* ── My Performance ── */}
              <div className="lb-card">
                <div className="lb-card-header">
                  <span className="lb-card-title">My Performance</span>
                  {myRow?.rank && (
                    <span className="lb-badge" style={{ color: "var(--gold)", borderColor: "rgba(255,215,0,.25)", background: "rgba(255,215,0,.08)" }}>
                      Rank #{myRow.rank}
                    </span>
                  )}
                </div>
                <div className="stats-panel">
 
                  {/* User hero */}
                  <div className="user-hero">
                    <div className="user-hero-avatar">
                      {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="user-hero-name">
                        {myRow?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
                      </div>
                      <div className="user-hero-handle">
                        {user?.emailId ? `@${user.emailId.split("@")[0]}` : "@user"}
                      </div>
                    </div>
                  </div>
 
                  {/* Difficulty breakdown */}
                  <div className="stats-section-title">Problems Solved</div>
                  <div className="diff-row">
                    {[
                      { label: "Easy",   value: easy,   cls: "diff-easy" },
                      { label: "Medium", value: medium, cls: "diff-medium" },
                      { label: "Hard",   value: hard,   cls: "diff-hard" },
                    ].map((d) => (
                      <div key={d.label} className={`diff-badge ${d.cls}`}>
                        <div className="d-label">{d.label}</div>
                        <div className="d-value">{d.value}</div>
                      </div>
                    ))}
                  </div>
 
                  {/* Donut chart */}
                  <div className="donut-wrap">
                    <svg className="donut-svg" width={128} height={128} viewBox="0 0 128 128">
                      {/* bg ring */}
                      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={14} />
                      {/* segments */}
                      {total > 0
                        ? arcs.map((arc, i) => (
                            <circle
                              key={i}
                              cx={CX} cy={CY} r={R}
                              fill="none"
                              stroke={arc.color}
                              strokeWidth={14}
                              strokeDasharray={`${arc.dash} ${arc.gap}`}
                              strokeDashoffset={0}
                              transform={`rotate(${arc.rotate} ${CX} ${CY})`}
                              strokeLinecap="butt"
                              style={{ transition: "stroke-dasharray .6s ease" }}
                            />
                          ))
                        : null}
                      {/* center */}
                      <text x={CX} y={CY - 6} textAnchor="middle" className="donut-center-text" fontSize={22} fontWeight={800} fontFamily="'JetBrains Mono',monospace">
                        {total}
                      </text>
                      <text x={CX} y={CY + 12} textAnchor="middle" fill="#4a5568" fontSize={9} fontFamily="'JetBrains Mono',monospace" letterSpacing={1}>
                        SOLVED
                      </text>
                    </svg>
                    <div className="donut-legend">
                      {[
                        { color: "var(--easy)",   label: "Easy",   count: easy },
                        { color: "var(--medium)", label: "Medium", count: medium },
                        { color: "var(--hard)",   label: "Hard",   count: hard },
                      ].map((l) => (
                        <div key={l.label} className="donut-legend-item">
                          <div className="donut-dot" style={{ background: l.color }} />
                          <span style={{ color: "var(--muted)" }}>{l.label}</span>
                          <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{l.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
 
                  {/* Stat tiles */}
                  <div className="stats-section-title" style={{ marginTop: 4 }}>Stats</div>
                  <div className="stat-grid">
                    {[
                      { icon: <IconCrown size={12} />, label: "Rank",   value: myRow?.rank   || "—",   color: "var(--gold)" },
                      { icon: <IconBolt  size={12} />, label: "Score",  value: myRow?.score  ?? 0,     color: "var(--accent)" },
                      { icon: <IconTarget size={12} />,label: "Solved", value: myRow?.solved?.total ?? 0, color: "var(--easy)" },
                      { icon: <IconFlame size={12} />, label: "Streak", value: myRow?.streak?.current ?? 0, color: "var(--hard)" },
                    ].map((t) => (
                      <div key={t.label} className="stat-tile">
                        <div className="stat-tile-label" style={{ color: t.color }}>
                          {t.icon} {t.label}
                        </div>
                        <div className="stat-tile-value" style={{ color: t.color }}>{t.value}</div>
                      </div>
                    ))}
                  </div>
 
                </div>
              </div>
 
            </div>
          )}
        </div>
      </div>
    </>
  );
}
 
