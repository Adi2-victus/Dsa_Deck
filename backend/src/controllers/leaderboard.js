const User = require("../models/user");

const SCORE_WEIGHTS = {
  easy: 10,
  medium: 20,
  hard: 30,
  streak: 5,
};

const getLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);

    const users = await User.find({ role: "user" })
      .select(
        "firstName lastName solvedEasy solvedMedium solvedHard totalSolved streakCount longestStreak leaderboardScore"
      )
      .sort({ leaderboardScore: -1, totalSolved: -1, streakCount: -1, createdAt: 1 })
      .limit(limit);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      solved: {
        easy: user.solvedEasy || 0,
        medium: user.solvedMedium || 0,
        hard: user.solvedHard || 0,
        total: user.totalSolved || 0,
      },
      streak: {
        current: user.streakCount || 0,
        best: user.longestStreak || 0,
      },
      score: user.leaderboardScore || 0,
    }));

    res.status(200).json({
      scoring: {
        easy: SCORE_WEIGHTS.easy,
        medium: SCORE_WEIGHTS.medium,
        hard: SCORE_WEIGHTS.hard,
        streak: SCORE_WEIGHTS.streak,
      },
      leaderboard,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

module.exports = {
  SCORE_WEIGHTS,
  getLeaderboard,
};
