const mongoose = require("mongoose");
const Submission = require("../models/submission");
const User = require("../models/user");

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const getMyAnalytics = async (req, res) => {
  try {
    const userId = req.result?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const windowDays = Math.min(Math.max(Number(req.query.days) || 180, 7), 365);
    const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

    const [user, accuracyAgg, windowAccuracyAgg, solvedPerDayAgg, topicAgg, difficultyAgg] = await Promise.all([
      User.findById(userId).select(
        "firstName lastName solvedEasy solvedMedium solvedHard totalSolved streakCount longestStreak lastSolvedAt leaderboardScore"
      ),
      Submission.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: { $ne: "pending" },
          },
        },
        {
          $group: {
            _id: null,
            attempts: { $sum: 1 },
            acceptedAttempts: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
          },
        },
        { $project: { _id: 0, attempts: 1, acceptedAttempts: 1 } },
      ]),
      // Accuracy within the requested window (useful for "past year" stats).
      Submission.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: { $ne: "pending" },
            createdAt: { $gte: since },
          },
        },
        {
          $group: {
            _id: null,
            attempts: { $sum: 1 },
            acceptedAttempts: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
          },
        },
        { $project: { _id: 0, attempts: 1, acceptedAttempts: 1 } },
      ]),
      // Count unique problems accepted per day (first accepted per problem),
      // within the requested window. This matches "problems solved per day".
      Submission.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: "accepted",
            createdAt: { $gte: since },
          },
        },
        { $sort: { createdAt: 1 } },
        {
          $group: {
            _id: "$problemId",
            firstAcceptedAt: { $first: "$createdAt" },
          },
        },
        {
          $project: {
            day: {
              $dateToString: { format: "%Y-%m-%d", date: "$firstAcceptedAt" },
            },
          },
        },
        { $group: { _id: "$day", solved: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: "$_id", solved: 1 } },
      ]),
      // Topic-wise performance by problem.tags
      Submission.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: { $ne: "pending" },
          },
        },
        {
          $lookup: {
            from: "problems",
            localField: "problemId",
            foreignField: "_id",
            as: "problem",
          },
        },
        { $unwind: "$problem" },
        {
          $group: {
            _id: "$problem.tags",
            attempts: { $sum: 1 },
            acceptedAttempts: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
            solvedProblems: {
              $addToSet: {
                $cond: [{ $eq: ["$status", "accepted"] }, "$problemId", "$$REMOVE"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            topic: "$_id",
            attempts: 1,
            acceptedAttempts: 1,
            solved: { $size: "$solvedProblems" },
          },
        },
        { $sort: { solved: -1, acceptedAttempts: -1, attempts: -1 } },
      ]),
      // Difficulty-wise performance
      Submission.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: { $ne: "pending" },
          },
        },
        {
          $lookup: {
            from: "problems",
            localField: "problemId",
            foreignField: "_id",
            as: "problem",
          },
        },
        { $unwind: "$problem" },
        {
          $group: {
            _id: "$problem.difficulty",
            attempts: { $sum: 1 },
            acceptedAttempts: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
            solvedProblems: {
              $addToSet: {
                $cond: [{ $eq: ["$status", "accepted"] }, "$problemId", "$$REMOVE"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            difficulty: "$_id",
            attempts: 1,
            acceptedAttempts: 1,
            solved: { $size: "$solvedProblems" },
          },
        },
        { $sort: { difficulty: 1 } },
      ]),
    ]);

    const accuracy = accuracyAgg?.[0] || { attempts: 0, acceptedAttempts: 0 };
    const accuracyPct =
      accuracy.attempts > 0 ? Math.round((accuracy.acceptedAttempts / accuracy.attempts) * 100) : 0;

    const windowAccuracy = windowAccuracyAgg?.[0] || { attempts: 0, acceptedAttempts: 0 };
    const windowAccuracyPct =
      windowAccuracy.attempts > 0
        ? Math.round((windowAccuracy.acceptedAttempts / windowAccuracy.attempts) * 100)
        : 0;

    // Fill missing days with 0 solves for chart friendliness.
    const byDate = new Map(solvedPerDayAgg.map((d) => [d.date, d.solved]));
    const solvedPerDay = [];
    const start = startOfDay(since);
    const today = startOfDay(new Date());
    for (let cur = new Date(start); cur <= today; cur.setDate(cur.getDate() + 1)) {
      const key = cur.toISOString().slice(0, 10);
      solvedPerDay.push({ date: key, solved: byDate.get(key) || 0 });
    }

    res.status(200).json({
      user: {
        id: user?._id,
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        solved: {
          easy: user?.solvedEasy || 0,
          medium: user?.solvedMedium || 0,
          hard: user?.solvedHard || 0,
          total: user?.totalSolved || 0,
        },
        streak: {
          current: user?.streakCount || 0,
          best: user?.longestStreak || 0,
          lastSolvedAt: user?.lastSolvedAt || null,
        },
        score: user?.leaderboardScore || 0,
      },
      accuracy: {
        attempts: accuracy.attempts,
        acceptedAttempts: accuracy.acceptedAttempts,
        accuracyPct,
      },
      accuracyWindow: {
        attempts: windowAccuracy.attempts,
        acceptedAttempts: windowAccuracy.acceptedAttempts,
        accuracyPct: windowAccuracyPct,
      },
      solvedPerDay,
      topicPerformance: topicAgg.map((t) => ({
        ...t,
        accuracyPct: t.attempts > 0 ? Math.round((t.acceptedAttempts / t.attempts) * 100) : 0,
      })),
      difficultyPerformance: difficultyAgg.map((d) => ({
        ...d,
        accuracyPct: d.attempts > 0 ? Math.round((d.acceptedAttempts / d.attempts) * 100) : 0,
      })),
      windowDays,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

module.exports = {
  getMyAnalytics,
};

