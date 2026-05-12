



import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { logoutUser } from "../authSlice";
import {
  TrendingUp,
  Target,
  Flame,
  LogOut,
  Trophy,
  Zap,
  BarChart3,
  Calendar,
  Award,
  ChevronRight,
} from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const fmtInt = (n) => new Intl.NumberFormat().format(Number(n) || 0);

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const Heatmap = ({ solvedPerDay }) => {
  const { weeks, monthLabels, total, max } = useMemo(() => {
    const map = new Map((solvedPerDay || []).map((d) => [d.date, d.solved]));
    const today = startOfDay(new Date());
    const start = startOfDay(new Date(today));
    start.setDate(start.getDate() - 364);
    const day = start.getDay();
    start.setDate(start.getDate() - day);

    const days = [];
    for (let cur = new Date(start); cur <= today; cur.setDate(cur.getDate() + 1)) {
      const key = cur.toISOString().slice(0, 10);
      const val = map.get(key) || 0;
      days.push({ key, date: new Date(cur), val });
    }

    const weekCols = [];
    for (let i = 0; i < days.length; i += 7) weekCols.push(days.slice(i, i + 7));

    const maxVal = days.reduce((m, d) => Math.max(m, d.val), 0);
    const sum = days.reduce((s, d) => s + d.val, 0);

    const months = [];
    for (let w = 0; w < weekCols.length; w++) {
      const d0 = weekCols[w][0]?.date;
      if (!d0) continue;
      const m = d0.getMonth();
      const label = d0.toLocaleString(undefined, { month: "short" });
      const prev = months[months.length - 1];
      if (!prev || prev.m !== m) months.push({ w, m, label });
    }

    return { weeks: weekCols, monthLabels: months, total: sum, max: maxVal };
  }, [solvedPerDay]);

  const colorFor = (v) => {
    if (!v) return "bg-gray-100 border-gray-200";
    const lvl = max ? Math.ceil((v / max) * 4) : 1;
    const k = clamp(lvl, 1, 4);
    if (k === 1) return "bg-emerald-200 border-emerald-300";
    if (k === 2) return "bg-emerald-300 border-emerald-400";
    if (k === 3) return "bg-emerald-500 border-emerald-600";
    return "bg-emerald-700 border-emerald-800";
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-gray-700">
            {fmtInt(total)} submissions in the past year
          </span>
        </div>
        <div className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
          Max/day: {fmtInt(max)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          <div
            className="pl-8 pr-2 grid mb-1"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 11px)`,
              columnGap: 3,
            }}
          >
            {monthLabels.map((m) => (
              <div
                key={`${m.w}-${m.label}`}
                className="text-[10px] font-mono text-gray-400"
                style={{ gridColumnStart: m.w + 1 }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="w-8 pr-2 flex flex-col gap-[3px]">
              {dayLabels.map((d, i) => (
                <div key={d} className="h-[11px] text-[10px] font-mono text-gray-400 leading-[11px]" style={{ opacity: i % 2 ? 1 : 0.5 }}>
                  {d}
                </div>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, di) => {
                    const cell = week[di];
                    const v = cell?.val || 0;
                    const title = cell ? `${cell.key}: ${v} submissions` : "";
                    return (
                      <div
                        key={`${wi}-${di}`}
                        title={title}
                        className={`w-[11px] h-[11px] rounded-[2px] border ${colorFor(v)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-3">
            <div className="text-[10px] font-mono text-gray-400">Less</div>
            <div className="flex items-center gap-[3px]">
              {[0, 1, 2, 3, 4].map((v) => (
                <div
                  key={v}
                  className={`w-[11px] h-[11px] rounded-[2px] border ${
                    v === 0 ? "bg-gray-50 border-gray-200" : colorFor(v * (max / 4))
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-gray-400">More</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideCard = ({ children, title, icon }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    {title && (
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-amber-500">{icon}</div>}
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const MiniStat = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

export default function Analytics() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [days, setDays] = useState(365);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/analytics/me?days=${days}`);
        setData(res.data);
        setErr("");
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [days]);

  const solvedSeries = useMemo(() => {
    const rows = data?.solvedPerDay || [];
    const last = rows.slice(-90);
    return {
      labels: last.map((d) => d.date.slice(5)),
      values: last.map((d) => d.solved),
    };
  }, [data]);

  const topicPerf = useMemo(() => (data?.topicPerformance || []).slice(0, 6), [data]);
  const diffPerf = useMemo(() => (data?.difficultyPerformance || []), [data]);

  const userName = data?.user?.name || "User";
  const initials = (userName || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-6">
        <div className="h-16 flex items-center justify-between max-w-7xl mx-auto">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-amber-100 p-1.5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-extrabold text-xl text-gray-900 tracking-tight">
              DSA<span className="text-amber-500">Deck</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 rounded-xl text-sm font-mono border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <option value={90}>Last 90 days</option>
              <option value={180}>Last 180 days</option>
              <option value={365}>Past year</option>
            </select>
            <NavLink
              to="/leaderboard"
              className="px-3 py-2 rounded-xl text-sm font-mono border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              Leaderboard
            </NavLink>
            <button
              onClick={() => dispatch(logoutUser())}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-mono border border-gray-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left sidebar */}
          <div className="space-y-5">
            <SideCard>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center font-bold text-amber-700 text-xl shadow-sm border border-white">
                  {initials || "U"}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{userName}</div>
                  <div className="mt-0.5 text-xs font-mono text-gray-400">Active member</div>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <MiniStat label="Leaderboard score" value={fmtInt(data?.user?.score)} color="text-amber-600 font-bold" />
                <MiniStat label="Accuracy (window)" value={`${data?.accuracyWindow?.accuracyPct ?? 0}%`} />
                <MiniStat label="Submissions (window)" value={fmtInt(data?.accuracyWindow?.attempts)} />
              </div>
            </SideCard>

            <SideCard title="Streak" icon={<Flame className="w-4 h-4" />}>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Current</div>
                  <div className="mt-1 text-2xl font-bold text-amber-600">{data?.user?.streak?.current ?? 0}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Best</div>
                  <div className="mt-1 text-2xl font-bold text-gray-700">{data?.user?.streak?.best ?? 0}</div>
                </div>
              </div>
            </SideCard>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[420px] bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
                <span className="text-gray-400 text-sm font-mono">Loading analytics...</span>
              </div>
            </div>
          ) : err ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-2">
              <span className="text-lg">⚠️</span> {err}
            </div>
          ) : (
            <div className="space-y-5">
              {/* Top summary row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Target className="w-3.5 h-3.5" /> Solved
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900">{fmtInt(data?.user?.solved?.total)}</div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Easy</div>
                      <div className="mt-0.5 text-lg font-bold text-emerald-600">{fmtInt(data?.user?.solved?.easy)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Medium</div>
                      <div className="mt-0.5 text-lg font-bold text-amber-600">{fmtInt(data?.user?.solved?.medium)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Hard</div>
                      <div className="mt-0.5 text-lg font-bold text-rose-600">{fmtInt(data?.user?.solved?.hard)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Award className="w-3.5 h-3.5" /> Accuracy
                  </div>
                  <div className="h-[140px]">
                    <Doughnut
                      data={{
                        labels: ["Accepted", "Wrong / Failed"],
                        datasets: [
                          {
                            data: [
                              data?.accuracyWindow?.acceptedAttempts ?? 0,
                              Math.max(
                                (data?.accuracyWindow?.attempts ?? 0) - (data?.accuracyWindow?.acceptedAttempts ?? 0),
                                0
                              ),
                            ],
                            backgroundColor: ["rgba(16,185,129,0.85)", "rgba(239,68,68,0.25)"],
                            borderColor: ["rgb(16,185,129)", "rgb(239,68,68)"],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: "bottom", labels: { font: { size: 10 }, color: "#6B7280" } },
                        },
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-sm text-gray-600 font-mono">
                    {data?.accuracyWindow?.accuracyPct ?? 0}% •{" "}
                    {fmtInt(data?.accuracyWindow?.acceptedAttempts)}/{fmtInt(data?.accuracyWindow?.attempts)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                    <BarChart3 className="w-3.5 h-3.5" /> Daily activity
                  </div>
                  <div className="h-[180px]">
                    <Line
                      data={{
                        labels: solvedSeries.labels,
                        datasets: [
                          {
                            label: "Solved",
                            data: solvedSeries.values,
                            borderColor: "rgb(245,158,11)",
                            backgroundColor: "rgba(245,158,11,0.05)",
                            fill: true,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                            pointBackgroundColor: "rgb(245,158,11)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
                        scales: {
                          x: { ticks: { color: "#9CA3AF", maxTicksLimit: 6, font: { size: 9 } }, grid: { display: false } },
                          y: { ticks: { color: "#9CA3AF", stepSize: 1 }, grid: { color: "#F3F4F6" } },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Heatmap */}
              <Heatmap solvedPerDay={data?.solvedPerDay} />

              {/* Topic / difficulty */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-500" /> Topic-wise performance
                  </h3>
                  <div className="h-[260px]">
                    <Bar
                      data={{
                        labels: topicPerf.map((t) => t.topic),
                        datasets: [
                          {
                            label: "Accuracy %",
                            data: topicPerf.map((t) => t.accuracyPct),
                            backgroundColor: "rgba(245,158,11,0.2)",
                            borderColor: "rgb(245,158,11)",
                            borderWidth: 1,
                            borderRadius: 6,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { ticks: { color: "#6B7280", font: { size: 10 } }, grid: { display: false } },
                          y: {
                            ticks: { color: "#6B7280", callback: (val) => `${val}%` },
                            grid: { color: "#F3F4F6" },
                            min: 0,
                            max: 100,
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> Difficulty breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {diffPerf.map((d) => (
                      <div key={d.difficulty} className="bg-gray-50 rounded-xl p-4">
                        <div className={`text-xs font-mono uppercase tracking-wider ${
                          d.difficulty === 'Easy' ? 'text-emerald-600' : d.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {d.difficulty}
                        </div>
                        <div className="mt-2 text-2xl font-bold text-gray-800">{fmtInt(d.solved)}</div>
                        <div className="mt-1 text-xs text-gray-500">
                          {d.accuracyPct}% acc • {fmtInt(d.acceptedAttempts)}/{fmtInt(d.attempts)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
