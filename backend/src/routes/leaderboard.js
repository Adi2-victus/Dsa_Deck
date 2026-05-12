const express = require("express");
const userMiddleware = require("../middleware/userMiddleware");
const { getLeaderboard } = require("../controllers/leaderboard");

const leaderboardRouter = express.Router();

leaderboardRouter.get("/", userMiddleware, getLeaderboard);

module.exports = leaderboardRouter;
