const express = require("express");
const userMiddleware = require("../middleware/userMiddleware");
const { getMyAnalytics } = require("../controllers/analytics");

const analyticsRouter = express.Router();

analyticsRouter.get("/me", userMiddleware, getMyAnalytics);

module.exports = analyticsRouter;

