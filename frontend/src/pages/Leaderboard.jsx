


import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, RefreshCw, Zap, Trophy, Award, ChevronLeft, TrendingUp, Target, Flame } from 'lucide-react';

// ── Inline SVG icons for fallback (keep for compatibility) ──────────────
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

const MEDAL = ["#F59E0B", "#9CA3AF", "#D97706"]; // Amber, Gray, Amber-dark for white theme

const rankLabel = (rank) => {
  if (rank === 1) return "🥇 1st";
  if (rank === 2) return "🥈 2nd";
  if (rank === 3) return "🥉 3rd";
  return `#${rank}`;
};

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    { pct: easyPct,                     color: "#10B981", label: "Easy",   count: easy }, // Emerald
    { pct: medPct,                      color: "#F59E0B", label: "Medium", count: medium }, // Amber
    { pct: 100 - easyPct - medPct,      color: "#EF4444", label: "Hard",   count: hard }, // Red
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-xl shadow-sm">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leaderboard</h1>
              <p className="text-gray-500 text-sm mt-0.5">Top performers & global rankings</p>
            </div>
          </div>
          <NavLink 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Problems
          </NavLink>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-3" />
            <span className="text-gray-500 font-mono text-sm">Loading rankings…</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-2">
            <span className="text-lg">⚠️</span> {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Rankings Table - spans 2 cols on large */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Overall Rankings</h2>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{data.length} competitors</span>
              </div>
              
              {data.length === 0 ? (
                <div className="text-center py-16 text-gray-400">No rankings yet. Solve some problems!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(() => {
                        const maxScore = Math.max(...data.map((r) => r.score || 0), 1);
                        return data.map((row, i) => {
                          const isMe = String(row.userId) === String(user?._id);
                          const rk = row.rank;
                          const medalColor = rk === 1 ? "text-amber-500" : rk === 2 ? "text-gray-400" : rk === 3 ? "text-amber-700" : "text-gray-400";
                          const scoreBarW = Math.round((row.score / maxScore) * 100);
                          
                          return (
                            <tr key={row.userId} className={`${isMe ? 'bg-amber-50/30' : ''} hover:bg-gray-50 transition-colors`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                                    rk === 1 ? 'bg-amber-100 text-amber-600' : 
                                    rk === 2 ? 'bg-gray-100 text-gray-500' : 
                                    rk === 3 ? 'bg-amber-100/60 text-amber-700' : 
                                    'bg-gray-50 text-gray-400'
                                  }`}>
                                    {rk <= 3 ? <Award className="w-4 h-4" /> : rk}
                                  </div>
                                  {rk <= 3 && (
                                    <span className={`text-xs font-semibold font-mono ${medalColor}`}>
                                      {rankLabel(rk)}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${isMe ? 'from-amber-100 to-amber-200 border-2 border-amber-300' : 'from-gray-100 to-gray-200'} flex items-center justify-center font-bold text-gray-600`}>
                                    {(row.name || "?").charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className={`font-medium text-gray-900 ${isMe ? 'text-amber-700' : ''}`}>
                                      {row.name || "Anonymous"}
                                    </span>
                                    {isMe && <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">you</span>}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <Zap className="w-4 h-4 text-amber-400" />
                                  <span className="font-mono font-bold text-gray-800">{row.score ?? 0}</span>
                                  <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${scoreBarW}%` }} />
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

            {/* My Performance Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">My Performance</h2>
                {myRow?.rank && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                    Rank #{myRow.rank}
                  </span>
                )}
              </div>
              
              <div className="p-5">
                {/* User Profile */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-lg font-bold text-amber-700 shadow-sm border border-white">
                    {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {myRow?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {user?.emailId ? `@${user.emailId.split("@")[0]}` : "@user"}
                    </div>
                  </div>
                </div>

                {/* Difficulty Badges */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Problems Solved</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                      <div className="text-xs text-emerald-600 font-medium uppercase">Easy</div>
                      <div className="text-xl font-bold text-emerald-700">{easy}</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                      <div className="text-xs text-amber-600 font-medium uppercase">Medium</div>
                      <div className="text-xl font-bold text-amber-700">{medium}</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
                      <div className="text-xs text-red-500 font-medium uppercase">Hard</div>
                      <div className="text-xl font-bold text-red-600">{hard}</div>
                    </div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <svg width="120" height="120" viewBox="0 0 128 128">
                      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F3F4F6" strokeWidth="14" />
                      {total > 0 && arcs.map((arc, i) => (
                        <circle
                          key={i}
                          cx={CX} cy={CY} r={R}
                          fill="none"
                          stroke={arc.color}
                          strokeWidth="14"
                          strokeDasharray={`${arc.dash} ${arc.gap}`}
                          strokeDashoffset={0}
                          transform={`rotate(${arc.rotate} ${CX} ${CY})`}
                          strokeLinecap="butt"
                        />
                      ))}
                      <text x={CX} y={CY - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#1F2937">
                        {total}
                      </text>
                      <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fill="#9CA3AF" letterSpacing="1">
                        SOLVED
                      </text>
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mb-6 text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-emerald-500"></div><span className="text-gray-500">Easy {easy}</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-amber-500"></div><span className="text-gray-500">Medium {medium}</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-red-500"></div><span className="text-gray-500">Hard {hard}</span></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-amber-600 text-xs mb-1"><Trophy className="w-3 h-3" /> Rank</div>
                    <div className="font-mono text-xl font-bold text-gray-800">{myRow?.rank || "—"}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-1"><Zap className="w-3 h-3" /> Score</div>
                    <div className="font-mono text-xl font-bold text-gray-800">{myRow?.score ?? 0}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs mb-1"><Target className="w-3 h-3" /> Solved</div>
                    <div className="font-mono text-xl font-bold text-gray-800">{myRow?.solved?.total ?? 0}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-red-500 text-xs mb-1"><Flame className="w-3 h-3" /> Streak</div>
                    <div className="font-mono text-xl font-bold text-gray-800">{myRow?.streak?.current ?? 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}