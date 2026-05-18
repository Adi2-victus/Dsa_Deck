




import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { logoutUser } from "../authSlice";

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
    // align start to Sunday for a clean grid (columns are weeks)
    const day = start.getDay(); // 0=Sun
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
    if (!v) return "bg-white/[0.05] border-white/[0.06]";
    const lvl = max ? Math.ceil((v / max) * 4) : 1;
    const k = clamp(lvl, 1, 4);
    if (k === 1) return "bg-emerald-500/20 border-emerald-500/20";
    if (k === 2) return "bg-emerald-500/35 border-emerald-500/25";
    if (k === 3) return "bg-emerald-500/55 border-emerald-500/30";
    return "bg-emerald-500/80 border-emerald-500/40";
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm text-[#e8e8ea] font-semibold">
          {fmtInt(total)} submissions in the past year
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Max/day: {fmtInt(max)}
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[860px]">
          <div
            className="pl-8 pr-2 grid"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 11px)`,
              columnGap: 3,
            }}
          >
            {monthLabels.map((m) => (
              <div
                key={`${m.w}-${m.label}`}
                className="text-[10px] font-mono text-zinc-500"
                style={{ gridColumnStart: m.w + 1 }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="mt-1 flex">
            <div className="w-8 pr-2 flex flex-col gap-[3px]">
              {dayLabels.map((d, i) => (
                <div key={d} className="h-[11px] text-[10px] font-mono text-zinc-600 leading-[11px]" style={{ opacity: i % 2 ? 1 : 0 }}>
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
                        className={`w-[11px] h-[11px] rounded-[3px] border ${colorFor(v)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-[10px] font-mono text-zinc-600">Less</div>
            <div className="flex items-center gap-[3px]">
              {[0, 1, 2, 3, 4].map((v) => (
                <div
                  key={v}
                  className={`w-[11px] h-[11px] rounded-[3px] border ${
                    v === 0 ? "bg-white/[0.05] border-white/[0.06]" : colorFor(v)
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-zinc-600">More</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideCard = ({ children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">{children}</div>
);

const MiniStat = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-zinc-500">{label}</span>
    <span className="font-semibold text-[#e8e8ea]">{value}</span>
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
    // keep last 90 points for readability
    const last = rows.slice(-90);
    return {
      labels: last.map((d) => d.date.slice(5)), // MM-DD
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
    <div className="min-h-screen bg-[#080b12] text-[#e8e8ea]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#080b12]/80 backdrop-blur px-6">
        <div className="h-[60px] flex items-center justify-between max-w-6xl mx-auto">
          <NavLink to="/" className="font-extrabold tracking-tight text-lg">
            DSA<span className="text-cyan-300">Deck</span>
          </NavLink>

          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 rounded-lg text-xs font-mono border border-white/10 bg-transparent text-zinc-300"
            >
              <option value={90}>Last 90 days</option>
              <option value={180}>Last 180 days</option>
              <option value={365}>Past year</option>
            </select>
            <NavLink
              to="/leaderboard"
              className="px-3 py-2 rounded-lg text-xs font-mono border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              Leaderboard
            </NavLink>
            <button
              onClick={() => dispatch(logoutUser())}
              className="px-3 py-2 rounded-lg text-xs font-mono border border-white/10 text-rose-300 hover:border-rose-400/40 hover:bg-rose-500/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left sidebar */}
          <div className="space-y-4">
            <SideCard>
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 border border-cyan-400/20 flex items-center justify-center font-extrabold text-cyan-300">
                  {initials || "U"}
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-extrabold leading-tight truncate">{userName}</div>
                  <div className="mt-1 text-xs font-mono text-zinc-500">Signed in</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <MiniStat label="Leaderboard score" value={fmtInt(data?.user?.score)} />
                <MiniStat label="Accuracy (window)" value={`${data?.accuracyWindow?.accuracyPct ?? 0}%`} />
                <MiniStat label="Submissions (window)" value={fmtInt(data?.accuracyWindow?.attempts)} />
              </div>
            </SideCard>

            <SideCard>
              <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Streak</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-[#080b12] p-3">
                  <div className="text-[10px] font-mono text-zinc-600 tracking-[2px] uppercase">Current</div>
                  <div className="mt-1 text-2xl font-extrabold text-amber-300">{data?.user?.streak?.current ?? 0}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#080b12] p-3">
                  <div className="text-[10px] font-mono text-zinc-600 tracking-[2px] uppercase">Best</div>
                  <div className="mt-1 text-2xl font-extrabold text-amber-200">{data?.user?.streak?.best ?? 0}</div>
                </div>
              </div>
            </SideCard>
          </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[420px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : err ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
            {err}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top summary row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Solved</div>
                <div className="mt-2 text-4xl font-extrabold">{fmtInt(data?.user?.solved?.total)}</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-white/10 bg-[#080b12] p-2">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[2px]">Easy</div>
                    <div className="mt-1 text-lg font-extrabold text-emerald-300">{fmtInt(data?.user?.solved?.easy)}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#080b12] p-2">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[2px]">Med</div>
                    <div className="mt-1 text-lg font-extrabold text-amber-300">{fmtInt(data?.user?.solved?.medium)}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#080b12] p-2">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[2px]">Hard</div>
                    <div className="mt-1 text-lg font-extrabold text-rose-300">{fmtInt(data?.user?.solved?.hard)}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Accuracy</div>
                <div className="mt-3 h-[170px]">
                  <Doughnut
                    data={{
                      labels: ["Accepted", "Not accepted"],
                      datasets: [
                        {
                          data: [
                            data?.accuracyWindow?.acceptedAttempts ?? 0,
                            Math.max(
                              (data?.accuracyWindow?.attempts ?? 0) - (data?.accuracyWindow?.acceptedAttempts ?? 0),
                              0
                            ),
                          ],
                          backgroundColor: ["rgba(74,222,128,.75)", "rgba(244,63,94,.28)"],
                          borderColor: ["rgba(74,222,128,.95)", "rgba(244,63,94,.45)"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { labels: { color: "rgba(228,228,231,.85)" } },
                      },
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-zinc-400 font-mono">
                  {data?.accuracyWindow?.accuracyPct ?? 0}% •{" "}
                  {fmtInt(data?.accuracyWindow?.acceptedAttempts)}/{fmtInt(data?.accuracyWindow?.attempts)}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Problems solved per day</div>
                <div className="mt-3 h-[210px]">
                  <Line
                    data={{
                      labels: solvedSeries.labels,
                      datasets: [
                        {
                          label: "Solved",
                          data: solvedSeries.values,
                          borderColor: "rgba(34,211,238,.9)",
                          backgroundColor: "rgba(34,211,238,.10)",
                          fill: true,
                          tension: 0.35,
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: "rgba(161,161,170,.65)", maxTicksLimit: 7 }, grid: { display: false } },
                        y: { ticks: { color: "rgba(161,161,170,.65)" }, grid: { color: "rgba(255,255,255,.06)" } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <Heatmap solvedPerDay={data?.solvedPerDay} />

            {/* Topic / difficulty */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Topic-wise performance</div>
                <div className="mt-3 h-[260px]">
                  <Bar
                    data={{
                      labels: topicPerf.map((t) => t.topic),
                      datasets: [
                        {
                          label: "Accuracy %",
                          data: topicPerf.map((t) => t.accuracyPct),
                          backgroundColor: "rgba(34,211,238,.22)",
                          borderColor: "rgba(34,211,238,.7)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: "rgba(161,161,170,.65)" }, grid: { display: false } },
                        y: {
                          ticks: { color: "rgba(161,161,170,.65)" },
                          grid: { color: "rgba(255,255,255,.06)" },
                          min: 0,
                          max: 100,
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-mono text-zinc-500 tracking-[2px] uppercase">Difficulty breakdown</div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {diffPerf.map((d) => (
                    <div key={d.difficulty} className="rounded-xl border border-white/10 bg-[#080b12] p-3">
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-[2px]">{d.difficulty}</div>
                      <div className="mt-2 text-xl font-extrabold">{fmtInt(d.solved)}</div>
                      <div className="mt-1 text-xs font-mono text-zinc-500">
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

